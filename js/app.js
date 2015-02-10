var React = require('react');

var InboundRules = require('./components/security_group/inbound_rules');

var _rules = {
  "Type": "AWS::EC2::SecurityGroup",
  "Properties": {
    "GroupDescription": "Enable SSH access and HTTP from the load balancer only",
    "SecurityGroupIngress": [
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
    ]
  }
};

React.render(
  <InboundRules rules={_rules}/>,
  document.getElementById('app')
);
