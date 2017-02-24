import {createReducer} from '../utils/util';
import { GroupConstants } from '../constants/GroupConstants';
import {pushState} from 'redux-router';
import _ from 'lodash';

const initialState = {
    group: null,
    is_admin: false,
    is_subAdmin: false,
    adminGroup: null,
    subAdminGroup: null,
    listUserGroup: null,
    isRequesting: false,
    groupPassword: "",
    textStatutPassword: "",
    textStatutAddUserGroup: "",
};


// get my group
function MY_GROUP_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true,
        textStatutAddUserGroup: "",

    });
}
function MY_GROUP_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    var retour = action.payload;
    var group = {};
    var list_user = [];
    var is_admin = false;
    var is_subAdmin = false;
    var adminGroupID = null;
    var subAdminGroupID = null;
    var adminGroup = null;
    var subAdminGroup = null;

    if (typeof retour.reponse !== "undefined" && retour.reponse != null
        && typeof retour.userId !== "undefined" && retour.userId != null) {
        //--- group
        group.id = retour.reponse[0]._id;
        group.name = retour.reponse[0].name;
        if ((typeof retour.reponse[0].media !== "undefined"))
            group.media = retour.reponse[0].media;
        group.private = retour.reponse[0].private;
        group.createdAt = retour.reponse[0].createdAt;
        group.updatedAt = retour.reponse[0].updatedAt;

        retour.reponse[0].listUser.map(function (user, id) {
            if (user.userId == retour.userId) {
                if (user.isAdmin) {
                    is_admin = true;
                    adminGroupID = retour.userId;

                }
                else if (user.isSubadmin) {
                    is_subAdmin = true;
                    subAdminGroupID = retour.userId;

                }

            }
            else if (user.userId !== retour.userId) {
                if (user.isAdmin) {
                    adminGroupID = user.userId;

                }
                if (user.isSubAdmin) {
                    subAdminGroupID = user.userId;

                }


            }
        });

        //-- list user
        retour.reponse[0].users.map(function (user, id) {

            //--- is_activated
            var user_picked = _.filter(retour.reponse[0].listUser, {'userId': '' + user._id});
            if (typeof user_picked[0] !== "undefined" && typeof user_picked[0].activated !== "undefined") {
                user.activated = (user_picked[0].activated) ? true : false;
                user.isSubAdmin = (user_picked[0].isSubAdmin) ? true : false;
            }
            else {
                user.activated = false;
            }
            if (subAdminGroupID == user._id) {
                subAdminGroup = user;
            }
            if (adminGroupID == user._id) {
                adminGroup = user;
            }
            if (user._id !== retour.userId) {
                list_user.push(user);
            }
        });


    }


    return Object.assign({}, state, {
        'isRequesting': false,
        'group': group,
        'listUserGroup': list_user,
        'is_admin': is_admin,
        'is_subAdmin': is_subAdmin,
        'adminGroup': adminGroup,
        'subAdminGroup': subAdminGroup,

    });
}
function MY_GROUP_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        group: null,
        is_admin: false,
        is_subAdmin: false,
        listUserGroup: null,
        adminGroup: null,
        subAdminGroup: null,
        isRequesting: false,
    });

}

function MY_GROUP_LOGOUT(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        group: null,
        is_admin: false,
        is_subAdmin: false,
        listUserGroup: null,
        adminGroup: null,
        subAdminGroup: null,
        isRequesting: false,
        groupPassword: "",
    });
}
function DESTROY_PASSWORD_GROUP(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        groupPassword: "",
        'textStatutPassword': "",
        'textStatutErrorPassword': "",
        textStatutAddUserGroup: "",
    });
}


function UPDATE_GROUP_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true,

    });
}

