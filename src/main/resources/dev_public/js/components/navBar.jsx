import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { Link } from 'react-router'
import LoginLink from './loginLink.jsx'
import LanguageSelect from './languageSelect.jsx'
var loginActions = require('../actions/loginActions');
var translate = require('counterpart');


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
                {translate('APP_NAV_TOGGLE')}
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
            <Link to="/" className="navbar-brand">{translate('APP_TITLE')}</Link>
          </div>

          {/* Collect the nav links, forms, and other content for toggling */}
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">

          <LanguageSelect {...this.props}/>
          { this.props.loginData.loggedIn ? <li className="navbar-text">{translate('APP_LOGIN_AS')} <b>{this.props.loginData.username}</b></li> : ''}
          { this.props.loginData.loggedIn ? <li><a href="#" onClick={this.logout}>{translate('APP_LOGIN_LOGOUT')}</a></li> : <LoginLink {...this.props}/>}

        </ul>

      </div>
    </div>
  </nav>
    );
  }
});

module.exports = NavBar;
