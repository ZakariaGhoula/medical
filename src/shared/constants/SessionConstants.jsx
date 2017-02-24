import keyMirror from 'keymirror';
import {APIRoot,WEBRoot} from './DefaultConstants';


// Todo constants
export const SessionConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        COMMENTS: APIRoot + "/v1/comments",
        LOGIN: APIRoot + "/app/signin",
        UPDATE_USER: APIRoot + "/app/update_user",
        LOGIN_TOKEN: APIRoot + "/app/signin_token",
        LOGOUT: APIRoot + "/v1/logout",
        SIGN_UP: APIRoot + "/v1/registrations",
        AUTH_FACEBOOK: APIRoot + "/users/facebook.json",
        APP_PATH_IMAGES: WEBRoot + "/public/images"
    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        LOGIN_USER_REQUEST: null,
        LOGIN_USER_RESPONSE: null,

        LOGIN_USER_FAILURE: null,
        LOGIN_USER_SUCCESS: null,

        LOGOUT_USER: null,

        UPDATE_USER_REQUEST: null,
        UPDATE_USER_SUCCESS: null,
        UPDATE_USER_FAILURE: null,


        SIGNUP_USER_REQUEST: null,
        SIGNUP_USER_RESPONSE: null,
        SIGNUP_USER_FAILURE: null,
        SIGNUP_USER_SUCCESS: null,


        LOGOUT_USER_REQUEST: null,
        LOGOUT_USER_SUCCESS: null,
        LOGOUT_USER_FAILURE: null,

        LOGIN_FB_USER_SUCCESS: null,
        LOGIN_TOKEN_SUCCESS: null,
        // Routes
        REDIRECT: null,

        LOAD_COMMENTS: null,
        RECEIVE_COMMENTS: null,
        LOAD_COMMENT: null,
        RECEIVE_COMMENT: null,
        CREATE_COMMENT: null,
        RECEIVE_CREATED_COMMENT: null,

        DEFINE_LANG_DEFAULT_BROWSER: null


    })
};
