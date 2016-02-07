import React from 'react'
import Link from 'react-router/lib/Link'
import { connect } from 'react-redux'
import translate from 'counterpart'
import buildingActions from '../actions/buildingActions'
import Address from './address.jsx'
import PubSubJs from 'pubsub-js'

var BuildingList = React.createClass({
    pubsubToken: null,

  refreshDataIfNeeded: function(refresh) {
//    console.log('_refreshDataIfNeeded ='+refresh);
    if(refresh) {
      this.props.dispatch(buildingActions.getBuildings());
    }
  },

  getInitialState: function() {
    //console.log("getInitialState");
    return {loggedIn : this.props.loginData.loggedIn};
  },

  componentWillMount: function() {
      this.pubsubToken = PubSubJs.subscribe('LOGIN', function(msg, data) {
        this.refreshDataIfNeeded(true);
      }.bind(this));
      this.refreshDataIfNeeded(this.state.loggedIn);
  },

  compoentWillUnmount: function() {
    PubSubJs.unsubscribe(this.pubsubToken);
  },

  render: function() {
    //console.log('render');

    var buildings = undefined;
    if(this.props.data.buildings !== undefined) {
      var buildings = this.props.data.buildings._embedded.buildings;
    }

    if(!this.props.loginData.loggedIn) {
      return <span>{translate('APP_NOT_LOGGED_IN')}</span>;
    } else if (buildings === undefined || buildings.length === 0) {
      return <span>Empty building list</span>;
    } else {
    return (
      <table className="table table-striped">
          <tbody>
        {
          buildings.map(function(building) {
            return (
              <tr key={building.id}>
                <td>
                  <Link to={`buildingDetails/${building.id}`}>
                    <span>
                      {building.name}
                    </span>
                  </Link>
                </td>
                <td>
                  <Address address={building.address}/>
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    );
    }
  }
});

//module.exports = BuildingList;

export default connect(state => { return { loginData: state.loginData, data: state.data };})(BuildingList);
