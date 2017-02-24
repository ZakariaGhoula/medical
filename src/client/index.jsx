import React       from 'react';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes      from '../shared/routes';
//import {switchLang} from './../shared/actions/LocaliseActions';
import { Provider }                     from 'react-redux';
import {ReduxRouter} from 'redux-router';
import {WEBRoot} from './../shared/constants/DefaultConstants';
import { fromJS }                       from 'immutable';
import configureStore from './../shared/store/configureStore';
const history = createBrowserHistory();
let initialState = window.__INITIAL_STATE__;
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import io from 'socket.io-client';
const socket = io(WEBRoot);


import {loginUserToken} from './../shared/actions/SessionActions';
import {getSocketMessages} from './../shared/actions/MessageActions';
// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object
    .keys(initialState)
    .forEach(key => {
        initialState[key] = fromJS(initialState[key]);

    });
const store = configureStore(initialState);


//-- token
let token = localStorage.getItem('token');

if (token !== null && token !== "undefined") {
    localStorage.setItem('token', token);

    store.dispatch(loginUserToken(token));
}

//--socket
socket.on('message', function (message) {

    let token = localStorage.getItem('token');
    if (token !== null && message.groupId !== null) {
        store.dispatch(getSocketMessages(message.groupId));
    }

});


render(
    <Provider store={store}>
        <ReduxRouter>
            {routes}
        </ReduxRouter>
    </Provider>,
    document.getElementById('react-view')
);
