import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import { Link as ReactRouterLink} from 'react-router';

import QuickDescUser from './quickDescUser';
import QuickUpdateUser from './quickUpdateUser';


import _ from 'lodash';
import { PUBLIC_IMAGES_PATH,USER_IMAGES_PATH} from './../../constants/DefaultConstants';
class ListUser extends React.Component {
    constructor(props) {
        super(props);
        this.changeUserActive = this.changeUserActive.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.loadUpdating = this.loadUpdating.bind(this);
        this.stopUpdating = this.stopUpdating.bind(this);
        this.state = {
            list_user: null,
            default_list_user: null,
            userId_active: null,
            isSearching: false,
            search: "",
            isUpdating: false
        }

    }

    componentDidMount() {
        var list_user = (typeof this.props.group !== "undefined"
        && this.props.group !== null && typeof  this.props.group.listUserGroup !== "undefined" ) ? this.props.group.listUserGroup : null;

        var list_user_count = list_user !== null ? list_user.length : 0;
        var userId = null;
        if (list_user_count > 0 && typeof list_user[0] !== "undefined") {
            userId = list_user[0]._id;
        }
        this.setState({
            list_user: list_user,
            default_list_user: list_user,
            userId_active: userId,
        })

    }

    componentWillUpdate(nextProps, nextState) {

        if (nextState.isSearching) {

            var list_user = nextState.list_user;

            var list_user_count = list_user.length;
            var userId = null;
            if (list_user_count > 0 && typeof list_user[0] !== "undefined") {
                userId = list_user[0]._id;
            }
            this.setState({
                list_user: list_user,
                userId_active: userId,
                isSearching: false
            })
        }
        if (this.props.group !== nextProps.group && nextState.list_user !== null) {
            var list_user = (typeof nextProps.group !== "undefined"
            && nextProps.group !== null && typeof  nextProps.group.listUserGroup !== "undefined" ) ? nextProps.group.listUserGroup : null;

            var list_user_count = list_user !== null ? list_user.length : 0;
            this.setState({
                list_user: list_user,
                isSearching: false
            });
        }
    }

    componentWillUnmount() {

    }

    changeUserActive(userId) {
        this.setState({

            userId_active: userId,
        })
    }

    searchUser(val) {
        var listUser = this.state.default_list_user;
        if (val.target.value.length > 0) {

            var result = _.filter(listUser, function (value, key) {

                var flname = value.firstname + " " + value.lastname;
                var lfname = value.lastname + " " + value.firstname;
                return ((flname.toLowerCase().indexOf(val.target.value.toLowerCase()) == 0) || (lfname.toLowerCase().indexOf(val.target.value.toLowerCase()) == 0) );
            })

            listUser = (result);
        }
        this.setState({
            list_user: listUser,
            search: val.target.value,
            isSearching: true,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.list_user !== this.state.list_user)
            || (nextState.default_list_user !== this.state.default_list_user)
            || (nextState.userId_active !== this.state.userId_active)
            || (nextState.search !== this.state.search)
            || (nextState.isSearching !== this.state.isSearching)
            || (nextState.isUpdating !== this.state.isUpdating)

            || (nextProps.user !== this.props.user)
        )
    }


    capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }


    loadUpdating() {
        this.setState({
            isUpdating: true
        })

    }

    stopUpdating() {
        this.setState({
            isUpdating: false
        })

    }

    render() {

        var list_user_count = (this.state.list_user != null) ? this.state.list_user.length : 0;


        return (
            <div id="listUser" className="container-fluid no-padding-right">
                <div className="col-md-8" id="list">

                    <div id="recherche" className="col-md-10 col-md-push-1">
                        <p className="col-xs-3">Recherche :</p>
                        <div className="col-xs-6"><input onChange={this.searchUser.bind(this)}
                                                         value={this.state.search}
                                                         className="form-control"/></div>
                    </div>
                    {list_user_count > 0 &&
                    <div className="row-fluid no-padding-right">
                        {this.state.list_user.map(function (user, i) {

                            //--img
                            var img = null;

                            if (typeof user.media !== "undefined"
                                && typeof user.media.file !== "undefined" && user.media.file !== "") {

                                img = USER_IMAGES_PATH + user.media.file;
                            }
                            else if (typeof user.gender !== "undefined" && user.gender !== "") {
                                if (user.gender == "male") {
                                    img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
                                }
                                else {
                                    img = PUBLIC_IMAGES_PATH + "composant/nobody_f.jpg";
                                }
                            }
                            else {
                                img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
                            }

                            return (<div className="col-sm-4 col-md-4 no-padding-right" key={i}>
                                <a
                                    onClick={this.changeUserActive.bind(this,user._id)}
                                    className={((this.state.userId_active==user._id)?"active":"")+" list-user-item-a"}>
                                    <img src={img} width="50px"/>
                                    <div
                                        className="name-item">{ (user.firstname) + " " + (user.lastname)}</div>
                                    <div
                                        className={ "led "+((user.activated)?"led-green":"led-red")}></div>

                                    <div className="clearfix Clear"></div>
                                </a>
                                <div className="clearfix Clear"></div>
                            </div>)
                        }, this)}
                        <div className="clearfix Clear"></div>


                    </div>}
                </div>
                <div className="col-md-4 no-padding-right" id="desc">
                    {this.state.userId_active != null && !this.state.isUpdating &&
                    <QuickDescUser updateAction={this.loadUpdating.bind(this)} userId={this.state.userId_active}/>
                    }
                    {this.state.userId_active != null && this.state.isUpdating &&
                    <QuickUpdateUser updateAction={this.stopUpdating.bind(this)} userId={this.state.userId_active}/>
                    }
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);

