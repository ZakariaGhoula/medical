import express                   from 'express';
import React                     from 'react';
import { renderToString }        from '../../node_modules/react-dom/server'
import { RoutingContext, match } from 'react-router';
import createLocation            from '../../node_modules/history/lib/createLocation';
import routes                    from './../shared/routes';
import { createStore,compose, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware  from 'redux-promise-middleware';

import createHistory from 'history/lib/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';
import {responsiveStateReducer,responsiveStoreEnhancer,createResponsiveStateReducer} from 'redux-responsive';
import {loadingBarMiddleware, loadingBarReducer} from 'react-redux-loading-bar'
import {default as home} from '../../src/shared/reducers/HomeReducer';
import {default as menubar} from '../../src/shared/reducers/MenubarReducer';
import {default as localise} from '../../src/shared/reducers/LocaliseReducer';
import { } from 'react-redux-loading-bar'
import { Provider }                     from 'react-redux';
import * as reducers                    from '../shared/reducers';
import {routerStateReducer,reduxReactRouter} from 'redux-router';
import bodyParser from 'body-parser';
var ReactDOM = require('react-dom/server');
const app = express();

import fetchComponentData from '../shared/lib/fetchComponentData';
import Helmet from "react-helmet";
app.use(express.static('public'));
import {StyleRoot} from 'radium'

//app.use(require('prerender-node'));
//var access_token = "";
//const finalCreateStore = applyMiddleware(promiseMiddleware)(createStore);
var ConfiguredRadium = require('./configured-radium');
var matchMediaMock = require('match-media-mock').create();
ConfiguredRadium.setMatchMedia(matchMediaMock);

app.get('/app/:width/:height', function (req, res) {
    matchMediaMock.setConfig({
        type: 'screen',
        width: req.params.width,
        height: req.params.height,
    });

    // Your application code uses `@ConfiguredRadium` instead of `@Radium`
    var html = React.renderToString(<RadiumApp />);

    res.end(html);
});
   // const reducer = combineReducers({home: reducers.home, router: routerStateReducer});
    //const store = finalCreateStore(reducer);
    const new_initialState = {}
    const new_reducer = combineReducers({  // can be mounted as any property. Later you can use this prop to access state slices in mapStateToProps
        home,
        menubar,
        localise,
        loadingBar: loadingBarReducer,
        browser: createResponsiveStateReducer({
            extraSmall: 380,
            small: 767,
            medium: 1023,
            large: 1440,
            extraLarge: 1921,
            bigger: 4000,
        }),
        router: routerStateReducer
    })
    const new_middleware = applyMiddleware(thunkMiddleware, promiseMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }), loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    }));
    let createStoreWithMiddleware;
    createStoreWithMiddleware = compose(
        new_middleware,
        responsiveStoreEnhancer
    );

    ;
// Note our thunk middleware for async actions
    const new_store = createStoreWithMiddleware(createStore)(new_reducer, new_initialState);
     
app.use((req, res) => {

    const location = createLocation(req.url);




    match({routes, location}, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }
        if (!renderProps) return res.status(404).end('Not found.');
function renderView() {

        const InitialComponent = (
             <Provider  store={new_store}>
                    <StyleRoot radiumConfig={{userAgent: req.headers['user-agent']}}>
                    <RoutingContext {...renderProps} />
                        </StyleRoot>
                </Provider>
        );
        const new_state = new_store.getState()


        //  const initialState = store.getState();

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

 <meta property="og:title" content="Zetagamma" data-react-helmet="true"/>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(new_state)};
        </script>
      </head>
      <body style={{padding:0;margin:0}}>
        <div id="react-view">${componentHTML}</div>
<script type="application/javascript" src="/bundle.js"></script>
      </body>
  </html>
`;
         

                ;

            return HTML;
        }

        fetchComponentData(new_store.dispatch, renderProps.components, renderProps.params)
            .then(renderView)
            .then(html => res.end(html))
            .catch(err => res.end(err.message));

    });


});



        //const new_store = createStore(reducers, initialState, applyMiddleware(thunkMiddleware))
       // const { location, params, history } = renderProps;
/*

        const InitialComponent = (
            <Provider radiumConfig={{userAgent: req.headers['user-agent']}} store={new_store}>
                <RoutingContext {...renderProps} />
            </Provider>
        );
        const new_state = new_store.getState()


        //  const initialState = store.getState();

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

 <meta property="og:title" content="Zetagamma" data-react-helmet="true"/>
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(new_state)};
        </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
<script type="application/javascript" src="/bundle.js"></script>
      </body>
  </html>
`
        res.type('html');
        res.send(HTML);
        //  res.end();
    });
});*/

export default app;