/** @jsx React.DOM */

var React = require('react');

var InboundRules = require('./components/security_group/inbound_rules');



React.render(
  <InboundRules />,
  document.getElementById('app')
);

