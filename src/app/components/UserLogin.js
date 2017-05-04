import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

export class UserLogin extends React.Component {
    constructor(props) {
      super(props);
    }

    responseFacebook(response) {
      if (response.first_name && response.last_name && response.email && response.id && response.accessToken) {
        fetch('https://localhost:3000/api/auth/facebookLogin', {
          method: 'POST',
          body: JSON.stringify({
            'facebookId': response.id,
            'token': response.accessToken,
            'firstName': response.first_name,
            'lastName': response.last_name,
            'email': response.email
          }),
          mode: 'cors',
          headers: new Headers({
        		'Content-Type': 'application/json'
        	})
        }).then((resp) => resp.json())
          .then((result) => {
            localStorage.setItem('userToken', result.data);
            browserHistory.push('/');
          });
      }
    }

    render() {
        return (
            <div>
              <FacebookLogin
                appId="203071413519014"
                autoLoad={true}
                fields="first_name,last_name,email,picture"
                callback={this.responseFacebook.bind(this)} />
            </div>
        );
    }
}
