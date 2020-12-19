import {Line} from 'react-chartjs-2';
import React from 'react';
import {Container} from 'semantic-ui-react';



class LineChart extends React.Component{

    constructor(){
        super()
    }

    formatDate =(x) => {
        return x.getDate() + " " + x.toLocaleString('default', {month: 'short'});
    }

    getDatesArray =(start,end) => {
        let dates = [];
        const startDate = new Date(start)
        const endDate = new Date(end)
        while (startDate < endDate) {
            dates = [...dates, new Date(startDate)]
            startDate.setDate(startDate.getDate() + 5)
        }
        dates = [...dates, endDate]
        const newdates = dates.map(elem => this.formatDate(elem))
        return newdates
    }

    render() {
        const {today, data,one,Country} = this.props
        if(data[0] != null){
            const first = one ? new Date(data[0].Date) : "2020-04-13"
            const dates = this.getDatesArray(first, today)
            const totalDeaths =[]
            const totalRecovered = []
            const totalCases =[]
            if(one){
                data.forEach(e =>  {
                    totalDeaths.push(e.Deaths)
                    totalRecovered.push(e.Recovered)
                    totalCases.push(e.Confirmed)
                })
            } else {
                data.forEach(e =>  {
                    totalDeaths.push(e.TotalDeaths)
                    totalRecovered.push(e.TotalRecovered)
                    totalCases.push(e.TotalConfirmed)
                })
            }
            let str = one ? `${Country}` :'Worldwide'  

            return(
                <Container style={{marginTop:'50px'}}>
                    
                    <Line 
                        data={{
                            labels: dates,
                            datasets: [
                               {
                                    data: totalDeaths,
                                    backgroundColor: '#ff9999',
                                    label: 'Total Deaths'
                                },
                                {
                                    data: totalRecovered,
                                    backgroundColor: '#99ccff',
                                    label: 'Total Recovered'
                                },
                                {
                                    data:totalCases,
                                    backgroundColor: '#ffe6b3',
                                    label: 'Total Cases'
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: `Total Corona Virus Cases ${str}`,
                                fontSize: 20
                            }
        
                        }}
                    />
                </Container>
                
            )
        } else {
            return(
                <div>
                    Error while fetching data
                </div>
            )
        }

        
        
        
        
    }

    
}

export default LineChart;