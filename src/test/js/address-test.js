var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

const Address = require.requireActual('../../main/resources/dev_public/js/components/address.jsx');

describe('Address', () => {

  var address = {
    street: 1,
    number: 2,
    appartment: 3,
    postalCode: 4,
    city: 5,
    state: 6,
    country: 7
  };

  it('should display full address', () => {

    // Render a checkbox with label in the document
    var addr = TestUtils.renderIntoDocument( <Address address = {address}/>);
    var addrNode = ReactDOM.findDOMNode(addr);
    expect(addrNode.textContent).toEqual('1 2 34 567');
    expect(addrNode.querySelectorAll("div").length).toBe(4);

    delete address.state;

    addr = TestUtils.renderIntoDocument( <Address address = {address}/>);
    addrNode = ReactDOM.findDOMNode(addr);
    expect(addrNode.textContent).toEqual('1 2 34 57');
    expect(addrNode.querySelectorAll("div").length).toBe(3);
  });

});
