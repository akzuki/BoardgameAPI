import React from 'react';
import { Link } from 'react-router';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

export class StoreHeader extends React.Component {
    logOut() {
      localStorage.removeItem('storeToken');
      browserHistory.push('/panel');
    }

    onClickLogin() {
      browserHistory.push('/panel/login');
    }

    onClickOrder() {
      browserHistory.push('/panel/order');
    }

    onClickRegister() {
      browserHistory.push('/panel/register');
    }

    onClickPanel() {
      browserHistory.push('/panel');
    }

    render() {
        const storeToken =  localStorage.getItem('storeToken');
        return (
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a onClick={this.onClickPanel.bind(this)} className="navbar-brand" href="#">BoardgameStore Panel</a>
              </div>
              {storeToken ? (
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav navbar-right">
                    <li onClick={this.onClickOrder.bind(this)}><a href="#"> Orders</a></li>
                    <li onClick={this.logOut.bind(this)}><a href="#"> Log out</a></li>
                  </ul>
                </div>
              ) : (
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav navbar-right">
                    <li onClick={this.onClickLogin.bind(this)}><a href="#"><span className="glyphicon glyphicon-user"></span> Log in</a></li>
                    <li onClick={this.onClickRegister.bind(this)}><a href="#"><span className="glyphicon glyphicon-user"></span> Register</a></li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        );
    }
}
