/** @jsx React.DOM */

var React = require('react');
var SecurityGroupRuleFormCidrIpAttrs = require('./rule_form_cidr_ip_attrs');
var SecurityGroupRuleFormSourceSecurityGroupAttrs = require('./rule_form_source_security_group_attrs');

var SecurityGroupRuleForm = React.createClass({
    getInitialState: function() {

        return {
            IpProtocol: this.props.rule.IpProtocol,
            FromPort: this.props.rule.FromPort,
            ToPort: this.props.rule.ToPort,
            CidrIp: this.props.rule.CidrIp,
            SourceSecurityGroupOwnerId: this.props.rule.SourceSecurityGroupOwnerId,
            SourceSecurityGroupName: this.props.rule.SourceSecurityGroupName
        };
    },
    mode: function(){ // 'cidr'|securityGroup
        if(this.props.rule.CidrIp === undefined){
            console.log('securityGroup mode');
            return 'securityGroup';
        } else {
            console.log('cidr mode');
            return 'cidr';
        }
    },
    portRange: function(){
        if (this.state.FromPort === this.state.ToPort){
            return this.state.FromPort;
        } else {
            return this.state.FromPort + ' - ' + this.state.ToPort;
        }

    },

    updatePortRange: function(){
        this.setState({FromPort: this.refs.portRange.getDOMNode().value});
        this.setState({ToPort: this.refs.portRange.getDOMNode().value});
        var rule = this.rule();
        rule["FromPort"] = this.refs.portRange.getDOMNode().value;
        rule["ToPort"] = this.refs.portRange.getDOMNode().value;
        this.updateParent(rule);
    },

    updateIpProtocol: function(){
        this.setState({IpProtocol: this.refs.IpProtocol.getDOMNode().value});
        var rule = this.rule();
        rule["IpProtocol"] = this.refs.IpProtocol.getDOMNode().value;
        this.updateParent(rule);
    },

    updateCidrIp: function(CidrIp){
        this.setState({CidrIp: CidrIp})
        var rule = this.rule();
        rule["CidrIp"] = CidrIp;
        this.updateParent(rule);
    },

    updateSecurityGroupRuleFormSourceSecurityGroupAttrs: function(sourceSecurityGroup){
        this.setState({SourceSecurityGroupOwnerId: sourceSecurityGroup.SourceSecurityGroupOwnerId});
        this.setState({SourceSecurityGroupName: sourceSecurityGroup.SourceSecurityGroupName});
        var rule = this.rule();
        rule["SourceSecurityGroupOwnerId"]= sourceSecurityGroup.SourceSecurityGroupOwnerId;
        rule["SourceSecurityGroupName"] = sourceSecurityGroup.SourceSecurityGroupName;
        console.log('update rule');
        console.log(rule);
        this.updateParent(rule);
    },

    rule: function(){

        var rule = {
            "IpProtocol": this.state.IpProtocol,
            "FromPort": this.state.FromPort,
            "ToPort": this.state.ToPort
        }
        if (this.mode() === "cidr"){
            rule["CidrIp"] = this.state.CidrIp;
        } else {
            rule["SourceSecurityGroupOwnerId"]= this.state.SourceSecurityGroupOwnerId;
            rule["SourceSecurityGroupName"] = this.state.SourceSecurityGroupName;
        }
        return rule;
    },

    updateParent: function(rule){
        console.log('SecurityGroupRuleForm updating parent:')
        console.log(rule);
        console.log(this.props.index);
        this.props.onRuleChange(rule, this.props.index);
    },

    deleteRule: function(){
        this.props.onRuleRemoval(this.props.index);
    },

    render: function(){
        console.log(this.mode());
        var source='';
        if(this.mode() === "cidr"){
            source=(<SecurityGroupRuleFormCidrIpAttrs CidrIp={this.state.CidrIp} onUpdate={this.updateCidrIp}/>)
        } else {
            source=<SecurityGroupRuleFormSourceSecurityGroupAttrs onUpdate={this.updateSecurityGroupRuleFormSourceSecurityGroupAttrs} SourceSecurityGroupOwnerId={this.state.SourceSecurityGroupOwnerId} SourceSecurityGroupName={this.state.SourceSecurityGroupName}/>
        }

        return(
            <div className="row clearfix">
                <div className="col-md-2 column"><input className="form-control" ref="type" /></div>
                <div className="col-md-2 column"><input type="text" value={this.state.IpProtocol} onChange={this.updateIpProtocol} className="form-control" ref="IpProtocol" /></div>
                <div className="col-md-2 column"><input type="text" value={this.portRange()} onChange={this.updatePortRange} className="form-control" ref="portRange" /></div>
                <div className="col-md-6 column">
                    <div className="row clearfix">
                        <div className="col-md-11 column">{source}</div>
                        <div className="col-md-1 column">
                            <span className="input-group-btn">
                                <button
                                    onClick={this.deleteRule}
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
