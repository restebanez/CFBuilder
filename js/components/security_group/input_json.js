/** @jsx React.DOM */

var React = require('react');

// input:
//   jsonValue: String|Object
// output:
//  onUpdate: Object (Only triggers the update if the object is valid)
var InputJSON = React.createClass({
    getInitialState: function() {
        var jsonValueTxt = '';
        if(typeof this.props.jsonValue === 'object') {
            jsonValueTxt = JSON.stringify(this.props.jsonValue);
        } else {
            jsonValueTxt = this.props.jsonValue;
        };

        return {
            jsonValue: jsonValueTxt,
            validationClass: ''
        };
    },
    updateInputJson: function(){
        this.setState({jsonValue: this.refs.inputJson.getDOMNode().value}); // updates local component
        // propagates changes to parent
        try {
            var newObject= JSON.parse(this.refs.inputJson.getDOMNode().value);
            this.updateParent(newObject);

            this.setState({validationClass: ''});
        } catch(err) {
            this.setState({validationClass: 'has-error'});
        }

    },
    updateParent: function(newObject){
        console.log('InputJSON calling parent:');
        console.log(newObject);
        this.props.onUpdate(newObject);
    },

    render: function(){
        return(
            <div className={this.state.validationClass}>
                <input type="text" value={this.state.jsonValue} className="form-control" onChange={this.updateInputJson} ref="inputJson" />
            </div>
        )
    }
});

module.exports = InputJSON;
