/** @jsx React.DOM */

var React = require('react');
var SecurityGroupActions = require('../../actions/security_group');

var SecurityGroupRuleForm = React.createClass({
    getInitialState: function(){
        return {
            rule: this.props.rule
        };

    },

    updateRule: function(){
        var that = this;
        var newRule = {
            "IpProtocol": that.refs.IpProtocol.getDOMNode().value,
            "FromPort": that.refs.FromPort.getDOMNode().value,
            "ToPort": that.refs.ToPort.getDOMNode().value,
            "CidrIp": that.refs.CidrIp.getDOMNode().value
        }
        this.setState({rule: newRule});
        SecurityGroupActions.update(this.props.index, newRule);
    },

    _onDestroyClick: function() {
        SecurityGroupActions.destroy(this.props.index);
    },

    render: function(){
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
                            <input type="text" value={this.state.rule.CidrIp} onChange={this.updateRule} className="form-control"  ref="CidrIp" />
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
