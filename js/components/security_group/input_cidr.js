/** @jsx React.DOM */

var React = require('react');

var InputCIDR = React.createClass({
    getInitialState: function(){
        console.log('init InputCIDR');
        console.log(this.props.CidrIp);
        return {
            CidrIp: this.props.CidrIp,
            validationClass: ''
        }
    },

    updateCidrIp: function(){
        console.log('updating CIDRip locally');
        var CidrIp = this.refs.CidrIp.getDOMNode().value;
        console.log(CidrIp);
        this.setState({CidrIp: CidrIp});

        function isCidrValid(cidrValue){
            var cidrRegex = new RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(/([0-9]|[1-2][0-9]|3[0-2]))$");
            return cidrRegex.test(cidrValue);
        }

        function isValidObject(cidrValue){
            try {
                var cidrObject = JSON.parse(cidrValue);
                console.log(cidrObject);
                return (typeof(cidrObject) === 'object')
            } catch(err) {
                return false;
            }
        }

        console.log('isValidObject');
        console.log(isValidObject(CidrIp));

        if (CidrIp===""){
            this.setState({validationClass: 'has-warning'});
        } else  {
            if (isCidrValid(CidrIp) || isValidObject(CidrIp) ){
                this.updateParent(CidrIp);
                this.setState({validationClass: ''});
            } else {
                this.setState({validationClass: 'has-error'});
            }
        }
    },

    updateParent: function(CidrIp){
        console.log('InputCIDR calling parent:');
        console.log(CidrIp);
        this.props.onUpdate(CidrIp);
    },

    render: function(){
        return (
            <div className={this.state.validationClass}>
                <input type="text" value={this.state.CidrIp} className="form-control" onChange={this.updateCidrIp} ref="CidrIp" />
            </div>
        )
    }
});

module.exports = InputCIDR;
