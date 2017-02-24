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
class QuickDescUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            userSelected: null
        };
        this.capitalize = this.capitalize.bind(this);
        this.loadUpdate = this.loadUpdate.bind(this);
    }

    componentDidMount() {

        var list_user = (typeof this.props.group !== "undefined"
        && this.props.group !== null && typeof  this.props.group.listUserGroup !== "undefined" ) ? this.props.group.listUserGroup : null;

        var user_picked = _.filter(list_user, {'_id': '' + this.props.userId});

        if (typeof user_picked[0] !== "undefined") {
            this.setState({userSelected: user_picked[0]});
        }
        //--img
        /*
         */
    }

    componentWillUpdate(nextProps, nextState) {

        var list_user = (typeof nextProps.group !== "undefined"
        && nextProps.group !== null && typeof  nextProps.group.listUserGroup !== "undefined" ) ? nextProps.group.listUserGroup : null;

        var user_picked = _.filter(list_user, {'_id': '' + nextProps.userId});
        if (typeof user_picked[0] !== "undefined") {
            this.setState({userSelected: user_picked[0]});
        }

    }

    componentWillUnmount() {

    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.userId !== this.props.userId)
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
        this.props.updateAction();
    }


    render() {
        var img = null;
        var age = " N/A";
        var supl = " Non";
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

            var supl = (this.state.userSelected.isSubAdmin) ? "Oui" : "Non";
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
                    <p className="level inputs">Email :</p>
                    <div className="clear clearfix"></div>

                    <p className="span-value">{" " + this.state.userSelected.email}</p>
                    <div className="clear clearfix"></div>
                    <p className="level inputs">Suppléant :</p>
                    <div className="clear clearfix"></div>

                    <p className="span-value">{" " + (supl)}</p>
                    <div className="clear clearfix"></div>


                    <p className="level inputs">Sexe :</p>
                    <div className="clear clearfix"></div>
                    <p
                        className="span-value">{(typeof this.state.userSelected.gender !== "undefined" && this.state.userSelected.gender != null) ? (this.state.userSelected.gender == "female") ? " Femme" : " Homme" : " N/A"}
                    </p>
                    <div className="clear clearfix"></div>

                    <p className="level inputs">Âge :</p>


                    <div className="clear clearfix"></div>
                    <p
                        className="span-value">{age}</p>
                    <div className="clear clearfix"></div>
                    <p className="level inputs">Niveau :</p>
                    <p
                        className="span-value">{" " + (typeof this.state.userSelected.level !== "undefined" && this.state.userSelected.level != null) ? " " + this.state.userSelected.level : " N/A"}</p>
                    <div className="clear clearfix"></div>

                    <a id="custom" onClick={this.loadUpdate.bind(this)}>Modifier</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuickDescUser);

