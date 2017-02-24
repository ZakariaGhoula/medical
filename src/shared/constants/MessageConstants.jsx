import keyMirror from 'keymirror';
import {APIRoot,WEBRoot} from './DefaultConstants';


// Todo constants
export const MessageConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        SEND_MESSAGE: APIRoot + "/app/message/add",
        GET_MESSAGES: APIRoot + "/app/message/group",

    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        SEND_MESSAGE_REQUEST: null,
        SEND_MESSAGE_SUCCESS: null,
        SEND_MESSAGE_FAILURE: null,
        GET_MESSAGES_REQUEST: null,
        GET_MESSAGES_SUCCESS: null,
        GET_MESSAGES_FAILURE: null,
        SOCKET_GET_MESSAGES_REQUEST: null,
        SOCKET_GET_MESSAGES_SUCCESS: null,
        SOCKET_GET_MESSAGES_FAILURE: null,

        DESTROY_LIST_MESSAGE: null,


    })
};
