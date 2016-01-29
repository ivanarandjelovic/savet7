"use strict";

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
//import createHistory from 'history/lib/createHashHistory'
import { browserHistory } from 'react-router'

import S7App from './components/s7App';
import BuildingList from './components/buildingList';
import BuildingDetails from './components/buildingDetails';
import NotFound from './components/notFoundPage';

/*const historyOptions = {
  queryKey : false
};*/
//<Router history={createHistory(historyOptions)}>

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={ S7App }>
      <IndexRoute component={ BuildingList }/>
      <Route path='buildingDetails/:buildingId' component={ BuildingDetails } />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

export default routes;
