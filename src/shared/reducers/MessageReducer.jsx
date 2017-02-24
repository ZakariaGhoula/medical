import {createReducer} from '../utils/util';
import { MessageConstants } from '../constants/MessageConstants';
import {pushState} from 'redux-router';

const initialState = {

    list_messages: [],

    isRequesting: false,
    isUpdating: false,
    isRequestingDetail: false,
    statusText: null,
    notifications_messages: false,
    notifications_messages_nbr: 0
};

function SEND_MESSAGE_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true
    });
}
function SEND_MESSAGE_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function SEND_MESSAGE_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    var message = action.payload.reponse.result;


    return Object.assign({}, state, {
        'isRequesting': false,
        'list_messages': [...state.list_messages, message]
    });

}
function GET_MESSAGES_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true
    });
}
function GET_MESSAGES_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function GET_MESSAGES_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    return Object.assign({}, state, {
        'isRequesting': false,
        'list_messages': action.payload.reponse.result
    });

}
function SOCKET_GET_MESSAGES_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true
    });
}
function SOCKET_GET_MESSAGES_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': false,
        'statutText': 'Erreur'
    });

}
function SOCKET_GET_MESSAGES_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    var list_messages = state.list_messages;
    var nbr = state.notifications_messages_nbr;

    if (typeof list_messages !== "undefined" && list_messages.length > 0) {
        var message_groupId = list_messages[0].groupId;

        var new_list_messages = action.payload.reponse.result;

        if (list_messages.length > 0 && new_list_messages[0].groupId == message_groupId) {


            return Object.assign({}, state, {
                'isRequesting': false,
                'list_messages': action.payload.reponse.result,
                'notifications_messages': true,
                'notifications_messages_nbr': (nbr!=="undefined")?nbr + 1:1,
            });
        }
    }
    else {
        return Object.assign({}, state, {
            'isRequesting': false,
            'notifications_messages': true,
            'notifications_messages_nbr': (nbr!=="undefined")?nbr + 1:1,
        });
    }


}

const handlers =
{
    [MessageConstants.ActionTypes.SEND_MESSAGE_REQUEST]: SEND_MESSAGE_REQUEST,
    [MessageConstants.ActionTypes.SEND_MESSAGE_FAILURE]: SEND_MESSAGE_FAILURE,
    [MessageConstants.ActionTypes.SEND_MESSAGE_SUCCESS]: SEND_MESSAGE_SUCCESS,
    [MessageConstants.ActionTypes.GET_MESSAGES_REQUEST]: GET_MESSAGES_REQUEST,
    [MessageConstants.ActionTypes.GET_MESSAGES_FAILURE]: GET_MESSAGES_FAILURE,
    [MessageConstants.ActionTypes.GET_MESSAGES_SUCCESS]: GET_MESSAGES_SUCCESS,
    [MessageConstants.ActionTypes.SOCKET_GET_MESSAGES_REQUEST]: SOCKET_GET_MESSAGES_REQUEST,
    [MessageConstants.ActionTypes.SOCKET_GET_MESSAGES_FAILURE]: SOCKET_GET_MESSAGES_FAILURE,
    [MessageConstants.ActionTypes.SOCKET_GET_MESSAGES_SUCCESS]: SOCKET_GET_MESSAGES_SUCCESS,

}
export default createReducer(initialState, handlers);