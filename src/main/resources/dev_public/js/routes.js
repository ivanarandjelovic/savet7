"use strict";

import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
//import createHistory from 'history/lib/createHashHistory'
import { hashHistory } from 'react-router'

import S7App from './components/s7App';
import BuildingList from './components/buildingList';
import BuildingDetail from './components/buildingDetail';
import NotFound from './components/notFoundPage';

/*const historyOptions = {
  queryKey : false
};*/
//<Router history={createHistory(historyOptions)}>

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={ S7App }>
      <IndexRoute component={ BuildingList }/>
      <Route path='buildingList' component={ BuildingList } />
      <Route path='home' component={ BuildingList } />
      <Route path='buildingDetails' component={ BuildingDetails } />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

export default routes;
