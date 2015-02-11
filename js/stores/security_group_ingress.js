
var Dispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/security_group');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _rule_header = {
    "Type": "AWS::EC2::SecurityGroup",
    "Properties": {
        "GroupDescription": "Enable SSH access and HTTP from the load balancer only",
        "SecurityGroupIngress": ""
    }
};

var _securityGroupIngress = [
    {
        "IpProtocol": "tcp",
        "FromPort": "22",
        "ToPort": "22",
        "CidrIp": {
            "Ref": "SSHLocation"
        }
    },
    {
        "IpProtocol": "tcp",
        "FromPort": "80",
        "ToPort": "80",
        "SourceSecurityGroupOwnerId": {
            "Fn::GetAtt": [
                "ElasticLoadBalancer",
                "SourceSecurityGroup.OwnerAlias"
            ]
        },
        "SourceSecurityGroupName": {
            "Fn::GetAtt": [
                "ElasticLoadBalancer",
                "SourceSecurityGroup.GroupName"
            ]
        }
    }
];

function generateRule(){
    var fullRule = assign({}, _rule_header);
    fullRule.Properties.SecurityGroupIngress =  _securityGroupIngress;
    return fullRule;
}


function create(item){
    _securityGroupIngress.push(item);
}

function update(id, item){
    console.log('update store');
    console.log(id);
    _securityGroupIngress[id] = item;
}

function destroy(id){
    _securityGroupIngress.splice(id, 1);
}

var SecurityGroupIngress = assign({}, EventEmitter.prototype, {


    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _securityGroupIngress;
    },

    display: function(){
       return generateRule();
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
Dispatcher.register(function(action) {

    switch(action.actionType) {

        case Constants.CREATE:
            create(action.item);
            SecurityGroupIngress.emitChange();
            break;

        case Constants.UPDATE:
            update(action.id, action.item);
            SecurityGroupIngress.emitChange();
            break;

        case Constants.DESTROY:
            destroy(action.id);
            SecurityGroupIngress.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = SecurityGroupIngress;
