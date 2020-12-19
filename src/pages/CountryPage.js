
import React from 'react'
import TableSummary from '../components/TableSummary'
import PieChart from '../components/PieChart'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import {addCountry, firestore, countryExists, checkIfUpdated} from '../firebase/utils'
import {Link} from 'react-router-dom'
import News from '../components/News'
import {Container,Segment,Button,Header} from 'semantic-ui-react'

class CountryPage extends React.Component {

    constructor(){
        super()
        this.state={
            countryData: {},
            lastSeven:{},
            summary: {},
            countryNews: {},
            render: false

        }
    }
    getCountryNews = async (countryName) => {
        const snapshot = await firestore.collection(`news/countries/${countryName}`).get()
        if(!snapshot.empty){
            let countryNews = snapshot.docs.map(doc=> {return {
                key: doc.data().id,
                title: doc.data().title,
                description: doc.data().description,
                user: doc.data().user.displayName,
                date: doc.data().createdAt.toDate()
            }})
            this.setState({countryNews: countryNews, render: true})
        }
        
    }

    getCountryData = async(country) => {
        try {
          const url = `https://api.covid19api.com/total/country/${country}`
          const response = await fetch(url);
          while(response.status != 200){
            response = await fetch(url);
          }
          const jsonData = await response.json();
          const data = jsonData.filter((e,i) => i %5 == 0)
          this.setState({countryData: data, lastSeven: jsonData.slice(-7)})
        } catch(error){
          console.log(error)
          
        }
      }

    getCountry = async (countryName, today,country) => {

        countryExists(countryName).then(ex => {
            if(ex == true){
                checkIfUpdated(countryName, today).then(res => {
                    if(res==true){
                        const countryRef = firestore.doc(`countries/${countryName}`);
                        countryRef.get().then(snapshot => snapshot.data()).then(data =>{
                            this.setState({summary:data})
                        })
        
                    } else {
                        addCountry(country)
                        this.setState({summary: country})
                    }
    
                })
            } else {
                addCountry(country)
                this.setState({summary: country})
            }
        })
        
    }

    componentDidMount(){
        const {countries,match,today} = this.props
        const country = countries.filter(c => c.Slug == match.params.countryID)
        this.getCountryNews(country[0].Country)
        this.getCountryData(this.props.match.params.countryID)
        this.getCountry(country[0].Country, today, country[0])
    }

    render() {
       if(this.state.summary !=null){
            return(
                <Container>
                    
                    <Header as='h2' textAlign="center">{this.state.summary.Country}</Header>
                    <TableSummary global={this.state.summary} one={true}/>
                    <PieChart global={this.state.summary} one={true} Country={this.state.summary.Country}/>
                    <BarChart world={this.state.lastSeven} One={true}/> 
                    <LineChart data={this.state.countryData} today={this.props.today} one={true} Country={this.state.summary.Country}/>
                    {
                        this.state.render ?
                            <News news={this.state.countryNews} country={this.state.summary.Country}/> :
                        null
                    }
                    
                </Container>
                
    
            )
        } else {
            return(
                <Container>
                    <Segment placeholder>Error while displaying the data</Segment>
                </Container>
            )
        }
    }

    
    
}

export default CountryPage;