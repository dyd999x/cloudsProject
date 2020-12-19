import React from 'react';
import {Table, Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";

class TableRowCountries extends React.Component{

    printNumber= (num) =>{
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      }
  

    render(){

        const {Row,Cell} = Table;
        const {Country, NewCases, TotalCases, NewRecoveries, TotalRecoveries, NewDeaths, TotalDeaths, Slug} = this.props
        return(
            <Row> 
                <Cell style={{backgroundColor: 'grey', color:'black'}} ><Link to={`/summary/${Slug}`} style={{color:"white"}}>{Country}</Link></Cell>
                <Cell style={{backgroundColor: '#ffe6b3'}} >{this.printNumber(NewCases)}</Cell>
                <Cell style={{backgroundColor: '#ffe6b3'}}>{this.printNumber(TotalCases)}</Cell>
                <Cell style={{backgroundColor: '#99ccff'}}>{this.printNumber(NewRecoveries)}</Cell>
                <Cell style={{backgroundColor: '#99ccff'}}>{this.printNumber(TotalRecoveries)}</Cell>
                <Cell style={{backgroundColor: '#ff9999'}}>{this.printNumber(NewDeaths)}</Cell>
                <Cell style={{backgroundColor: '#ff9999'}}>{this.printNumber(TotalDeaths)}</Cell>
            </Row>
        )
    }
}

export default TableRowCountries;