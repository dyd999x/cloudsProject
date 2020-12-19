import React from 'react';
import { Header,Segment, Button,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {auth,signInWithGoogle} from '../firebase/utils'


const HeaderApp= ({currentUser}) =>{

        return(
            
            <Segment inverted >
                <Header as='h3' style={{margin: '0.5rem'}} textAlign="right" >
                    {currentUser ?
                            <Button primary onClick={() => auth.signOut()}>Sign Out </Button>
                            :
                            <Button primary onClick={signInWithGoogle}>Sign In </Button>
                    }
                    
                </Header>
            </Segment>
        
        );
    
}

export default HeaderApp;
