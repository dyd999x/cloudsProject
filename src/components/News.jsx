import React from 'react'
import {Segment, Container, Item, Header,Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
class News extends React.Component {

    constructor(){
        super()
        
    }

    renderItems = (news)=> {
        return news.map((n) => {
        return (
            <Item>
                <Item.Content>
                    <Item.Header as='h3'>{n.title}</Item.Header>
                    <Item.Meta>{`${n.user} at ${n.date}`}</Item.Meta>
                    <Item.Description>
                        {n.description} 
                    </Item.Description>
                </Item.Content>
            </Item>
        )
    })
    }

    render() {
        const {news,country} = this.props
        
            return(
                <Container style={{marginTop:'2rem'}}>
                   
                    <Container textAlign="center">
                        {
                            country ?
                            <Header as='h1'>{`${country} News`}</Header> :
                            <Header as='h1'>Global News</Header>
                        }
                        
                        <Container textAlign='left'>
                            <Item.Group>
                            {this.renderItems(news)}
                            </Item.Group>

                        </Container>
                    </Container>
                </Container>
                
                
            )
        
    }
}

export default News