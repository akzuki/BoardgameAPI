import React from 'react';
import { Link } from 'react-router';

export class Header extends React.Component {
    render() {
        const userToken =  localStorage.getItem('userToken');
        return (
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">BoardgameStore</a>
              </div>
              {userToken ? (
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#"><span className="glyphicon glyphicon-user"></span> My orders</a></li>
                    <li><a href="#"><span className="glyphicon glyphicon-user"></span> Log out</a></li>
                  </ul>
                </div>
              ) : (
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="/login"><span className="glyphicon glyphicon-user"></span> Log in</a></li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        );
    }
}
