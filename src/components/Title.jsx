import {Header,Container,Image,Grid} from 'semantic-ui-react'

const Title = ({image}) =>{
    return(
        <Container textAlign="center">
            <Header as='h1'>
                <Header.Content>
                  
                    <div><Image src={image} size='mini' spaced/>COVID-19</div>
                <Header.Subheader>Live Updates and Statistics</Header.Subheader>
                </Header.Content>
            </Header>
            <br />
        </Container>
    )
}

export default Title