function UPDATE_GROUP_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    var retour = action.payload;
    var group = {};
    var list_user = [];
    var is_admin = false;
    var is_subAdmin = false;
    var adminGroupID = null;
    var subAdminGroupID = null;
    var adminGroup = null;
    var subAdminGroup = null;


    if (typeof retour.reponse !== "undefined" && retour.reponse != null
        && typeof retour.userId !== "undefined" && retour.userId != null) {
        //--- group
        group.id = retour.reponse[0]._id;
        group.name = retour.reponse[0].name;
        if ((typeof retour.reponse[0].media !== "undefined"))
            group.media = retour.reponse[0].media;

        group.private = retour.reponse[0].private;
        group.createdAt = retour.reponse[0].createdAt;
        group.updatedAt = retour.reponse[0].updatedAt;

        retour.reponse[0].listUser.map(function (user, id) {
            if (user.userId == retour.userId) {
                if (user.isAdmin) {
                    is_admin = true;
                    adminGroupID = retour.userId;

                }
                else if (user.isSubadmin) {
                    is_subAdmin = true;
                    subAdminGroupID = retour.userId;

                }

            }
            else if (user.userId !== retour.userId) {
                if (user.isAdmin) {
                    adminGroupID = user.userId;

                }
                if (user.isSubAdmin) {
                    subAdminGroupID = user.userId;

                }


            }
        });

        //-- list user
        retour.reponse[0].users.map(function (user, id) {
//--- is_activated
            var user_picked = _.filter(retour.reponse[0].listUser, {'userId': '' + user._id});
            if (typeof user_picked[0] !== "undefined" && typeof user_picked[0].activated !== "undefined") {
                user.activated = (user_picked[0].activated) ? true : false;
                user.isSubAdmin = (user_picked[0].isSubAdmin) ? true : false;
            }
            else {
                user.activated = false;
            }

            if (subAdminGroupID == user._id) {
                subAdminGroup = user;
            }
            if (adminGroupID == user._id) {
                adminGroup = user;
            }
            if (user._id !== retour.userId) {
                list_user.push(user);
            }
        });


    }


    return Object.assign({}, state, {
        'isRequesting': false,
        'group': group,
        'listUserGroup': list_user,
        'is_admin': is_admin,
        'is_subAdmin': is_subAdmin,
        'adminGroup': adminGroup,
        'subAdminGroup': subAdminGroup,

    });
}

function UPDATE_GROUP_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {});
}


//--- get paswword group


function GET_PASSWORD_GROUP_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true,
        'textStatutPassword': "",
        'textStatutErrorPassword': "",

    });
}
function GET_PASSWORD_GROUP_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': false,
        "groupPassword": action.payload.reponse.pwd

    });
}
function GET_PASSWORD_GROUP_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': false,
        "groupPassword": "",

    });
}


function UPDATE_PASSWORD_GROUP_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true,
        'textStatutPassword': "",
        'textStatutErrorPassword': "",

    });
}
function UPDATE_PASSWORD_GROUP_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': false,
        "groupPassword": action.payload.reponse.pwd,
        textStatutPassword: "Le mot de passe a bien été modifié",
        textStatutErrorPassword: ""

    });
}
function UPDATE_PASSWORD_GROUP_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': false,
        textStatutPassword: "",
        textStatutErrorPassword: "Le mot de passe n'à pas pu être modifié",
        "groupPassword": "",

    });
}


