import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

var LoginLink = React.createClass({

  getInitialState: function() {
    return {modalIsOpen: false};
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
    // TODO: trigger login here!
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
              <h4>Really long content...</h4>
              <p>Test text</p>
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
