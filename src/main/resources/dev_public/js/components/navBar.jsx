var React = require('react');
import { Link } from 'react-router';

var NavBar = React.createClass({

  login: function() {
    console.log(this.props);
    this.props.dispatch({
      type: 'LOGIN_ACTION',
      username: 'Tester'
    });

  },

  logout: function() {
    this.props.dispatch({
      type: 'LOGIN_ACTION',
      username: null
    });

  },

  render: function() {
    var loggedInText = null;
    if(this.props.loginData.username === null) {
      loggedInText = <span>Logged out</span>;
    } else {
      loggedInText = <span>Logged in as <b>{this.props.loginData.username}</b></span>;
    }

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

              <ul
                className="nav navbar-nav"
                ng-controller="langCtrl">

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
            </ul>


            <p className="navbar-text" ng-if="loggedIn">
          {loggedInText}
        </p>

          <li>
            <a onClick={this.login} id="loginLink">Login</a>
          </li>
          <li>
            <a onClick={this.logout} id="logoutLink">Logout</a>
          </li>

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
