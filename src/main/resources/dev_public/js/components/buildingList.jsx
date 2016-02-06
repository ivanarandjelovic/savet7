var React = require('react');
import Link from 'react-router/lib/Link';
import {
  connect
} from 'react-redux'
var translate = require('counterpart');
var buildingActions = require('../actions/buildingActions');
import Address from './address.jsx'

var BuildingList = React.createClass({

  _refreshDataIfNeeded: function(refresh) {
    if(refresh) {
      this.props.dispatch(buildingActions.getBuildings());
    }
  },

  getInitialState: function() {
    //console.log("getInitialState");
    return {loggedIn : this.props.loginData.loggedIn};
  },

  componentWillMount: function() {
    //console.log('componentWillMount');
      this._refreshDataIfNeeded(this.state.loggedIn);
  },

  componentWillReceiveProps: function (newProps) {
    //console.log('componentWillReceiveProps');
    if(this.state.loggedIn != newProps.loginData.loggedIn) {
      this.setState({loggedIn : newProps.loginData.loggedIn});
      this._refreshDataIfNeeded(newProps.loginData.loggedIn);
    }
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

export default connect(state => state)(BuildingList);
