import {createReducer} from '../utils/util';
import { SessionConstants } from '../constants/SessionConstants';
import {pushState} from 'redux-router';


const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    isRegistrating: false,
    redirect: '/',
    lang: 'fr'
};


// Login
function LOGIN_USER_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isAuthenticating': true,
        'statusText': null,
        token: null,
        user: null,
    });
}
function LOGIN_USER_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.payload.token,
        'user': action.payload,
        'statusText': null,
        'redirect': (action.redirect != null) ? action.redirect : '/'
    });
}
function LOGIN_USER_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'user': null,
        'statusText': action.payload
    });


}
// login fb
function LOGIN_FB_USER_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.access_token,
        'user_id': null,
        'statusText': 'You have been successfully logged in.'
    });
}

function LOGIN_TOKEN_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.access_token,
        'user_id': null,
        'statusText': 'Vous avez été correctement connecté.'
    });
}
// Logout


function LOGOUT_USER(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        token: null,
        user: null,
        isAuthenticated: false,
        isAuthenticating: false,
        statusText: null,
        isRegistrating: false,
        redirect: '/',
    });

}


//
function UPDATE_USER_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {});
}
function UPDATE_USER_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.payload.token,
        'user': action.payload,
        'statusText': null,

    });
}
function UPDATE_USER_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {

        'statusText': action.payload
    });


}


function LOGOUT_USER_REQUEST(state, action) {
    return state;
}
function LOGOUT_USER_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'user_id': null,
        'statusText': 'Vous avez été correctement déconnecté.'
    });
}
function LOGOUT_USER_FAILURE(state, action) {
    return state;
}

// sign up
function SIGNUP_USER_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRegistrating': true,
        'statusText': null
    });
}
function SIGNUP_USER_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isRegistrating': false,
        'isAuthenticated': true,
        'token': action.result.data.user.access_token,
        'user_id': action.result.data.user.user_id,
        'statusText': 'Signup OK'
    });
}

function SIGNUP_USER_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');

    return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'isRegistrating': false,
        'token': null,
        'statusText': action.error
    });
}

function DEFINE_LANG_DEFAULT_BROWSER(state, action) {
    Object.assign = Object.assign || require('object-assign');

    return Object.assign({}, state, {
        'lang': action.lang,

    });
}
const handlers =
{

    [SessionConstants.ActionTypes.LOGIN_USER_REQUEST]: LOGIN_USER_REQUEST,
    [SessionConstants.ActionTypes.LOGIN_USER_SUCCESS]: LOGIN_USER_SUCCESS,
    [SessionConstants.ActionTypes.LOGIN_USER_FAILURE]: LOGIN_USER_FAILURE,
    [SessionConstants.ActionTypes.LOGOUT_USER]: LOGOUT_USER,
    [SessionConstants.ActionTypes.UPDATE_USER_REQUEST]: UPDATE_USER_REQUEST,
    [SessionConstants.ActionTypes.UPDATE_USER_SUCCESS]: UPDATE_USER_SUCCESS,
    [SessionConstants.ActionTypes.UPDATE_USER_FAILURE]: UPDATE_USER_FAILURE,
    [SessionConstants.ActionTypes.LOGIN_FB_USER_SUCCESS]: LOGIN_FB_USER_SUCCESS,
    [SessionConstants.ActionTypes.LOGOUT_USER_REQUEST]: LOGOUT_USER_REQUEST,
    [SessionConstants.ActionTypes.LOGOUT_USER_SUCCESS]: LOGOUT_USER_SUCCESS,
    [SessionConstants.ActionTypes.LOGOUT_USER_FAILURE]: LOGOUT_USER_FAILURE,
    [SessionConstants.ActionTypes.SIGNUP_USER_REQUEST]: SIGNUP_USER_REQUEST,
    [SessionConstants.ActionTypes.SIGNUP_USER_SUCCESS]: SIGNUP_USER_SUCCESS,
    [SessionConstants.ActionTypes.SIGNUP_USER_FAILURE]: SIGNUP_USER_FAILURE,
    [SessionConstants.ActionTypes.LOGIN_TOKEN_SUCCESS]: LOGIN_TOKEN_SUCCESS,
    [SessionConstants.ActionTypes.DEFINE_LANG_DEFAULT_BROWSER]: DEFINE_LANG_DEFAULT_BROWSER,


}
export default createReducer(initialState, handlers);

