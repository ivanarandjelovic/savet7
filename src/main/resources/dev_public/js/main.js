"use strict";

import ReactDOM from 'react-dom';
import routes from './routes.jsx';
window.$ = window.jQuery = require('jquery');
require('bootstrap');

var translate = require('counterpart');
translate.registerTranslations('en', require('./locales/en.json'));
translate.registerTranslations('rs', require('./locales/rs.json'));

ReactDOM.render(routes, document.getElementById('s7App'));
