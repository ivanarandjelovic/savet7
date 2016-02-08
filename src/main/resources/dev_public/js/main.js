"use strict";

import ReactDOM from 'react-dom';
import routes from './routes.jsx';
//window.$ = window.jQuery = require('jquery');
require('bootstrap');
var S7Store = require('./s7Store');
var translate = require('counterpart');

translate.registerTranslations('en', require('./locales/en.json'));
translate.registerTranslations('rs', require('./locales/rs.json'));

ReactDOM.render(routes, document.getElementById('s7App'));

document.getElementById('appTitle').innerHTML=translate('APP_TITLE');

var oldLang = '';

// Listen to the store chanegs and change window title when language changes
// (a bot of overkill to subscribe to whole store for such a small and rare event, but OK)
S7Store.subscribe(() => {
  var currentLang = S7Store.getState().appData.langCd;
  if(oldLang !== currentLang) {
    oldLang = currentLang;
    document.getElementById('appTitle').innerHTML=translate('APP_TITLE');
  }
});
