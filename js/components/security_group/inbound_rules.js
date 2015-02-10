/** @jsx React.DOM */

var React = require('react');
var SecurityGroupRuleForm = require('./rule_form');

var InboundRules = React.createClass({
    getInitialState: function() {
        return {
            rules: this.props.rules
        };
    },

    showRules: function(){
        return JSON.stringify(this.state.rules, null, " "); // the space param on the last param means pretty printing
    },

    updateRule: function(rule, ruleIndex){
        console.log('ruleIndex');
        console.log(ruleIndex);
        var newRules = JSON.parse( JSON.stringify( this.state.rules ));
        newRules.Properties.SecurityGroupIngress[ruleIndex] = rule;
        this.setState({rules: newRules});
    },

    ruleRemoval: function(id){
        console.log('id');
        console.log(id);
        var newRules = JSON.parse( JSON.stringify( this.state.rules ));
        newRules.Properties.SecurityGroupIngress.splice(id, 1);
        this.setState({rules: newRules});
    },

    newCIDRRule: function(){
        var newRules = JSON.parse( JSON.stringify( this.state.rules ));
        newRules.Properties.SecurityGroupIngress.push(
            {
                "IpProtocol": "",
                "FromPort": "",
                "ToPort": "",
                "CidrIp": ""
            }
        );
        this.setState({rules: newRules});
    },

    newSecurityGroupRule: function(){
        var newRules = JSON.parse( JSON.stringify( this.state.rules ));
        newRules.Properties.SecurityGroupIngress.push(
            {
                "IpProtocol": "",
                "FromPort": "",
                "ToPort": "",
                "SourceSecurityGroupOwnerId": "",
                "SourceSecurityGroupName": ""
            }
        );
        this.setState({rules: newRules});
    },

    render: function(){
        var that = this;
        var rows = [];
        if (typeof this.props.rules === 'object')
        {
            var securityGroupIngress = this.state.rules.Properties.SecurityGroupIngress;
            securityGroupIngress.map(function(rule, id){

                console.log('ids map');
                console.log(id);
                rows.push(<SecurityGroupRuleForm key={id} index={id} rule={rule} onRuleChange={that.updateRule} onRuleRemoval={that.ruleRemoval} />);
            });
        } else {
            rows.push(<SecurityGroupRuleForm />);
        }

        return (
            <div className="container">
                <div className="row clearfix">
                    <div className="col-md-2 column"></div>

                    <div className="col-md-10 column">
                        <div className="row">
                            <div className="col-md-2 column">Type</div>
                            <div className="col-md-2 column">Protocol</div>
                            <div className="col-md-2 column">Port Range</div>
                            <div className="col-md-6 column">{this.props.vpc ? 'Destination' : 'Source' }</div>
                        </div>
                    {rows}
                        <button onClick={this.newCIDRRule} className="btn btn-default">New CIDR Rule</button>
                        <button onClick={this.newSecurityGroupRule} className="btn btn-default">New Security Group Rule</button>
                        <pre>{this.showRules()}</pre>
                    </div>

                </div>
            </div>
        )
    }
});

module.exports = InboundRules;
