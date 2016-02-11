import React from 'react'
import Link from 'react-router/lib/Link'
import {connect} from 'react-redux'
import translate from 'counterpart'
import buildingActions from '../actions/buildingActions'
import Address from './address.jsx'
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var EditBuilding = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    var b = {};
    console.log(this.props.data.building);
    if(this.props.data.building) {
      Object.assign(b, this.props.data.building)
    }
    console.log(b);
    return b;
  },

  componentWillMount: function() {
    console.log(this.props);
    this.props.dispatch(buildingActions.getBuilding(this.props.params.buildingId));
  },

  componentWillReceiveProps: function(newProps) {
    var b = {};
    if(newProps.data.building) {
      Object.assign(b, newProps.data.building)
    }
    console.log(b);
    this.setState(b);
  },

  render: function() {
    //console.log('render');

    return (

      <form noValidate="noValidate" className="form-horizontal" name="buildingForm">
        <div className="col-sm-offset-2 col-sm-10">
          <h2>{this.state.id === undefined
              ? translate('ADD_BUILDING_DETAILS')
              : translate('EDIT_BUILDING_DETAILS')}</h2>
        </div>
        <div className="form-group has-error hidden">
          <div className="col-sm-offset-2 col-sm-10">
            <div className="help-block with-errors">{translate('FORM_SUBMISSION_FAILED')}</div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">{translate('EDIT_ID')}</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="id" readOnly value={this.state.id}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">{translate('EDIT_BUILDING_NAME')}</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="name" name="name" valueLink={this.linkState('name')}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-1">

            <button type="submit" className="btn btn-success" ng-click="submit()">
              {translate('APP_SAVE')}
            </button>
          </div>
          <div className="col-sm-8">

            <Link type="button" className="btn btn-warning" to={(this.state.id === undefined
              ? "/"
              : "/buildingDetails/" + this.state.id)}>
              {translate('APP_CANCEL')}
            </Link>

          </div>

        </div>
      </form>
    );
  }
});

//module.exports = BuildingList;

export default connect(state => {
  return {data: state.data};
})(EditBuilding);
