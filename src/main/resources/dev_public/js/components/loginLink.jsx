import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var loginActions = require('../actions/loginActions');

var LoginLink = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {modalIsOpen: false, username: '', password: ''};
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  handleModalCloseRequest: function() {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({modalIsOpen: false});
  },

  handleInputChange: function() {
    this.setState({foo: 'bar'});
  },

  handleLoginClicked: function() {
    this.props.dispatch(loginActions.login(this.state.username,this.state.password));
  },

  render: function() {

    // Modal dialog extra styles, to overwrite default values
    var modalStyles = {
      overlay: {},
      content: {
        border: 'none',
        padding: '0px'
      }
    };

    return (
      <li>
        <a href="#" onClick={this.openModal}>Login</a>
        <Modal className="Modal__Bootstrap modal-dialog" closeTimeoutMS={150} isOpen={this.state.modalIsOpen} onRequestClose={this.handleModalCloseRequest} style={modalStyles}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Login to Savet7</h4>
            </div>
            <div className="modal-body">
              <form role="form">
                <div className="form-group">

                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    id="username"
                    onClick={this.handleChange}
                    valueLink={this.linkState('username')}/>

                </div>

                <div className="form-group">

                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    onClick={this.handleChange}
                    valueLink={this.linkState('password')}/>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.handleModalCloseRequest}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={this.handleLoginClicked}>Login</button>
            </div>
          </div>
        </Modal>
      </li>
    );
  }
});

module.exports = LoginLink;
