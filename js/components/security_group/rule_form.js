/** @jsx React.DOM */

var React = require('react');
var assign = require('object-assign');

var SecurityGroupActions = require('../../actions/security_group');

var SecurityGroupRuleForm = React.createClass({
    getInitialState: function(){
        return {
            rule: this.props.rule
        };

    },

    updateRule: function(){
        var newRule = assign({}, this.state.rule);
        newRule["IpProtocol"]= this.refs.IpProtocol.getDOMNode().value;
        newRule["FromPort"]= this.refs.FromPort.getDOMNode().value;
        newRule["ToPort"]= this.refs.ToPort.getDOMNode().value;
        if (typeof this.state.rule.CidrIp !== 'undefined'){
            newRule["CidrIp"]= this.refs.CidrIp.getDOMNode().value;
        } else {
            newRule["SourceSecurityGroupOwnerId"]= this.refs.SourceSecurityGroupOwnerId.getDOMNode().value;
            newRule["SourceSecurityGroupName"]= this.refs.SourceSecurityGroupName.getDOMNode().value;
        }

        this.setState({rule: newRule});
        SecurityGroupActions.update(this.props.index, newRule);
    },

    _onDestroyClick: function() {
        SecurityGroupActions.destroy(this.props.index);
    },

    render: function(){
        var sgSource = (
            <div className="row">
                <div className="col-md-6 column">
                    <input type="text" value={this.state.rule.SourceSecurityGroupOwnerId} onChange={this.updateRule} className="form-control" ref="SourceSecurityGroupOwnerId" />
                </div>
                <div className="col-md-6 column">
                    <input type="text" value={this.state.rule.SourceSecurityGroupName} onChange={this.updateRule} className="form-control" ref="SourceSecurityGroupName" />
                </div>
            </div>
        );

        var cidrSource = (
            <input type="text" value={this.state.rule.CidrIp} onChange={this.updateRule} className="form-control"  ref="CidrIp" />
        );

        var source = typeof this.state.rule.CidrIp !== 'undefined' ? cidrSource : sgSource;

        return(
            <div className="row clearfix">
                <div className="col-md-2 column">
                    <input type="text" value={this.state.rule.IpProtocol} onChange={this.updateRule} className="form-control" ref="IpProtocol" />
                </div>
                <div className="col-md-2 column">
                    <input type="text" value={this.state.rule.FromPort} onChange={this.updateRule} className="form-control" ref="FromPort" />
                </div>
                <div className="col-md-2 column">
                    <input type="text" value={this.state.rule.ToPort} onChange={this.updateRule} className="form-control" ref="ToPort" />
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
        )
    }
});

module.exports = SecurityGroupRuleForm;
