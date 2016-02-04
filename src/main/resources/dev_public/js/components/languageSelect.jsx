var React = require('react');
import {
  connect
} from 'react-redux'
var translate = require('counterpart');
var appActions = require('../actions/appActions');

var LanguageSelect = React.createClass({

  handleLanguageChange:  function(langCd) {
    translate.setLocale(langCd);
    // Set language in the store, also triggering render of all components
    this.props.dispatch(appActions.setLanguage(langCd));
  },

  render: function() {
    return (
      <li className="dropdown">
        <a
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          id="langSelectLink">{translate('APP_LANG_CURRENT')}<span className="caret"></span>
      </a>
      <ul className="dropdown-menu">
        <li className={(translate.getLocale() === 'en' ? 'active' : '')} onClick={() => this.handleLanguageChange('en')}>
          <a href="#">{translate('APP_LANG_ENGLISH')}</a>
        </li>
        <li className={(translate.getLocale() === 'rs' ? 'active' : '')} onClick={() => this.handleLanguageChange('rs')}>
          <a href="#">{translate('APP_LANG_SERBIAN')}</a>
        </li>
      </ul>
    </li>
    );
  }
});

module.exports = LanguageSelect;

//export default connect(state => state)(LanguageSelect);
