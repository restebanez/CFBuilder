/** @jsx React.DOM */

var React = require('react');
var SecurityGroupIngressStore = require('../../stores/security_group_ingress');
var SecurityGroupActions = require('../../actions/security_group');


var SecurityGroupRuleForm = require('./rule_form');

function getIngressState() {
    return {
        rules: SecurityGroupIngressStore.getAll()
    };
}

var InboundRules = React.createClass({
    getInitialState: function() {
        return getIngressState()
    },

    componentDidMount: function() {
        SecurityGroupIngressStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        SecurityGroupIngressStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getIngressState());
    },

    showRules: function(){
        return JSON.stringify(SecurityGroupIngressStore.display(), null, " "); // the space param on the last param means pretty printing
    },

    newCIDRRule: function(){
        SecurityGroupActions.newCIDRRule();
    },

    newSgSourceRule: function(){
        SecurityGroupActions.newSgSourceRule();
    },

    render: function(){
        var that = this;
        var rows = [];

        this.state.rules.map(function(rule, id){
            console.log('ids map');
            console.log(id);
            rows.push(<SecurityGroupRuleForm key={id} index={id} rule={rule} />);
        });

        return (
            <div className="container">
                <div className="row clearfix">
                    <div className="col-md-2 column"></div>

                    <div className="col-md-10 column">
                        <div className="row">
                            <div className="col-md-2 column">Protocol</div>
                            <div className="col-md-2 column">From Port</div>
                            <div className="col-md-2 column">To Port</div>
                            <div className="col-md-6 column">{this.props.vpc ? 'Destination' : 'Source' }</div>
                        </div>
                        {rows}
                        <button onClick={this.newCIDRRule} className="btn btn-default">New CIDR Rule</button>
                        <button onClick={this.newSgSourceRule} className="btn btn-default">New Security Group Source Rule</button>
                        <pre>{this.showRules()}</pre>
                    </div>

                </div>
            </div>
        )
    }
});

module.exports = InboundRules;
