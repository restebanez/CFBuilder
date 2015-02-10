
var Dispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/security_group');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
    for (var id in _todos) {
        update(id, updates);
    }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
    delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
}

var SecurityGroup = assign({}, EventEmitter.prototype, {


    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _todos;
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
    var text;

    switch(action.actionType) {
        case Constants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
            }
            SecurityGroup.emitChange();
            break;


        default:
        // no op
    }
});

module.exports = SecurityGroup;
