import rootReducer from '../reducers/index';
import routes from '../routes';
import {routerStateReducer} from 'redux-router';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';
import {applyMiddleware, compose, createStore,combineReducers} from 'redux';
import multireducer from 'multireducer';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware  from 'redux-promise-middleware';
import {loadingBarMiddleware, loadingBarReducer} from 'react-redux-loading-bar'

import { default as session} from './../reducers/SessionReducer';
import { default as group} from './../reducers/GroupReducer';
import { default as calendar} from './../reducers/CalendarReducer';
import { default as message} from './../reducers/MessageReducer';
export default function configureStore(initialState) {

    let createStoreWithMiddleware;
    const logger = createLogger();
    const reducer = combineReducers({  // can be mounted as any property. Later you can use this prop to access state slices in mapStateToProps
            session,
            group,
            message,
            calendar,
            loadingBar: loadingBarReducer,
            router: routerStateReducer
        })
        ;

    const middleware = applyMiddleware(thunkMiddleware, promiseMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }), loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }), logger);

    createStoreWithMiddleware = compose(
        middleware,
        reduxReactRouter({routes, createHistory})
    );

    const store = createStoreWithMiddleware(createStore)(reducer, initialState);

    if (module.hot) {
        module.hot
            .accept('../reducers/index', () => {
                const nextRootReducer = require('../reducers/index');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;

}