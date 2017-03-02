import {createReducer} from '../utils/util';
import {CalendarConstants} from '../constants/CalendarConstants';
import {pushState} from 'redux-router';
import _ from 'lodash';

const initialState = {
    params: null,
    list_days_off: null,
    textStatutParams: "",
    textStatutDayOff: "",
    calendar: null,
    list_calendar: "",
};


// get my group
function UPDATE_CALENDAR_PARAMS_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutAddUserGroup: "",

    });
}
function UPDATE_CALENDAR_PARAMS_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        params: action.payload.reponse,
        textStatutParams: "",

    });
}
function UPDATE_CALENDAR_PARAMS_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        params: null,
        textStatutParams: "",
    });

}

// get my params
function GET_CALENDAR_PARAMS_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutAddUserGroup: "",

    });
}
function GET_CALENDAR_PARAMS_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        params: action.payload.reponse,
        textStatutParams: "",

    });
}
function GET_CALENDAR_PARAMS_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        params: null,
        textStatutParams: "",
    });

}
// day off add
function ADD_DAY_OFF_CALENDAR_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutDayOff: "",
        list_days_off: null,
    });
}
function ADD_DAY_OFF_CALENDAR_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        list_days_off: action.payload.reponse,
        textStatutDayOff: "",

    });
}
function ADD_DAY_OFF_CALENDAR_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        list_days_off: null,
        textStatutDayOff: "",
    });

}
function GET_DAY_OFF_CALENDAR_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutDayOff: "",

    });
}
function GET_DAY_OFF_CALENDAR_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        list_days_off: action.payload.reponse,
        textStatutDayOff: "",

    });
}
function GET_DAY_OFF_CALENDAR_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        list_days_off: null,
        textStatutDayOff: "",
    });

}
function UPDATE_DAY_OFF_CALENDAR_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutDayOff: "",

    });
}
function UPDATE_DAY_OFF_CALENDAR_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        list_days_off: action.payload.reponse,
        textStatutDayOff: "",

    });
}
function UPDATE_DAY_OFF_CALENDAR_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        list_days_off: null,
        textStatutDayOff: "",
    });

}

function DELETE_DAY_OFF_CALENDAR_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutDayOff: "",
        list_days_off: null,
    });
}
function DELETE_DAY_OFF_CALENDAR_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        list_days_off: action.payload.reponse,
        textStatutDayOff: "",

    });
}
function DELETE_DAY_OFF_CALENDAR_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        list_days_off: null,
        textStatutDayOff: "",
    });

}
function ADD_CALENDAR_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {});
}
function ADD_CALENDAR_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    return Object.assign({}, state, {

        calendar: action.payload.reponse,

    });
}
function ADD_CALENDAR_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        calendar: null,
    });

}
function UPDATE_CALENDAR_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {});
}
function UPDATE_CALENDAR_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        calendar: null,

    });
}
function UPDATE_CALENDAR_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        calendar: null,
    });

}
function GET_CALENDAR_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {});
}
function GET_CALENDAR_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');


    return Object.assign({}, state, {

        calendar: action.payload.reponse,

    });
}
function GET_CALENDAR_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        calendar: null,
    });

}


const handlers =
    {

        [CalendarConstants.ActionTypes.UPDATE_CALENDAR_PARAMS_REQUEST]: UPDATE_CALENDAR_PARAMS_REQUEST,
        [CalendarConstants.ActionTypes.UPDATE_CALENDAR_PARAMS_SUCCESS]: UPDATE_CALENDAR_PARAMS_SUCCESS,
        [CalendarConstants.ActionTypes.UPDATE_CALENDAR_PARAMS_FAILURE]: UPDATE_CALENDAR_PARAMS_FAILURE,
        [CalendarConstants.ActionTypes.GET_CALENDAR_PARAMS_REQUEST]: GET_CALENDAR_PARAMS_REQUEST,
        [CalendarConstants.ActionTypes.GET_CALENDAR_PARAMS_SUCCESS]: GET_CALENDAR_PARAMS_SUCCESS,
        [CalendarConstants.ActionTypes.GET_CALENDAR_PARAMS_FAILURE]: GET_CALENDAR_PARAMS_FAILURE,

        [CalendarConstants.ActionTypes.ADD_DAY_OFF_CALENDAR_REQUEST]: ADD_DAY_OFF_CALENDAR_REQUEST,
        [CalendarConstants.ActionTypes.ADD_DAY_OFF_CALENDAR_SUCCESS]: ADD_DAY_OFF_CALENDAR_SUCCESS,
        [CalendarConstants.ActionTypes.ADD_DAY_OFF_CALENDAR_FAILURE]: ADD_DAY_OFF_CALENDAR_FAILURE,

        [CalendarConstants.ActionTypes.GET_DAY_OFF_CALENDAR_REQUEST]: GET_DAY_OFF_CALENDAR_REQUEST,
        [CalendarConstants.ActionTypes.GET_DAY_OFF_CALENDAR_SUCCESS]: GET_DAY_OFF_CALENDAR_SUCCESS,
        [CalendarConstants.ActionTypes.GET_DAY_OFF_CALENDAR_FAILURE]: GET_DAY_OFF_CALENDAR_FAILURE,

        [CalendarConstants.ActionTypes.UPDATE_DAY_OFF_CALENDAR_REQUEST]: UPDATE_DAY_OFF_CALENDAR_REQUEST,
        [CalendarConstants.ActionTypes.UPDATE_DAY_OFF_CALENDAR_SUCCESS]: UPDATE_DAY_OFF_CALENDAR_SUCCESS,
        [CalendarConstants.ActionTypes.UPDATE_DAY_OFF_CALENDAR_FAILURE]: UPDATE_DAY_OFF_CALENDAR_FAILURE,

        [CalendarConstants.ActionTypes.DELETE_DAY_OFF_CALENDAR_REQUEST]: DELETE_DAY_OFF_CALENDAR_REQUEST,
        [CalendarConstants.ActionTypes.DELETE_DAY_OFF_CALENDAR_SUCCESS]: DELETE_DAY_OFF_CALENDAR_SUCCESS,
        [CalendarConstants.ActionTypes.DELETE_DAY_OFF_CALENDAR_FAILURE]: DELETE_DAY_OFF_CALENDAR_FAILURE,

        [CalendarConstants.ActionTypes.ADD_CALENDAR_REQUEST]: ADD_CALENDAR_REQUEST,
        [CalendarConstants.ActionTypes.ADD_CALENDAR_SUCCESS]: ADD_CALENDAR_SUCCESS,
        [CalendarConstants.ActionTypes.ADD_CALENDAR_FAILURE]: ADD_CALENDAR_FAILURE,

        [CalendarConstants.ActionTypes.UPDATE_CALENDAR_REQUEST]: UPDATE_CALENDAR_REQUEST,
        [CalendarConstants.ActionTypes.UPDATE_CALENDAR_SUCCESS]: UPDATE_CALENDAR_SUCCESS,
        [CalendarConstants.ActionTypes.UPDATE_CALENDAR_FAILURE]: UPDATE_CALENDAR_FAILURE,

        [CalendarConstants.ActionTypes.GET_CALENDAR_REQUEST]: GET_CALENDAR_REQUEST,
        [CalendarConstants.ActionTypes.GET_CALENDAR_SUCCESS]: GET_CALENDAR_SUCCESS,
        [CalendarConstants.ActionTypes.GET_CALENDAR_FAILURE]: GET_CALENDAR_FAILURE,


    }
export default createReducer(initialState, handlers);

