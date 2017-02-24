import { checkHttpStatus, parseJSON,parseJSON2 } from '../utils/util';
import { SessionConstants } from '../constants/SessionConstants';
import { pushState,replaceState } from 'redux-router';
import ReactRouter from 'react-router';
import localStorage from 'localStorage';
var history = ReactRouter.history;
import fetch from 'isomorphic-fetch';
import {UAParser} from 'ua-parser-js';

export function loginUser(email, password, redirect = "/") {

    const p = login(email, password, redirect);

    return {
        type: "LOGIN_USER",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        },
        redirect: redirect
    }
}
export function login(email, password, redirect = "/") {

    var data = {
        email: email,
        password: password,
        grant_type: 'password'
    };
    //--- informer le reducer que nous sommes en cours de login
    return fetch(SessionConstants.APIEndpoints.LOGIN, {
        method: 'POST',
        body: JSON.stringify({email: email, password: password}),//'email='+email+'&password='+password,
        headers: {
            'Content-Type': 'application/json',
        },

    })
        .then(parseJSON)
        .then(response => {
            if (typeof response.error !== "undefined") {
                throw response.error;
            }
            else {
                return response
            }

        })
}
export function loginUserToken(token, redirect = "/") {

    const p = loginToken(token);

    return {
        type: "LOGIN_USER",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        },
        redirect: redirect
    }
}
export function loginToken(token) {

    return fetch(SessionConstants.APIEndpoints.LOGIN_TOKEN, {
        method: 'post',
        body: JSON.stringify({token: token}),//'email='+email+'&password='+password,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(parseJSON)
        .then(response => {
            if (typeof response.error !== "undefined") {
                throw response.error;
            }
            else {
                return response
            }

        });
}

export function logout() {


    return {
        type: "LOGOUT_USER"
    }
}


export function updateMyAccount(data) {

    const p = updateMyAccountAjax(data)
    return {
        type: "UPDATE_USER",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function updateMyAccountAjax(data){
    return fetch(SessionConstants.APIEndpoints.UPDATE_USER, {
        method: 'post',
        body: JSON.stringify(data),//'email='+email+'&password='+password,
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(parseJSON)
        .then(response => {
            if (typeof response.error !== "undefined") {
                throw response.error;
            }
            else {
                return response
            }

        });
}
/*
 export function logoutAjaxUser(token) {
 return fetch(SessionConstants.APIEndpoints.LOGOUT, {
 method: 'post',
 credentials: 'include',
 headers: {
 'Accept': 'application/json',
 'Content-Type': 'application/json',
 'Authorization': 'Token token="' + token + '"'
 }
 })
 .then(parseJSON)
 .then(response => {
 if (response.status == "success") {
 return {"logout": true}
 } else {
 return {"logout": false}
 }
 });
 }

 export function logout(token) {
 const p = logoutAjaxUser(token);
 localStorage.removeItem('token');
 localStorage.removeItem('lang_site');

 return {
 type: [SessionConstants.ActionTypes.LOGOUT_USER_REQUEST, SessionConstants.ActionTypes.LOGOUT_USER_SUCCESS, SessionConstants.ActionTypes.LOGOUT_USER_FAILURE],
 promise: p
 }
 }
 export function logoutAndRedirect() {
 localStorage.removeItem('token');
 localStorage.removeItem('lang_site');
 return {
 type: SessionConstants.ActionTypes.LOGOUT_USER_SUCCESS
 }
 }


 export function loginWithToken(token) {
 localStorage.setItem('token', token);

 return {
 type: SessionConstants.ActionTypes.LOGIN_TOKEN_SUCCESS,
 access_token: token,

 }
 }


 export function loginFbUserSuccess(token) {
 localStorage.setItem('token', token);
 return {
 type: SessionConstants.ActionTypes.LOGIN_FB_USER_SUCCESS,
 access_token: token,
 redirect: '/dashboard'

 }
 }
 export function defineBrowserLang(lang) {
 return {
 type: SessionConstants.ActionTypes.DEFINE_LANG_DEFAULT_BROWSER,
 lang: lang,

 }
 }
 */