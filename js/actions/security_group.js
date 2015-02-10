var Dispatcher = require('../dispatcher/app_dispatcher');
var Constants = require('../constants/security_group');

var SecurityGroupActions = {

    /**
     * @param  {string} text
     */
    create: function(text) {
        Dispatcher.dispatch({
            actionType: Constants.TODO_CREATE,
            text: text
        });
    }

};

module.exports = SecurityGroupActions;
