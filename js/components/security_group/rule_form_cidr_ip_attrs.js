/** @jsx React.DOM */

var React = require('react');
var InputJSON = require('./input_json');
var InputCIDR = require('./input_cidr');

// input:
//  Cidr: Object | string
// output:
//  onUpdate: Object | string
var SecurityGroupRuleFormCidrIpAttrs = React.createClass({
    getInitialState: function(){
        console.log('init SecurityGroupRuleFormCidrIpAttrs');
        console.log(this.props.CidrIp)
        return {
            CidrIp: this.props.CidrIp
        }
    },
    updateFromChild: function(CidrIp){
        this.setState({CidrIp: CidrIp});
        this.updateParent(CidrIp);
    },
    updateParent: function(CidrIp){
        console.log('SecurityGroupRuleFormCidrIpAttrs calling parent:');
        console.log(CidrIp);
        this.props.onUpdate(CidrIp);
    },

    render: function(){
        if (JSON.stringify(this.state.CidrIp).indexOf('{') >= 0){
            console.log('using InputJSON');
            return <InputJSON jsonValue={this.state.CidrIp} onUpdate={this.updateFromChild}/>
        } else {
            console.log('using InputCIDR');
            return <InputCIDR CidrIp={this.state.CidrIp} onUpdate={this.updateFromChild}/>
        }
    }
});


module.exports = SecurityGroupRuleFormCidrIpAttrs;
