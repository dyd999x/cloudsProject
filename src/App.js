import './App.css';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CountryPage from './pages/CountryPage'
import HeaderApp from './components/Header'
import HomePage from './pages/Homepage'
import {auth, createUserProfileDocument, storage} from './firebase/utils'
import Footer from './components/Footer';
import FormNews from './pages/NewsForm';
import Title from './components/Title'

class App extends React.Component {
  unsubscribeFromAuth = null;


  constructor(){
    super();
    this.state = {
      currentUser: null,
      global: {},
      countries: {},
      countryNames: {},
      aprilData: {},
      world: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {}
      },
      todayDate: " ",
      weekAgoDate: " ",
      image:''
      }
  }




  getDates =() => {
    const today = new Date();
    let t = today.getDate()
    
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    let d = weekAgo.getDate()
    if( d >=1 && d <= 9){
      d = '0'+ d
    }
    if( t >=1 && t <= 9){
      t = '0'+ t
    }
    const date2 = weekAgo.getFullYear()+'-'+(weekAgo.getMonth()+1)+'-'+d
    const date1 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+t
    this.setState({todayDate: date1, weekAgoDate: date2})
  }

  getSummary = async () => {

    // fetch("https://api.covid19api.com/summary")
    // .then(response => response.json())
    // .then(result => this.setState({global: result}))
    // .catch(error => console.log('error',error))
    try{
      const response = await fetch("https://api.covid19api.com/summary");
      while(response.status != 200){
        response = await fetch("https://api.covid19api.com/summary");
      }
      const jsonData = await response.json();
      let names = jsonData.Countries.map( function(c) {
        
            let name = { key: c.CountryCode.toLowerCase(),
                         value: c.CountryCode.toLowerCase(),
                         flag : c.CountryCode.toLowerCase(),
                         text : c.Country
                        }
            return name;
        
       });
      
      this.setState({global: jsonData.Global, countries: jsonData.Countries, countryNames: names},()=>{
        console.log(this.state.countries)
      });
    } catch(error){
      console.log(error)
    }
        

  }

  getWorld = async () => {
    try{
      await this.getDates();
      const url = `https://api.covid19api.com/world?from=${this.state.weekAgoDate}&to=${this.state.todayDate}`
      const response = await fetch(url);
      while(response.status != 200){
        response = await fetch(url);
      }
      const jsonData = await response.json();
      const final = jsonData.sort((a,b) => a.TotalConfirmed - b.TotalConfirmed)
      this.setState({world: final},()=>console.log(this.state.world));
    } catch(error){
      console.log(error)
    }
  }

  getAprilData = async () => {
    try{
      const url = `https://api.covid19api.com/world?from=2020-04-13&to=${this.state.todayDate}`
      const response = await fetch(url);
      while(response.status != 200){
        response = await fetch(url);
      }
      const jsonData = await response.json();
      const final = jsonData.filter((e,i) => i %5 == 0).sort((a,b) => a.TotalConfirmed - b.TotalConfirmed)
      this.setState({aprilData: final}, () => console.log(this.state.aprilData));
    } catch(error){
      console.log(error)
    }
  }

  getImage = async () => {
    const image = await storage.refFromURL("gs://clouds-29b71.appspot.com/covid.png").getDownloadURL()
    this.setState({image})
  }

  

  

  componentDidMount(){
    this.getWorld();
    this.getSummary();
    this.getAprilData();
    this.getImage();
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id: snapShot.id,
            ...snapShot.data()
            }
            
          });
        });
      } else {
        this.setState({currentUser:userAuth});
      }

      
    });
    
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
          <HeaderApp currentUser={this.state.currentUser}/>
          <Title image={this.state.image}/>
          <Switch>
            <Route exact path='/' component={()=><HomePage 
              global = {this.state.global}
              world ={this.state.world}
              today={this.state.todayDate}
              aprilData = {this.state.aprilData}
              countries={this.state.countries}/>} />
            <Route path='/summary/:countryID' component={({match}) => 
                <CountryPage 
                  countries ={this.state.countries}
                  match={match}
                  today = {this.state.todayDate}
                  />
            } />
            <Route exact path='/addNews' component={() => <FormNews
              currentUser={this.state.currentUser}
              countryNames={this.state.countryNames}
            />} />
           
          </Switch>
          <Footer />
      </div>
    );
  }
  
}

export default App;