//--- add user group
function ADD_USER_GROUP_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true,
        textStatutAddUserGroup: "",

    });
}
function ADD_USER_GROUP_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    var retour = action.payload;
    var group = {};
    var list_user = [];
    var is_admin = false;
    var is_subAdmin = false;
    var adminGroupID = null;
    var subAdminGroupID = null;
    var adminGroup = null;
    var subAdminGroup = null;

    if (typeof retour.reponse !== "undefined" && retour.reponse != null
        && typeof retour.userId !== "undefined" && retour.userId != null) {
        //--- group
        group.id = retour.reponse[0]._id;
        group.name = retour.reponse[0].name;
        if ((typeof retour.reponse[0].media !== "undefined"))
            group.media = retour.reponse[0].media;
        group.private = retour.reponse[0].private;
        group.createdAt = retour.reponse[0].createdAt;
        group.updatedAt = retour.reponse[0].updatedAt;

        retour.reponse[0].listUser.map(function (user, id) {
            if (user.userId == retour.userId) {
                if (user.isAdmin) {
                    is_admin = true;
                    adminGroupID = retour.userId;

                }
                else if (user.isSubadmin) {
                    is_subAdmin = true;
                    subAdminGroupID = retour.userId;

                }

            }
            else if (user.userId !== retour.userId) {
                if (user.isAdmin) {
                    adminGroupID = user.userId;

                }
                if (user.isSubAdmin) {
                    subAdminGroupID = user.userId;

                }


            }
        });

        //-- list user
        retour.reponse[0].users.map(function (user, id) {
            //--- is_activated
            var user_picked = _.filter(retour.reponse[0].listUser, {'userId': '' + user._id});
            if (typeof user_picked[0] !== "undefined" && typeof user_picked[0].activated !== "undefined") {
                user.activated = (user_picked[0].activated) ? true : false;
                user.isSubAdmin = (user_picked[0].isSubAdmin) ? true : false;
            }
            else {
                user.activated = false;
            }

            if (subAdminGroupID == user._id) {
                subAdminGroup = user;
            }
            if (adminGroupID == user._id) {
                adminGroup = user;
            }
            if (user._id !== retour.userId) {
                list_user.push(user);
            }
        });


    }


    return Object.assign({}, state, {
        'isRequesting': false,
        'group': group,
        'listUserGroup': list_user,
        'is_admin': is_admin,
        'is_subAdmin': is_subAdmin,
        textStatutAddUserGroup: "",
        'adminGroup': adminGroup,
        'subAdminGroup': subAdminGroup,

    });
}
function ADD_USER_GROUP_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutAddUserGroup: "Impossible d'ajouter cette utilisateur (" + action.payload + ")",

        isRequesting: false,
    });

}//--- add user group
function UPDATE_USER_GROUP_REQUEST(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        'isRequesting': true,
        textStatutAddUserGroup: "",

    });
}
function UPDATE_USER_GROUP_SUCCESS(state, action) {
    Object.assign = Object.assign || require('object-assign');

    var retour = action.payload;
    var group = {};
    var list_user = [];
    var is_admin = false;
    var is_subAdmin = false;
    var adminGroupID = null;
    var subAdminGroupID = null;
    var adminGroup = null;
    var subAdminGroup = null;

    if (typeof retour.reponse !== "undefined" && retour.reponse != null
        && typeof retour.userId !== "undefined" && retour.userId != null) {
        //--- group
        group.id = retour.reponse[0]._id;
        group.name = retour.reponse[0].name;
        if ((typeof retour.reponse[0].media !== "undefined"))
            group.media = retour.reponse[0].media;
        group.private = retour.reponse[0].private;
        group.createdAt = retour.reponse[0].createdAt;
        group.updatedAt = retour.reponse[0].updatedAt;

        retour.reponse[0].listUser.map(function (user, id) {
            if (user.userId == retour.userId) {
                if (user.isAdmin) {
                    is_admin = true;
                    adminGroupID = retour.userId;

                }
                else if (user.isSubadmin) {
                    is_subAdmin = true;
                    subAdminGroupID = retour.userId;
                }

            }
            else if (user.userId !== retour.userId) {
                if (user.isAdmin) {
                    adminGroupID = user.userId;

                }
                if (user.isSubAdmin) {
                    subAdminGroupID = user.userId;

                }


            }
        });

        //-- list user
        console.log( retour.reponse[0].users);
        retour.reponse[0].users.map(function (user, id) {
            //--- is_activated
            var user_picked = _.filter(retour.reponse[0].listUser, {'userId': '' + user._id});
            if (typeof user_picked[0] !== "undefined" && typeof user_picked[0].activated !== "undefined") {
                user.activated = (user_picked[0].activated) ? true : false;
                user.isSubAdmin = (user_picked[0].isSubAdmin) ? true : false;
            }
            else {
                user.activated = false;
            }

            if (subAdminGroupID == user._id) {
                subAdminGroup = user;
            }
            if (adminGroupID == user._id) {
                adminGroup = user;
            }
            if (user._id !== retour.userId) {
                list_user.push(user);
            }
        });


    }


    return Object.assign({}, state, {
        'isRequesting': false,
        'group': group,
        'listUserGroup': list_user,
        'is_admin': is_admin,
        'is_subAdmin': is_subAdmin,
        textStatutAddUserGroup: "",
        'adminGroup': adminGroup,
        'subAdminGroup': subAdminGroup,

    });
}
function UPDATE_USER_GROUP_FAILURE(state, action) {
    Object.assign = Object.assign || require('object-assign');
    return Object.assign({}, state, {
        textStatutAddUserGroup: "Impossible de modifier cette utilisateur (" + action.payload + ")",

        isRequesting: false,
    });

}


