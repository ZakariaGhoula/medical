'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('../shared/routes.jsx');

var _routes2 = _interopRequireDefault(_routes);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('reducers');

var reducers = _interopRequireWildcard(_reducers);

var _immutable = require('immutable');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();
var initialState = window.__INITIAL_STATE__;

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object.keys(initialState).forEach(function (key) {
    initialState[key] = (0, _immutable.fromJS)(initialState[key]);
});
var reducer = (0, _redux.combineReducers)(reducers);
var store = (0, _redux.createStore)(reducer, initialState);

(0, _reactDom.render)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_reactRouter.Router, { children: _routes2.default, history: history })
), document.getElementById('react-view'));
