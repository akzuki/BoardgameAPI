import React from 'react';
import { browserHistory } from 'react-router';

export class StoreLogin extends React.Component {
    constructor() {
        super();
        this.state = {
          error: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      event.preventDefault();
      fetch('https://localhost:3000/panel/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          'email': $('#email').val(),
          'password': $('#password').val()
        }),
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((resp) => resp.json())
        .then((result) => {
          if (result.status == 200) {
            localStorage.setItem('storeToken', result.data);
            browserHistory.push('/panel');
          } else {
            this.setState({
              error: result.description
            });
          }
        });
    }

    render() {
        return (
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h1>Sign In</h1>
                        <div style={{display: this.state.error ? 'block' : 'none' }} className="alert alert-danger">
                            {this.state.error}
                        </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">E-Mail</label>
                            <input type="text" id="email" name="email" required className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
              </div>
            </div>
        );
    }
}
