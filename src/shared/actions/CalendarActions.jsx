import { checkHttpStatus, parseJSON,parseJSON2 } from '../utils/util';
import { CalendarConstants } from '../constants/CalendarConstants';
import { pushState,replaceState } from 'redux-router';
import ReactRouter from 'react-router';
import localStorage from 'localStorage';
var history = ReactRouter.history;
import fetch from 'isomorphic-fetch';
import {UAParser} from 'ua-parser-js';


export function updateCalendarParams(data) {

    const p = updateCalendarParamsAjax(data)
    return {
        type: "UPDATE_CALENDAR_PARAMS",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function updateCalendarParamsAjax(data) {
    console.log(data);
    return fetch(CalendarConstants.APIEndpoints.UPDATE_CALENDAR_PARAMS, {
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
export function getCalendarParams(data) {

    const p = getCalendarParamsAjax(data)
    return {
        type: "GET_CALENDAR_PARAMS",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function getCalendarParamsAjax(data) {

    return fetch(CalendarConstants.APIEndpoints.GET_CALENDAR_PARAMS + "/" + data, {
        method: 'get',
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
export function addCalendarDayOff(data) {

    const p = addCalendarDayOffAjax(data)
    return {
        type: "ADD_DAY_OFF_CALENDAR",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function addCalendarDayOffAjax(data) {

    return fetch(CalendarConstants.APIEndpoints.ADD_DAY_OFF_CALENDAR, {
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
                return {'reponse': response}
            }

        });
}

export function updateCalendarDayOff(data) {

    const p = updateCalendarDayOffAjax(data)
    return {
        type: "UPDATE_DAY_OFF_CALENDAR",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function updateCalendarDayOffAjax(data) {

    return fetch(CalendarConstants.APIEndpoints.UPDATE_DAY_OFF_CALENDAR, {
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
                return {'reponse': response}
            }

        });
}export function deleteCalendarDayOff(data) {

    const p = deleteCalendarDayOffAjax(data)
    return {
        type: "DELETE_DAY_OFF_CALENDAR",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function deleteCalendarDayOffAjax(data) {

    return fetch(CalendarConstants.APIEndpoints.DELETE_DAY_OFF_CALENDAR, {
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
                return {'reponse': response}
            }

        });
}
export function getCalendarDayOff(data) {

    const p = getCalendarDayOffAjax(data)
    return {
        type: "GET_DAY_OFF_CALENDAR",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function getCalendarDayOffAjax(data) {

    return fetch(CalendarConstants.APIEndpoints.GET_DAY_OFF_CALENDAR+"/"+data, {
        method: 'get',

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
export function createCalendar(data) {

    const p = createCalendarAjax(data)
    return {
        type: "ADD_CALENDAR",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function createCalendarAjax(data) {
    return fetch(CalendarConstants.APIEndpoints.ADD_CALENDAR, {
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
                return {'reponse': response}
            }

        });
}export function getOneCalendar(id_cal,id_group) {

    const p = getOneCalendarAjax(id_cal,id_group)
    return {
        type: "GET_CALENDAR",
        payload: p,
        meta: {
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}

export function getOneCalendarAjax(id_cal,id_group) {
    return fetch(CalendarConstants.APIEndpoints.GET_CALENDAR+"/"+id_cal+"/"+id_group, {
        method: 'get',

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