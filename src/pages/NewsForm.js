import React from 'react'
import {Segment, Container, Form,Input, TextArea, Button, Header, Icon,Dropdown,Radio} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {firestore, addNews} from '../firebase/utils'

class FormNews extends React.Component {

    constructor(){
        super()
        this.state ={
            title: '',
            description: '',
            value: '',
            country:'',
            user: {}
        }
    }

    componentDidMount() {
        this.setState({user: this.props.currentUser})
    }

    onSubmit = async event =>{
        event.preventDefault()
        addNews(this.state)
        this.setState({title:'',description:'', value:'', country:''})
    }

    render() {
        const {currentUser, countryNames} = this.props
        if(currentUser){
            return(
                <Container>
                    <Container fluid>
                    <Link to='/'>
                        <Button
                            basic 
                            color='blue' 
                            floated='left'
                            style={{marginBottom:'1rem'}}
                            >Back
                        </Button>
                    </Link>
                    </Container>
                    <br />
                    <br />
                    
                    <Header as='h3'>Fill in the folowing form</Header>
                  
                    
                    <Form onSubmit={this.onSubmit} >
                        <Form.Field >
                            <label>News Title</label>
                            <Input 
                                placeholder="Title" 
                                required
                                value={this.state.title}
                                onChange={event => this.setState({title: event.target.value})}
                            />
                        </Form.Field>
                        <Form.Field >
                            <label>News Description</label>
                            <TextArea 
                                placeholder="Description" 
                                required
                                value={this.state.description}
                                onChange={event => this.setState({description: event.target.value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Worldwide'
                                name='radioGroup'
                                value='worldwide'
                                checked={this.state.value === 'worldwide'}
                                onChange={(e,{value}) => this.setState({value})}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Country'
                                name='radioGroup'
                                value='country'
                                checked={this.state.value === 'country'}
                                onChange={(e,{value}) => this.setState({value})}
                            />
                        </Form.Field>
                        {
                            this.state.value === 'country' ?
                            <Form.Field>
                            <Dropdown
                                placeholder='Select Country'
                                fluid
                                search
                                selection
                                options={countryNames}
                                onChange={event=>this.setState({country: event.target.textContent})}
                            />
                            </Form.Field> :
                            null
                        }
                        
                        
                        <Button style={{marginBottom:'3rem'}} primary >Add</Button>
                    </Form>
                    
                </Container>
            )
        } else {
            return (
                <Container>
                    <Link to='/'>
                        <Button
                            basic 
                            color='blue' 
                            floated='left'
                            style={{marginBottom:'1rem'}}
                            >Back
                        </Button>
                    </Link>
                    <Segment placeholder>
                        <Header icon>
                            <Icon name='user' />
                                    You must sign in first
                            </Header>
                    </Segment>
                </Container>
            )
        }
        

    }
}

export default FormNews