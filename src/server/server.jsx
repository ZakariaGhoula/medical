import express                   from 'express';
import React                     from 'react';
import { renderToString }        from '../../node_modules/react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from '../../node_modules/history/lib/createLocation';
import routes                    from './../shared/routes';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware  from 'redux-promise-middleware';
import createHistory from 'history/lib/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import {loadingBarMiddleware, loadingBarReducer, showLoading, hideLoading} from 'react-redux-loading-bar'
import { Provider }                     from 'react-redux';
import {routerStateReducer,reduxReactRouter} from 'redux-router';

import expresssession from 'express-session';
import localStorage from 'localStorage';

import { default as session} from './../shared/reducers/SessionReducer';
import { default as group} from './../shared/reducers/GroupReducer';
import { default as message} from './../shared/reducers/MessageReducer';
import { default as calendar} from './../shared/reducers/CalendarReducer';
import passport from 'passport';

var ReactDOM = require('react-dom/server');
const app = express();

import fetchComponentData from '../shared/lib/fetchComponentData';
import Helmet from "react-helmet";
app.use(express.static('public'));

//---- api
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';

var config = require('./config/config'); // get our config file
var User = require('./models/User'); //

mongoose.connect(config.database); // connect to database
//app.set('superSecret', config.secret);
mongoose.set('debug', true);


// use morgan to log requests to the console
app.use(morgan('dev'));
import  cors from 'cors';
// use it before all route definitions
//app.use(cors({origin: 'http://localhost:8080'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(passport.initialize());
app.use(passport.session());
const UserRouter = express.Router();
require('./routes/user')(UserRouter);
app.use('/app', UserRouter);

const messageRouter = express.Router();
require('./routes/message_routes')(messageRouter);
app.use('/app', messageRouter);

const GroupRouter = express.Router();
require('./routes/group_routes')(GroupRouter);
app.use('/app', GroupRouter);

const CalendarRouter = express.Router();
require('./routes/calendar_routes')(CalendarRouter);
app.use('/app', CalendarRouter);

//----- universal
app.use((req, res) => {

    const location = createLocation(req.url);

    const reducer = combineReducers({  // can be mounted as any property. Later you can use this prop to access state slices in mapStateToProps
        session,
        group,
        calendar,
        message,
        loadingBar: loadingBarReducer,
        router: routerStateReducer
    })
    const store = applyMiddleware(thunkMiddleware, promiseMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }), loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }))(createStore)(reducer);


    match({routes, location}, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }
        if (!renderProps) return res.status(404).end('Not found.');
        function renderView() {

            const InitialComponent = (
                <Provider store={store}>
                    <RoutingContext {...renderProps} />
                </Provider>
            );
            const state = store.getState();


            const componentHTML = ReactDOM.renderToString(InitialComponent);

            let head = Helmet.rewind();
            // Make sure they are all HTML
            head.title = `${head.title}`;
            const HTML = `
    <!DOCTYPE html>
      <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
            ${head.title.toString()}
            ${head.meta.toString()}
            ${head.link.toString()}
<link rel="stylesheet" href="/css/zetagamma.css"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700"/>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(state)};
        </script>
      </head>
      <body >
        <div id="react-view">${componentHTML}</div>
<script type="application/javascript" src="/bundle.js"></script>
<script type="application/javascript" src="/js/zetagamma.js"></script>
      </body>
  </html>
`;
            return HTML;
        }


        fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
            .then(renderView)
            .then(html => res.end(html))
            .catch(err => res.end(err.message));

    });


});


export default app;