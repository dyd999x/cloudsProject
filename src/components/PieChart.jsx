import {Pie} from 'react-chartjs-2';
import React from 'react';
import {Container} from 'semantic-ui-react';


const PieChart = ({global: {TotalConfirmed, TotalRecovered, TotalDeaths},Country, one}) =>{
    let str = one ? `${Country}` :'Worldwide' 
    return(
        <Container style={{marginTop:'50px'}}>
            
            <Pie 
                data={{
                    labels: ['Dead Cases', 'Recovered Cases', 'Active Cases'],
                    datasets: [{
                        data: [TotalDeaths, TotalRecovered, TotalConfirmed-TotalRecovered],
                        backgroundColor: ['#ff9999','#99ccff', '#ffe6b3'],
                        hoverBackgroundColor: [ '#501800','#003350', '#4B5000']
                    }]
                }}
                options={{
                    title: {
                        display: true,
                        text: `Corona Virus Cases Distribution ${str}`,
                        fontSize: 20
                    }

                }}
            />
        </Container>
        
    )
}

export default PieChart;