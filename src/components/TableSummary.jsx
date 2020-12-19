import React from 'react';
import {Table, Container} from 'semantic-ui-react';

class TableSummary extends React.Component{
    constructor() {
        super()
    }

    printNumber= (num) =>{
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    }

    printRate =(num) => {
        const a = Math.round((num + Number.EPSILON) * 10000) /100 
        return ""+a+"%"
    }
    

    render() {
        const {global, one} = this.props;
        const {NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths, TotalRecovered} =global
        return(
            <Container style={{marginTop:'50px'}}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                
                                    {
                                        one ?
                                        <Table.HeaderCell colSpan='2'>{`Corona Virus Summary in ${this.props.global.Country}`}</Table.HeaderCell> :
                                        <Table.HeaderCell colSpan='2'>Corona Virus Summary Worldwide</Table.HeaderCell>
                                    }
                                
                                
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row style={{backgroundColor:'#ffe6b3'}}>
                                <Table.Cell>Total Cases</Table.Cell>
                                <Table.Cell textAlign='right'>{TotalConfirmed && this.printNumber(TotalConfirmed)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#ffe6b3'}}>
                                <Table.Cell>New Cases</Table.Cell>
                                <Table.Cell textAlign='right'>{NewConfirmed && this.printNumber(NewConfirmed)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#ffe6b3'}}>
                                <Table.Cell>Active Cases</Table.Cell>
                                <Table.Cell textAlign='right'>{TotalConfirmed && TotalRecovered  && this.printNumber(TotalConfirmed - TotalRecovered)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#99ccff'}}>
                                <Table.Cell>Total Recovered</Table.Cell>
                                <Table.Cell textAlign='right'>{TotalRecovered && this.printNumber(TotalRecovered)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#99ccff'}}>
                                <Table.Cell>New Recovered</Table.Cell>
                                <Table.Cell textAlign='right'>{NewRecovered && this.printNumber(NewRecovered)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#99ccff'}}>
                                <Table.Cell>Recovery rate</Table.Cell>
                                <Table.Cell textAlign='right'>{TotalRecovered && TotalConfirmed && this.printRate(TotalRecovered/TotalConfirmed)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#ff9999'}}>
                                <Table.Cell>Total Deaths</Table.Cell>
                                <Table.Cell textAlign='right'>{TotalDeaths && this.printNumber(TotalDeaths)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#ff9999'}}>
                                <Table.Cell>New Deaths</Table.Cell>
                                <Table.Cell textAlign='right'>{NewDeaths && this.printNumber(NewDeaths)}</Table.Cell>
                            </Table.Row>
                            <Table.Row style={{backgroundColor:'#ff9999'}}>
                                <Table.Cell>Mortality rate</Table.Cell>
                                <Table.Cell textAlign='right'>{TotalDeaths && TotalConfirmed && this.printRate(TotalDeaths/TotalConfirmed)}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
    
                    </Table>
                </Container>
        )
    }
    
            
}

export default TableSummary;