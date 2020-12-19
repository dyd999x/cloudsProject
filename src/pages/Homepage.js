import React from 'react';
import TableSummary from '../components/TableSummary';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import TableAllCountries from '../components/TableAllCountries';
import SegmentButton from '../components/SegmentButton';
import {firestore} from '../firebase/utils'
import News from '../components/News'


class HomePage extends React.Component {

    constructor(){
        super()
        this.state= {
            globalNews: {},
            render: false
        }
    }

    getGlobalNews = async () => {
        const snapshot = await firestore.collection('news/worldwide/global').get()
      
        let globalNews = snapshot.docs.map(doc=> {return {
            key: doc.data().id,
            title: doc.data().title,
            description: doc.data().description,
            user: doc.data().user.displayName,
            date: doc.data().createdAt.toDate()
        }})
        this.setState({globalNews: globalNews, render: true})
    }

    componentDidMount() {
        this.getGlobalNews()
    }


    render() {
        const {global, world, today, aprilData, countries} = this.props
        return (
            <div>
                <SegmentButton page="home" country={null}/>
                <TableSummary global={global} one={false} />
                <PieChart global = {global} one={false} Country={null}/>
                <BarChart world = {world} One={false}/>
                <LineChart today = {today} data={aprilData} one={false} Country={null}/>
                <TableAllCountries data={countries} />
                {
                    this.state.render ?
                        <News news={this.state.globalNews} country={null}/> :
                    null
                }
             </div>    
        )
    }
}
     


export default HomePage;