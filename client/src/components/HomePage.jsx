import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <div className= "home">
      <Card className= "home">
      {Auth.isUserAuthenticated() ? (
        
        <div ></div>    
          ) : (
            <div>
        <CardTitle  title="Bookworms"/>
            <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
            </div>
          )}
      </Card>
     </div>
    )
    
  }
};

export default HomePage;
