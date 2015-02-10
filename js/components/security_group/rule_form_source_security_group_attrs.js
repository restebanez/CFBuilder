/** @jsx React.DOM */

var React = require('react');
var InputJSON = require('./input_json');


var SecurityGroupRuleFormSourceSecurityGroupAttrs = React.createClass({
    getInitialState: function() {
        return {
            SourceSecurityGroupOwnerId: this.props.SourceSecurityGroupOwnerId,
            SourceSecurityGroupName: this.props.SourceSecurityGroupName
        };
    },

    sourceSecurityGroup: function(){
        return {
            "SourceSecurityGroupOwnerId": this.state.SourceSecurityGroupOwnerId,
            "SourceSecurityGroupName": this.state.SourceSecurityGroupName
        }
    },

    updateSourceSecurityGroupOwnerId: function(SourceSecurityGroupOwnerId){
        this.setState({SourceSecurityGroupOwnerId: SourceSecurityGroupOwnerId});
        var sourceSecurityGroup = this.sourceSecurityGroup();
        sourceSecurityGroup["SourceSecurityGroupOwnerId"] = SourceSecurityGroupOwnerId;
        this.updateParent(sourceSecurityGroup);
    },

    updateSourceSecurityGroupName: function(SourceSecurityGroupName){
        this.setState({SourceSecurityGroupName: SourceSecurityGroupName});
        var sourceSecurityGroup = this.sourceSecurityGroup();
        sourceSecurityGroup["SourceSecurityGroupName"] = SourceSecurityGroupName;
        this.updateParent(sourceSecurityGroup);
    },

    updateParent: function(sourceSecurityGroup){
        console.log('SecurityGroupRuleFormSourceSecurityGroupAttrs calling parent');
        console.log(sourceSecurityGroup);
        this.props.onUpdate(sourceSecurityGroup);
    },

    render: function(){
        return(
            <div className="row">
                <div className="col-md-6 column">
                    <InputJSON onUpdate={this.updateSourceSecurityGroupOwnerId} jsonValue={this.props.SourceSecurityGroupOwnerId}/>
                </div>
                <div className="col-md-6 column">
                    <InputJSON onUpdate={this.updateSourceSecurityGroupName} jsonValue={this.props.SourceSecurityGroupName}/>
                </div>
            </div>
        )
    }
});

module.exports = SecurityGroupRuleFormSourceSecurityGroupAttrs;
