
var appActions = {


  setLanguage: (langCd) => {
    return {
      type: 'APP_ACTION_LANGUAGE',
      langCd: langCd
    }
  }

};

module.exports = appActions;
