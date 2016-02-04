"use strict";

import ReactDOM from 'react-dom';
import routes from './routes.jsx';
window.$ = window.jQuery = require('jquery');
require('bootstrap');
var S7Store = require('./s7Store');
var translate = require('counterpart');

translate.registerTranslations('en', require('./locales/en.json'));
translate.registerTranslations('rs', require('./locales/rs.json'));

ReactDOM.render(routes, document.getElementById('s7App'));

document.getElementById('appTitle').innerHTML=translate('APP_TITLE');

var oldLang = '';

S7Store.subscribe(() => {
  var currentLang = S7Store.getState().appData.langCd;
  if(oldLang !== currentLang) {
    oldLang = currentLang;
    document.getElementById('appTitle').innerHTML=translate('APP_TITLE');
  }
});
