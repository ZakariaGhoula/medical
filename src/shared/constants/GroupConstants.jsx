import keyMirror from 'keymirror';
import {APIRoot,WEBRoot} from './DefaultConstants';


// Todo constants
export const GroupConstants = {
    LIST_ITEM: 'LIST_ITEM',
    ADD_ITEM: 'ADD_ITEM',

    APIEndpoints: {
        MY_GROUP: APIRoot + "/app/group/user",
        UPDATE_GROUP: APIRoot + "/app/update_group",
       GET_PASSWORD_GROUP: APIRoot + "/app/password/get",
       UPDATE_PASSWORD_GROUP: APIRoot + "/app/password/update",
       ADD_USER_GROUP: APIRoot + "/app/group/addUser",
       UPDATE_USER_GROUP: APIRoot + "/app/group/updateUser",
    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        MY_GROUP_REQUEST: null,
        MY_GROUP_SUCCESS: null,
        MY_GROUP_FAILURE: null,
        UPDATE_GROUP_REQUEST: null,
        UPDATE_GROUP_SUCCESS: null,
        UPDATE_GROUP_FAILURE: null,

        GET_PASSWORD_GROUP_REQUEST: null,
        GET_PASSWORD_GROUP_SUCCESS: null,
        GET_PASSWORD_GROUP_FAILURE: null,

        UPDATE_PASSWORD_GROUP_REQUEST: null,
        UPDATE_PASSWORD_GROUP_SUCCESS: null,
        UPDATE_PASSWORD_GROUP_FAILURE: null,

        ADD_USER_GROUP_REQUEST: null,
        ADD_USER_GROUP_SUCCESS: null,
        ADD_USER_GROUP_FAILURE: null,
        UPDATE_USER_GROUP_REQUEST: null,
        UPDATE_USER_GROUP_SUCCESS: null,
        UPDATE_USER_GROUP_FAILURE: null,


        DESTROY_PASSWORD_GROUP: null,




        MY_GROUP_LOGOUT: null,


    })
};
