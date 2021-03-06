import keyMirror from 'keymirror';
import {APIRoot} from './DefaultConstants';

// Todo constants
export const LocaliseConstants = {

    APIEndpoints: {
        DATA_LANG: APIRoot + "/textzones",

    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({

        // Routes
        REDIRECT: null,
        //USER
        DATA_LANG_REQUEST: null,
        DATA_LANG_SUCCESS: null,
        DATA_LANG_FAILURE: null,
        DATA_LANG: null,
        DATA_LANG_MENU_BAR: null,
        DATA_LANG_FOOTER: null,
        SWITCH_LANG: null,
        SWITCH_PAGE: null,
        LOG_ADMIN: null,
        DATA_CHANGE_REQUEST: null,
        DATA_CHANGE_SUCCESS: null,
        DATA_CHANGE_FAILURE: null,

    })
};
