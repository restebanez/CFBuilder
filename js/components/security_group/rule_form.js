/** @jsx React.DOM */

var React = require('react');
var Formsy = require('formsy-react');
var assign = require('object-assign');

var SecurityGroupActions = require('../../actions/security_group');
var InputWithMsg = require('./input_with_msg');

function isCIDR(value){
    var cidrRegex = new RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(/([0-9]|[1-2][0-9]|3[0-2]))$");
    return cidrRegex.test(value);
}

function isJson(value) {
    try {
        JSON.parse(value);
        return (true);
    } catch (err) {
        return false
    }
}

Formsy.addValidationRule('isJson_or_isCidr', function (value) {
    return(isJson(value) || isCIDR(value));
});

Formsy.addValidationRule('isJson', function (value) {
    return(isJson(value));
});

var SecurityGroupRuleForm = React.createClass({
    getInitialState: function(){

        return {
            rule: this.props.rule
        }
    },

    _onDestroyClick: function() {
        SecurityGroupActions.destroy(this.props.index);
    },


    setRule: function(rule){
        if(isJson(rule.CidrIp)) rule.CidrIp = JSON.parse(rule.CidrIp);
        if(isJson(rule.SourceSecurityGroupOwnerId)) rule.SourceSecurityGroupOwnerId = JSON.parse(rule.SourceSecurityGroupOwnerId);
        if(isJson(rule.SourceSecurityGroupName)) rule.SourceSecurityGroupName = JSON.parse(rule.SourceSecurityGroupName);


        this.setState({rule: rule});
    },


    updateRule: function(){
        console.log('updateRule');
        console.log(this.state.rule);
        SecurityGroupActions.update(this.props.index, this.state.rule);
    },


    render: function(){
        console.log('render rule_form');

        var cidrIpString = typeof this.props.rule.CidrIp === 'object' ? JSON.stringify(this.props.rule.CidrIp) : this.props.rule.CidrIp;
        var SourceSecurityGroupOwnerId  = typeof this.props.rule.SourceSecurityGroupOwnerId === 'object' ? JSON.stringify(this.props.rule.SourceSecurityGroupOwnerId) : this.props.rule.SourceSecurityGroupOwnerId;
        var SourceSecurityGroupName  = typeof this.props.rule.SourceSecurityGroupName === 'object' ? JSON.stringify(this.props.rule.SourceSecurityGroupName) : this.props.rule.SourceSecurityGroupName;
        var sgSource = (
              <div className="row">
                  <div className="col-md-6 column">
                      <InputWithMsg name="SourceSecurityGroupOwnerId" value={SourceSecurityGroupOwnerId} validations="isJson" validationError="invalid JSON" required/>

                  </div>
                  <div className="col-md-6 column">
                      <InputWithMsg name="SourceSecurityGroupName" value={SourceSecurityGroupName} validations="isJson" validationError="invalid JSON" required/>
                  </div>
              </div>
        );

        var cidrSource = (
                <InputWithMsg name="CidrIp" value={cidrIpString} validations="isJson_or_isCidr" validationError="invalid CIDR or JSON" required/>
        );

        var source = typeof this.props.rule["CidrIp"] !== 'undefined' ? cidrSource : sgSource;

        return(
          <Formsy.Form onChange={this.setRule} onValid={this.updateRule}>
              <div className="row clearfix">
                  <div className="col-md-2 column">
                      <InputWithMsg name="IpProtocol" value={this.props.rule.IpProtocol} validations="isAlpha" validationError="only tcp and udp are valid" required/>
                  </div>
                  <div className="col-md-2 column">
                      <InputWithMsg name="FromPort" value={this.props.rule.FromPort} validations="isNumeric" validationError="only numeric value" required/>
                  </div>
                  <div className="col-md-2 column">
                      <InputWithMsg name="ToPort" value={this.props.rule.ToPort} validations="isNumeric" validationError="only numeric value" required/>
                  </div>
                  <div className="col-md-6 column">
                      <div className="row clearfix">
                          <div className="col-md-11 column">
                             {source}
                          </div>
                          <div className="col-md-1 column">
                              <span className="input-group-btn">
                                  <button
                                      onClick={this._onDestroyClick}
                                      tabIndex="-1"
                                      type="button"
                                      className="btn btn-danger">
                                      X
                                  </button>
                              </span>
                          </div>
                      </div>
                  </div>
              </div>
          </Formsy.Form>
        )
    }
});

module.exports = SecurityGroupRuleForm;
