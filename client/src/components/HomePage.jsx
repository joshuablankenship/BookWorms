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
      <div>
      {Auth.isUserAuthenticated() ? (
        
        <div></div>    
          ) : (
            <div>
              <Card className="container">
        <CardTitle title="Bookworms"/>
            <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
            </Card>
            </div>
          )}
      
      </div>
    )
  }
};

export default HomePage;
