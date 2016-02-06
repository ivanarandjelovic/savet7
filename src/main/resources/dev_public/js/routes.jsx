"use strict";

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
//import createHistory from 'history/lib/createHashHistory'
import { browserHistory } from 'react-router'

import S7App from './components/s7App.jsx';
import BuildingList from './components/buildingList.jsx';
import BuildingDetails from './components/buildingDetails.jsx';
import NotFound from './components/notFoundPage.jsx';
var Provider = require('react-redux').Provider;

var S7Store = require('./s7Store');

/*const historyOptions = {
  queryKey : false
};*/
//<Router history={createHistory(historyOptions)}>

const routes = (
  <Provider store={S7Store}>
    <Router history={browserHistory}>
      <Route path='/' component={ S7App }>
        <IndexRoute component={ BuildingList }/>
        <Route
          path='buildingDetails/:buildingId'
          component={ BuildingDetails } />
        <Route path='*' component={NotFound}/>
      </Route>
    </Router>
  </Provider>
);

export default routes;
