import { checkHttpStatus, parseJSON,parseJSON2 } from '../utils/util';
import { MessageConstants } from '../constants/MessageConstants';
import { pushState,replaceState } from 'redux-router';
import ReactRouter from 'react-router';
import localStorage from 'localStorage';
var history = ReactRouter.history;
import fetch from 'isomorphic-fetch';
import {UAParser} from 'ua-parser-js';

export function getMyGroup(userId) {

    const p = getAjaxMyGroup(userId);

    return {
        type: "MY_GROUP",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        },
        userId: userId
    }
}
export function getAjaxMyGroup(userId) {


    //--- informer le reducer que nous sommes en cours de login
    return fetch(GroupConstants.APIEndpoints.MY_GROUP + "/" + userId, {
        method: 'GET',
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
                return {'reponse': response, "userId": userId}
            }

        })
}





//-- logout
export function destroyMyGroup() {
    return {
        type: "MY_GROUP_LOGOUT"
    }
}
//-- destroy pwd group
export function destroyPwdGroup() {
    return {
        type: "DESTROY_PASSWORD_GROUP"
    }
}


export function sendMessage(data) {

    const p = sendMessageAjax(data)
    return {
        type: "SEND_MESSAGE",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function sendMessageAjax(data) {
    return fetch(MessageConstants.APIEndpoints.SEND_MESSAGE, {
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
                return {'reponse': response, "userId": data.userId}
            }

        });
}
export function getMessages(groupId) {

    const p = getMessagesAjax(groupId)
    return {
        type: "GET_MESSAGES",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}export function getSocketMessages(groupId) {

    const p = getMessagesAjax(groupId)
    return {
        type: "SOCKET_GET_MESSAGES",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function getMessagesAjax(groupId) {
    return fetch(MessageConstants.APIEndpoints.GET_MESSAGES + "/" + groupId, {
        method: 'GET',
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
                return {'reponse': response}
            }

        });
}


//--- retrieve pwd group
export function retrievePwdGroup(data) {

    const p = retrievePwdGroupAjax(data)
    return {
        type: "GET_PASSWORD_GROUP",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function retrievePwdGroupAjax(data) {
    return fetch(GroupConstants.APIEndpoints.GET_PASSWORD_GROUP, {
        method: 'post',
        body: JSON.stringify(data),
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
                return {'reponse': response, "userId": data.userId}
            }

        });
}

//--- retrieve pwd group
export function updatePwdGroup(data) {

    const p = updatePwdGroupAjax(data)
    return {
        type: "UPDATE_PASSWORD_GROUP",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function updatePwdGroupAjax(data) {
    return fetch(GroupConstants.APIEndpoints.UPDATE_PASSWORD_GROUP, {
        method: 'post',
        body: JSON.stringify(data),
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
                return {'reponse': response, "userId": data.userId}
            }

        });
}//--- retrieve pwd group
export function addUserGroup(data) {

    const p = addUserGroupAjax(data)
    return {
        type: "ADD_USER_GROUP",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function addUserGroupAjax(data) {
    return fetch(GroupConstants.APIEndpoints.ADD_USER_GROUP, {
        method: 'post',
        body: JSON.stringify(data),
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
                return {'reponse': response, "userId": data.userId}
            }


        });
}


export function updateUserGroup(data) {

    const p = updateUserGroupAjax(data)
    return {
        type: "UPDATE_USER_GROUP",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function updateUserGroupAjax(data) {
    return fetch(GroupConstants.APIEndpoints.UPDATE_USER_GROUP, {
        method: 'post',
        body: JSON.stringify(data),
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
                return {'reponse': response, "userId": data.userAdminId}
            }
        });
}