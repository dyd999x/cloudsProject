import React from 'react';
import {Table, Container, Icon} from 'semantic-ui-react';
import TableRowCountries from './TableRowCountries';

class TableAllCountries extends React.Component{
    constructor() {
        super()
        this.state={
            data: {},
            byCountry: {},
            byNewCases: {},
            byTotalCases: {},
            byNewRecoveries: {},
            byTotalRecoveries: {},
            byNewDeaths:{},
            byTotalDeaths:{}
        }
      
    }


    componentDidMount() {
        const {data} = this.props
        const copy1 = [...Object.values(data)]
        const copy2 = [...Object.values(data)]
        const copy3 = [...Object.values(data)]
        const copy4 = [...Object.values(data)]
        const copy5 = [...Object.values(data)]
        const copy6 = [...Object.values(data)]
        const byNewCases = copy1.sort((a,b)=> a.NewConfirmed-b.NewConfirmed)
        const byTotalCases = copy2.sort((a,b)=> a.TotalConfirmed - b.TotalConfirmed)
        const byNewRecoveries = copy3.sort((a,b)=> a.NewRecovered - b.NewRecovered)
        const byTotalRecoveries = copy4.sort((a,b)=> a.TotalRecovered - b.TotalRecovered)
        const byNewDeaths = copy5.sort((a,b)=> a.NewDeaths - b.NewDeaths)
        const byTotalDeaths = copy6.sort((a,b)=> a.TotalDeaths - b.TotalDeaths)
        this.setState({
            data:this.props.data,
            byCountry:this.props.data, 
            byNewCases,
            byTotalCases,
            byNewRecoveries,
            byTotalRecoveries,
            byNewDeaths,
            byTotalDeaths
        })
        
    }

    renderRows =(data)=> {
        
            if(data[0] !=null)return data.map((country, index) => {
            return (<TableRowCountries
                key = {index}
                Country = {country.Country}
                NewCases = {country.NewConfirmed}
                TotalCases = {country.TotalConfirmed}
                NewRecoveries = {country.NewRecovered}
                TotalRecoveries = {country.TotalRecovered}
                NewDeaths = {country.NewDeaths}
                TotalDeaths = {country.TotalDeaths}
                Slug = {country.Slug}
            />)
        })
    }

    sortTable=(key)=>{
        if(key==='country'){
            const newData = this.state.byCountry.reverse()
            this.setState({data:newData})
        }
        if(key==='newCases'){
            const newData = this.state.byNewCases.reverse()
            this.setState({data:newData})
        }
        if(key==='totalCases'){
            const newData = this.state.byTotalCases.reverse()
            this.setState({data:newData})
        }
        if(key==='newRecoveries'){
            const newData = this.state.byNewRecoveries.reverse()
            this.setState({data:newData})
        }
        if(key==='totalRecoveries'){
            const newData = this.state.byTotalRecoveries.reverse()
            this.setState({data:newData})
        }
        if(key==='newDeaths'){
            const newData = this.state.byNewDeaths.reverse()
            this.setState({data:newData})
        }
        if(key==='totalDeaths'){
            const newData = this.state.byTotalDeaths.reverse()
            this.setState({data:newData})
        }
        
    }

    render() {
        // const {data} =this.props
         if(this.state.data !=null || this.state.data[0] != null)
        {
            return(
            <Container style={{marginTop:'50px'}}>
                    <Container textAlign='center' style={{fontSize: 20}}>Corona Virus Cases by Country</Container>
                    <Table celled sortable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center" onClick={()=>{const key='country';this.sortTable(key)}}>
                                    Country
                                    <div>
                                        <Icon link name='angle up'/>
                                        <Icon link name='angle down' />
                                    </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" onClick={()=>{const key='newCases';this.sortTable(key)}}>
                                    New Cases
                                    <div>
                                        <Icon link name='angle up' />
                                        <Icon link name='angle down' />
                                    </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" onClick={()=>{const key='totalCases';this.sortTable(key)}}>
                                    Total Cases
                                    <div>
                                        <Icon link name='angle up' />
                                        <Icon link name='angle down' />
                                    </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" onClick={()=>{const key='newRecoveries';this.sortTable(key)}}>
                                    New Recoveries
                                    <div>
                                        <Icon link name='angle up' />
                                        <Icon link name='angle down' />
                                    </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" onClick={()=>{const key='totalRecoveries';this.sortTable(key)}}>
                                    Total Recoveries
                                    <div>
                                        <Icon link name='angle up' />
                                        <Icon link name='angle down' />
                                    </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" onClick={()=>{const key='newDeaths';this.sortTable(key)}}>
                                    New Deaths
                                    <div>
                                        <Icon link name='angle up' />
                                        <Icon link name='angle down' />
                                    </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign="center" onClick={()=>{const key='totalDeaths';this.sortTable(key)}}>
                                    Total Deaths
                                    <div>
                                        <Icon link name='angle up' />
                                        <Icon link name='angle down' />
                                    </div>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.renderRows(this.state.data)}
                        </Table.Body>
    
                    </Table>
                </Container>
            )
        } else {
            return(
                <Container>Not ok</Container>
            )
        }
    }
    
            
}

export default TableAllCountries;
