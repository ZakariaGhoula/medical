import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import { Link as ReactRouterLink} from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { PUBLIC_IMAGES_PATH,USER_IMAGES_PATH} from './../../constants/DefaultConstants';
class QuickUpdateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            userSelected: null,


            userId: null,
            lastname: "",
            firstname: "",
            gender: "female",
            subAdmin: false,
            password: "",
            level: "R1",
            groupPassword: "",
            email: "",
            errorEmail: false,
            errorPwd: false,
            errorName: false,
            errorFirstName: false,
            focused: false,
            cropperOpen: false,
            croppedImg: null,
            updatingSelect: false,
            date: moment(),
        };
        this.loadUpdate = this.loadUpdate.bind(this);
        this.changeLevel = this.changeLevel.bind(this);
        this.changeSubAdmin = this.changeSubAdmin.bind(this);
        this.changeStatut = this.changeStatut.bind(this);
        this.capitalize = this.capitalize.bind(this);
    }

    componentDidMount() {

        var list_user = (typeof this.props.group !== "undefined"
        && this.props.group !== null && typeof  this.props.group.listUserGroup !== "undefined" ) ? this.props.group.listUserGroup : null;

        var user_picked = _.filter(list_user, {'_id': '' + this.props.userId});
        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;


        if (typeof user_picked[0] !== "undefined") {
            this.setState({
                level: user_picked[0].level,
                gender: user_picked[0].gender != null ? user_picked[0].gender : "female",
                lastname: user_picked[0].lastname != null ? user_picked[0].lastname : "",
                firstname: user_picked[0].firstname != null ? user_picked[0].firstname : "",
                activated: user_picked[0].activated != null ? user_picked[0].activated : false,
                subAdmin: user_picked[0].isSubAdmin != null ? user_picked[0].isSubAdmin : false,
                userSelected: user_picked[0]
            });
        }
        this.setState({groupId: groupId, userId: userId});


    }

    componentWillUpdate(nextProps, nextState) {
        var list_user = (typeof nextProps.group !== "undefined"
        && nextProps.group !== null && typeof  nextProps.group.listUserGroup !== "undefined" ) ? nextProps.group.listUserGroup : null;
        var user_picked = _.filter(list_user, {'_id': '' + nextProps.userId});
        if (typeof user_picked[0] !== "undefined" && !nextState.updatingSelect &&  nextProps.userId!==this.props.userId) {
            this.setState({
                level: user_picked[0].level,
                gender: user_picked[0].gender != null ? user_picked[0].gender : "female",
                lastname: user_picked[0].lastname != null ? user_picked[0].lastname : "",
                firstname: user_picked[0].firstname != null ? user_picked[0].firstname : "",
                activated: user_picked[0].activated != null ? user_picked[0].activated : false,
                subAdmin: user_picked[0].isSubAdmin != null ? user_picked[0].isSubAdmin : false,
                userSelected: user_picked[0]
            });
        }
        else {
            this.setState({updatingSelect: false})
        }
    }

    componentWillUnmount() {

    }


    changeLevel(val) {
        this.setState({
            level: val.target.value,
            updatingSelect: true
        })
    }

    changeStatut(val) {
        this.setState({
            activated: val.target.value,
            updatingSelect: true
        })
    }

    changeSubAdmin(val) {
        this.setState({
            subAdmin: val.target.value,
            updatingSelect: true
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.userId !== this.props.userId)
            || (nextState.userId !== this.state.userId)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.lastname !== this.state.lastname)
            || (nextState.firstname !== this.state.firstname)
            || (nextState.subAdmin !== this.state.subAdmin)
            || (nextState.updatingSelect !== this.state.updatingSelect)
            || (nextState.level !== this.state.level)
            || (nextState.activated !== this.state.activated)
            || (nextProps.user !== this.props.user)
            || (nextState.userSelected !== this.state.userSelected)

        )
    }


    capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }

    loadUpdate() {

        if (this.state.userId !== null && this.state.groupId) {
            var data = {
                userAdminId: this.state.userId,
                groupId: this.state.groupId,
                token: this.props.token,
                userId: this.props.userId,
                subAdmin: this.state.subAdmin,
                level: this.state.level,
                activated: this.state.activated

            }

            this.props.actions.updateUserGroup(data);
            this.props.updateAction();
        }

        //
    }

    render() {
        var img = null;
        var age = " N/A";
        if (this.state.userSelected !== null) {
            if (typeof this.state.userSelected.media !== "undefined"
                && typeof this.state.userSelected.media.file !== "undefined" && this.state.userSelected.media.file !== "") {

                img = USER_IMAGES_PATH + this.state.userSelected.media.file;
            }
            else if (typeof this.state.userSelected.gender !== "undefined" && this.state.userSelected.gender !== "") {
                if (this.state.userSelected.gender == "male") {
                    img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
                }
                else {
                    img = PUBLIC_IMAGES_PATH + "composant/nobody_f.jpg";
                }
            }
            else {
                img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
            }
            var age = ((moment().diff(this.state.userSelected.birthday, 'years', false)) > 18 ? " " + (moment().diff(this.state.userSelected.birthday, 'years', false) + " ans") : " N/A");
        }


        return (
            <div id="quickDesc" className="no-padding container-fluid">

                {this.state.userSelected != null && <div className="zone-img">
                    <img src={img} width="130px"/>
                    <div className="clear clearfix"></div>
                    <h2>{this.state.userSelected.firstname + " " + this.state.userSelected.lastname}</h2>
                    <h3 className={((this.state.userSelected.activated)?"activated":"")+" statut"}>{(this.state.userSelected.activated) ? "actif" : "non-actif"}</h3>
                </div>
                }
                <div className="clear clearfix"></div>
                {this.state.userSelected != null && <div className="zone-desc">

                    <div className="clear clearfix"></div>
                    <p className="level inputs">Niveau :</p>

                    <div
                        className="span-value">
                        <select value={this.state.level}
                                onChange={this.changeLevel.bind(this)}
                                className="form-control">
                            <option value="R1">R1</option>
                            <option value="R2">R2</option>
                            <option value="R3">R3</option>
                            <option value="R4">R4</option>
                            <option value="R5">R5</option>
                        </select>
                        <div className="clear clearfix"></div>

                    </div>
                    <p className="level inputs">Statut :</p>

                    <div
                        className="span-value">
                        <select value={this.state.activated}
                                onChange={this.changeStatut.bind(this)}
                                className="form-control">
                            <option value={true}>Actif</option>
                            <option value={false}>Non-actif</option>

                        </select>
                        <div className="clear clearfix"></div>

                    </div>
                    <div className="clear clearfix"></div>
                    <p className="level inputs">Suppléant :</p>

                    <div
                        className="span-value">
                        <select value={this.state.subAdmin}
                                onChange={this.changeSubAdmin.bind(this)}
                                className="form-control">
                            <option value={true}>Oui</option>
                            <option value={false}>Non</option>

                        </select>
                        <div className="clear clearfix"></div>

                    </div>
                    <div className="clear clearfix"></div>

                    <a id="custom" onClick={this.loadUpdate.bind(this)}>Enregistrer</a>
                </div>}


                <div className="clear clearfix"></div>


            </div>


        );
    }
}
const mapStateToProps = (state) => ({
    group: state.group,
    user: state.session.user,
    loading: state.loadingBar,
    token: state.session.token,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickUpdateUser);

