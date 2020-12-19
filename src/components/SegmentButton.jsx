import React from 'react'
import {Segment, Container, Form,Input, TextArea, Grid, Icon,Header} from 'semantic-ui-react'
import {Link,Redirect} from 'react-router-dom'

const SegmentButton =({page,country, history})=> {
        return(
            
            <Container>
             
              
                    <Header as='h3' textAlign="right" >
                        Add worlwide news or country specific news
                        <Link to='addNews'><Icon link name='plus' style={{marginLeft: '0.2rem'}}/></Link>
                     </Header>
               
           
            </Container>
           
        )
}

export default SegmentButton