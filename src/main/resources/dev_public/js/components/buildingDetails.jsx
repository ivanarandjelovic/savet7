var React = require('react');
import {
  connect
} from 'react-redux'
import translate from 'counterpart'
import buildingActions from '../actions/buildingActions'
import Address from './address.jsx'
import Link from 'react-router/lib/Link'
import IndexLink from 'react-router/lib/IndexLink'

var BuildingDetails = React.createClass({

  componentWillMount: function() {
    console.log(this.props);
    this.props.dispatch(buildingActions.getBuilding(this.props.params.buildingId));
  },

  render: function() {

    var building = this.props.data.building;

    if (building === undefined) {
      return (
        <div></div>
      );
    }

    return (
      <div className="panel panel-default">
      	<div className="panel-heading">
      		<h3 className="panel-title">{translate('BUILDING_DETAILS')}</h3>

      	</div>
      	<div className="panel-body">
      		<div className="row">
      			<div className="col-sm-2 text-right">
      				<strong>{translate('EDIT_ID')}:</strong>
      			</div>
      			<div className="col-sm-10">{building.id}</div>
      		</div>
      		<div className="row">
      			<div className="col-sm-2 text-right">
      				<strong>{translate('EDIT_BUILDING_NAME')}:</strong>
      			</div>
      			<div className="col-sm-10">{building.name}</div>
      		</div>
      		<div className="row">
      			<div className="col-sm-2 text-right">
      				<strong>{translate('ADDRESS')}:</strong>
      			</div>
      			<div className="col-sm-8">
      				<Address address={building.address} />
      			</div>
      			<div className="col-sm-2">
      				<button className="btn btn-primary pull-right" ng-click="editAddress()">
      					<span className="glyphicon glyphicon-edit" /> {translate('APP_EDIT_ADDRESS')}
      				</button>
      			</div>
      		</div>
      		<IndexLink className="btn btn-default" to="/">{translate('APP_BACK')}</IndexLink>
      		<Link className="btn btn-primary pull-right" to={"/editBuilding/"+building.id}>
      			<span className="glyphicon glyphicon-edit" /> {translate('APP_EDIT')}
      		</Link>
      	</div>
      </div>
    );
  }
});

//module.exports = BuildingDetails;

export default connect(state => state)(BuildingDetails);
