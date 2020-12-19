import {Bar} from 'react-chartjs-2';
import React from 'react';
import {Container} from 'semantic-ui-react';



class BarChart extends React.Component{

    constructor(){
        super()
    }

    getDatesArray =() => {
        let dates = [];
        const date = new Date();
        for (let i = 0; i < 7; i++){
            let tempDate = new Date();
            tempDate.setDate(date.getDate()-i);
            const str = tempDate.getDate() + " " + tempDate.toLocaleString('default', {month: 'short'});
            dates.push(str); 
             
        }
        return dates.reverse()
    }
    render() {
        const {world, One} = this.props
        console.log(One)
        const dates = this.getDatesArray()
        
        
        if(One && world[0]!=null)
        {
            const newDeaths =[]
            const newRecovered = []
            const newCases =[]
            for(let i=0;i<7;i++){
                newDeaths.push(world[i].Deaths)
                newRecovered.push(world[i].Recovered)
                newCases.push(world[i].Confirmed)
            }
            return(
                <Container style={{marginTop:'50px'}}>
                    
                    <Bar 
                        data={{
                            labels: dates,
                            datasets: [
                               {
                                    data: newDeaths,
                                    backgroundColor: '#ff9999',
                                    label: 'Daily Deaths'
                                },
                                {
                                    data:newRecovered,
                                    backgroundColor: '#99ccff',
                                    label: 'Daily Recovered'
                                },
                                {
                                    data:newCases,
                                    backgroundColor: '#ffe6b3',
                                    label: 'Daily New Cases'
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: `Daily Corona Virus Cases in ${world[0].Country}`,
                                fontSize: 20
                            }
        
                        }}
                    />
                </Container>
                
            ) 
        } else if(world[0]!=null){
            const newDeaths =[]
            const newRecovered = []
            const newCases =[]
            for(let i=0;i<7;i++){
                newDeaths.push(world[i].NewDeaths)
                newRecovered.push(world[i].NewRecovered)
                newCases.push(world[i].NewConfirmed)
            }
            // world.forEach(e =>{
            //     newDeaths.push(e.NewDeaths)
            //     newRecovered.push(e.NewRecovered)
            //     newCases.push(e.NewConfirmed)
            // })
            return(
                <Container style={{marginTop:'50px'}}>
                    
                    <Bar 
                        data={{
                            labels: dates,
                            datasets: [
                               {
                                    data: newDeaths,
                                    
                                    backgroundColor: '#ff9999',
                                    label: 'Daily Deaths'
                                },
                                {
                                    data: newRecovered,
                                    backgroundColor: '#99ccff',
                                    label: 'Daily Recovered'
                                },
                                {
                                    data: newCases,
                                    backgroundColor: '#ffe6b3',
                                    label: 'Daily New Cases'
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: 'Daily Corona Virus Cases Worldwide',
                                fontSize: 20
                            }
        
                        }}
                    />
                </Container>
                
            )
        } else{
            return(
                <div>
                    Error while fetching
                </div>
            )
        }
        
    }

    
}

export default BarChart;