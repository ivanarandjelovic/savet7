import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { Link } from 'react-router'
import LoginLink from './loginLink.jsx'
var loginActions = require('../actions/loginActions');

var NavBar = React.createClass({

  logout: function() {
    this.props.dispatch(loginActions.logout());
  },

  render: function() {

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          {/* Brand and toggle get grouped for better mobile display */}
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false">
              <span className="sr-only">
                Toggle navigation
              </span>
              <span
                className="icon-bar">
              </span>
              <span className="icon-bar">
              </span>
              <span
                className="icon-bar">
              </span>
            </button>
            <a className="navbar-brand" href="#">Savet7</a>
          </div>

          {/* Collect the nav links, forms, and other content for toggling */}
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">

            <li className="dropdown">
              <a
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                id="langSelectLink">English<span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li className="active">
                <a>English</a>
              </li>
              <li className="">
                <a>Serbian</a>
              </li>
            </ul>
          </li>
          { this.props.loginData.loggedIn ? <li className="navbar-text">Logged in as <b>{this.props.loginData.username}</b></li> : ''}
          { this.props.loginData.loggedIn ? <li><a href="#" onClick={this.logout}>Logout</a></li> : <LoginLink {...this.props}/>}
          <li>
            <Link to="/">buildingList</Link>
          </li>
          <li>
            <Link to="buildingDetails">buildingDetails</Link>
          </li>

        </ul>

      </div>
    </div>
  </nav>
    );
  }
});

module.exports = NavBar;