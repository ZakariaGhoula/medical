import keyMirror from 'keymirror';
import {APIRoot,WEBRoot} from './DefaultConstants';


// Todo constants
export const CalendarConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        UPDATE_CALENDAR_PARAMS: APIRoot + "/app/calendar/update_calendar_params",
        GET_CALENDAR_PARAMS: APIRoot + "/app/calendar/get_calendar_params",
        ADD_DAY_OFF_CALENDAR: APIRoot + "/app/calendar/add_day_off",
        GET_DAY_OFF_CALENDAR: APIRoot + "/app/calendar/get_day_off",
        UPDATE_DAY_OFF_CALENDAR: APIRoot + "/app/calendar/update_day_off",
        DELETE_DAY_OFF_CALENDAR: APIRoot + "/app/calendar/delete_day_off",
        ADD_CALENDAR: APIRoot + "/app/calendar/create_planning",
        UPDATE_CALENDAR: APIRoot + "/app/calendar/update_planning",
        GET_CALENDAR: APIRoot + "/app/calendar/get_planning",

    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        UPDATE_CALENDAR_PARAMS_REQUEST: null,
        UPDATE_CALENDAR_PARAMS_SUCCESS: null,
        UPDATE_CALENDAR_PARAMS_FAILURE: null,
        GET_CALENDAR_PARAMS_REQUEST: null,
        GET_CALENDAR_PARAMS_SUCCESS: null,
        GET_CALENDAR_PARAMS_FAILURE: null,
        ADD_DAY_OFF_CALENDAR_REQUEST: null,
        ADD_DAY_OFF_CALENDAR_SUCCESS: null,
        ADD_DAY_OFF_CALENDAR_FAILURE: null,

        GET_DAY_OFF_CALENDAR_REQUEST: null,
        GET_DAY_OFF_CALENDAR_SUCCESS: null,
        GET_DAY_OFF_CALENDAR_FAILURE: null,

        UPDATE_DAY_OFF_CALENDAR_REQUEST: null,
        UPDATE_DAY_OFF_CALENDAR_SUCCESS: null,
        UPDATE_DAY_OFF_CALENDAR_FAILURE: null,

        DELETE_DAY_OFF_CALENDAR_REQUEST: null,
        DELETE_DAY_OFF_CALENDAR_SUCCESS: null,
        DELETE_DAY_OFF_CALENDAR_FAILURE: null,

        ADD_CALENDAR_REQUEST: null,
        ADD_CALENDAR_SUCCESS: null,
        ADD_CALENDAR_FAILURE: null,

        UPDATE_CALENDAR_REQUEST: null,
        UPDATE_CALENDAR_SUCCESS: null,
        UPDATE_CALENDAR_FAILURE: null,

        GET_CALENDAR_REQUEST: null,
        GET_CALENDAR_SUCCESS: null,
        GET_CALENDAR_FAILURE: null,


        MY_GROUP_LOGOUT: null,


    })
};
