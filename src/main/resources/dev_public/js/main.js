"use strict";


var React = require('react');
var ReactDOM = require('react-dom');

console.log(React);
console.log(ReactDOM);

require('./s7Store');
require('./s7App');

alert("123");

ReactDOM.render(
    <S7App />,
    document.getElementById('s7Container')
  );
