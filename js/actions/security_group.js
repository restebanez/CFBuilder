var Dispatcher = require('../dispatcher/app_dispatcher');
var Constants = require('../constants/security_group');

var SecurityGroupActions = {

    /**
     * @param  {string} text
     */

    newCIDRRule: function(item) {
        Dispatcher.dispatch({
            actionType: Constants.NEW_CIDR_RULE
        });
    },
    create: function(item) {
        Dispatcher.dispatch({
            actionType: Constants.CREATE,
            item: item
        });
    },

    update: function(id, item) {
        Dispatcher.dispatch({
            actionType: Constants.UPDATE,
            item: item,
            id: id
        });
    },

    destroy: function(id) {
        Dispatcher.dispatch({
            actionType: Constants.DESTROY,
            id: id
        });
    }

};

module.exports = SecurityGroupActions;
