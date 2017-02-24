import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import { Link as ReactRouterLink} from 'react-router';
import { PUBLIC_IMAGES_PATH,GROUP_IMAGES_PATH} from './../../constants/DefaultConstants';
import RetinaImage from 'react-retina-image';
import Mydata from './Mydata';
import Password from './Password';
import AddUser from './addUser';
import ListUser from './listUser';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.password = this.password.bind(this);
        this.updateTab = this.updateTab.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            tab: 1,
            edit: false,
            password: false,
            newUser: false,
        }
    }

    componentDidMount() {

        if (!this.props.loading && typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined" && this.props.user._id != null) {
            this.props.actions.getMyGroup(this.props.user._id);
        }
    }

    componentWillUpdate(nextProps, nextState) {
    }

    edit() {
        this.setState({edit: true, password: false, newUser: false, tab: 4})
    }

    password() {
        this.setState({password: true, edit: false, newUser: false, tab: 3})
    }

    newUser() {
        this.setState({password: false, newUser: true, edit: false, tab: 2})
    }

    updateTab(id) {


        if (id == 1)
            this.setState({
                password: false, newUser: false, edit: false,
                tab: id
            });
        if (id == 2) {
            this.setState({password: false, newUser: true, edit: false, tab: id})
        }
        if (id == 3) {
            this.setState({password: true, newUser: false, edit: false, tab: id})
        }
        if (id == 4) {
            this.setState({password: false, newUser: false, edit: true, tab: id})
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.tab !== this.state.tab)
            || (nextState.edit !== this.state.edit)
            || (nextState.newUser !== this.state.newUser)
            || (nextState.password !== this.state.password)
            || (nextProps.user !== this.props.user)
        )
    }

    render() {
        var img = null;

        if (typeof this.props.group !== "undefined"
            && typeof this.props.group.group !== "undefined"
            && this.props.group.group !== null
            && typeof this.props.group.group.media !== "undefined"
            && typeof this.props.group.group.media.file !== "undefined" && this.props.group.group.media.file !== "") {

            img = GROUP_IMAGES_PATH + this.props.group.group.media.file;
        }

        else {
            img = PUBLIC_IMAGES_PATH + "composant/team.png";
        }


        var nbr_group = (typeof this.props.group !== "undefined"
        && this.props.group !== null && typeof  this.props.group.listUserGroup !== "undefined" && this.props.group.listUserGroup !== null ) ? this.props.group.listUserGroup.length + 1 : 1;


        var to_show = null;
        if (this.state.edit) {
            to_show = <Mydata/>;
        }
        if (this.state.password) {
            to_show = <Password/>;
        }
        if (this.state.newUser) {
            to_show = <AddUser/>;
        }
        if (!this.state.edit && !this.state.newUser && !this.state.password) {
            to_show = <ListUser/>
        }
        return (
            <div id="team">


                <div id="my-account-header">
                    <img id="img-profile" src={img}/>
                    <div id="titlegroup">
                        {(typeof this.props.group !== "undefined"
                        && this.props.group.group !== null
                        && typeof this.props.group.group.name !== "undefined"
                        && this.props.group.group.name !== "") &&
                        <h1><b>{this.props.group.group.name}</b></h1>
                        }
                        <p className="info">{nbr_group} membre{(nbr_group > 1) ? "s" : ""}</p>
                    </div>
                    <div id="icon-right">
                        <a id="logout" onClick={this.edit.bind(this)}>
                            <i className="font-edit"></i>
                        </a>
                        <a id="lock" onClick={this.password.bind(this)}>
                            <i className="font-lock"></i>
                        </a>
                        <a id="add" onClick={this.newUser.bind(this)}>
                            <i className="font-add-simple"></i>
                        </a>


                    </div>
                    <div className="clear clearfix"></div>
                    <div className="clear clearfix"></div>
                    <div id="tab-menu">
                        <a
                            onClick={this.updateTab.bind(this,1)}
                            className={(this.state.tab==1)?"tab-item active":"tab-item"}>
                            Les membres
                        </a><a
                        onClick={this.updateTab.bind(this,2)}
                        className={(this.state.tab==2)?"tab-item active":"tab-item"}>
                        Ajouter un membre
                    </a>
                        <a onClick={this.updateTab.bind(this,3)}
                           className={(this.state.tab==3)?"tab-item active":"tab-item"}>
                            Le mot de passe du groupe
                        </a>

                        <a onClick={this.updateTab.bind(this,4)}
                           className={(this.state.tab==4)?"tab-item active":"tab-item"}>
                            Les informations du groupe
                        </a>
                    </div>
                    <div className="clear clearfix"></div>
                </div>
                <div className="clear clearfix"></div>
                {to_show}
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

export default connect(mapStateToProps, mapDispatchToProps)(Team);

