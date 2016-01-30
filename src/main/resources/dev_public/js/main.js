"use strict";

import ReactDOM from 'react-dom';
import routes from './routes';
window.$ = window.jQuery = require('jquery');
require('bootstrap');

ReactDOM.render(routes, document.getElementById('s7App'));