const handlers =
{

    [GroupConstants.ActionTypes.MY_GROUP_REQUEST]: MY_GROUP_REQUEST,
    [GroupConstants.ActionTypes.MY_GROUP_SUCCESS]: MY_GROUP_SUCCESS,
    [GroupConstants.ActionTypes.MY_GROUP_FAILURE]: MY_GROUP_FAILURE,
    [GroupConstants.ActionTypes.UPDATE_GROUP_REQUEST]: UPDATE_GROUP_REQUEST,
    [GroupConstants.ActionTypes.UPDATE_GROUP_SUCCESS]: UPDATE_GROUP_SUCCESS,
    [GroupConstants.ActionTypes.UPDATE_GROUP_FAILURE]: UPDATE_GROUP_FAILURE,

    [GroupConstants.ActionTypes.GET_PASSWORD_GROUP_REQUEST]: GET_PASSWORD_GROUP_REQUEST,
    [GroupConstants.ActionTypes.GET_PASSWORD_GROUP_SUCCESS]: GET_PASSWORD_GROUP_SUCCESS,
    [GroupConstants.ActionTypes.GET_PASSWORD_GROUP_FAILURE]: GET_PASSWORD_GROUP_FAILURE,
    [GroupConstants.ActionTypes.UPDATE_PASSWORD_GROUP_REQUEST]: UPDATE_PASSWORD_GROUP_REQUEST,
    [GroupConstants.ActionTypes.UPDATE_PASSWORD_GROUP_SUCCESS]: UPDATE_PASSWORD_GROUP_SUCCESS,
    [GroupConstants.ActionTypes.UPDATE_PASSWORD_GROUP_FAILURE]: UPDATE_PASSWORD_GROUP_FAILURE,
    [GroupConstants.ActionTypes.ADD_USER_GROUP_REQUEST]: ADD_USER_GROUP_REQUEST,
    [GroupConstants.ActionTypes.ADD_USER_GROUP_SUCCESS]: ADD_USER_GROUP_SUCCESS,
    [GroupConstants.ActionTypes.ADD_USER_GROUP_FAILURE]: ADD_USER_GROUP_FAILURE,

    [GroupConstants.ActionTypes.UPDATE_USER_GROUP_REQUEST]: UPDATE_USER_GROUP_REQUEST,
    [GroupConstants.ActionTypes.UPDATE_USER_GROUP_SUCCESS]: UPDATE_USER_GROUP_SUCCESS,
    [GroupConstants.ActionTypes.UPDATE_USER_GROUP_FAILURE]: UPDATE_USER_GROUP_FAILURE,
    [GroupConstants.ActionTypes.DESTROY_PASSWORD_GROUP]: DESTROY_PASSWORD_GROUP,
    [GroupConstants.ActionTypes.MY_GROUP_LOGOUT]: MY_GROUP_LOGOUT,


}
export default createReducer(initialState, handlers);

