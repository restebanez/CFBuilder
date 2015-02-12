/** @jsx React.DOM */

var React = require('react');
var Formsy = require('formsy-react');


var InputWithMsg = React.createClass({
    getInitialState: function(){
        return {
            focus: false
        }
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function (event) {
        this.setValue(event.currentTarget.value);
    },

    _setFocus: function(){
        this.setState({focus: true})
    },
    _setBlur: function(){
        this.setState({focus: false})
    },
    render: function () {

        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid
        var validationClassName = this.showRequired() ? 'has-warning' : this.showError() ? 'has-error ' : 'has-success';

        // An error message is returned ONLY if the component is invalid
        var errorMessage = this.getErrorMessage();
        var glyphiconIconClass = this.showRequired() ? 'glyphicon-warning-sign' : this.showError() ? 'glyphicon-remove ' : 'glyphicon-ok';
        var iconValidation = this.state.focus ? <span className={'form-control-feedback glyphicon ' + glyphiconIconClass} aria-hidden="true"></span> : '';
        return (

            <div className={'form-group ' + validationClassName + ' has-feedback' } >
                <input className="form-control" onFocus={this._setFocus} onBlur={this._setBlur} type="text" onChange={this.changeValue} value={this.getValue()} aria-describedby="inputError2Status"/>
               {iconValidation}
                <span id="inputError2Status">{errorMessage}</span>
            </div>

        );
    }
});

module.exports = InputWithMsg;
