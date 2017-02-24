import keyMirror from 'keymirror';
import {MONGORoot} from './DefaultConstants';

// Todo constants
export const PageConstants = {

    APIEndpoints: {
        PAGE_LANG: MONGORoot + "/page",

    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({

        // Routes
        REDIRECT: null,
        //USER
        PAGE_LANG_REQUEST: null,
        PAGE_LANG_SUCCESS: null,
        PAGE_LANG_FAILURE: null,
        PAGE_LANG_DESTROY: null,

        MENU_LANG_REQUEST: null,
        MENU_LANG_SUCCESS: null,
        MENU_LANG_FAILURE: null,
        MENU_LANG_DESTROY: null,

        FOOTER_LANG_REQUEST: null,
        FOOTER_LANG_SUCCESS: null,
        FOOTER_LANG_FAILURE: null,
        FOOTER_LANG_DESTROY: null,

    })
};
