import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import { Link as ReactRouterLink} from 'react-router';
import { PUBLIC_IMAGES_PATH,USER_IMAGES_PATH} from './../../constants/DefaultConstants';
import RetinaImage from 'react-retina-image';
import Image from './Image';
import Mydata from './Mydata';

class Myaccount extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.updateTab = this.updateTab.bind(this);

        this.state = {
            tab: 1
        }
    }

    componentDidMount() {

        if (!this.props.loading && typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined" && this.props.user._id != null) {
            this.props.actions.getMyGroup(this.props.user._id);
        }
    }

    componentWillUpdate(nextProps, nextState) {
    }

    logout() {
        if (confirm("Souhaitez-vous vous déconnecter ?")) {
            this.props.actions.destroyMyGroup();
            localStorage.removeItem('token');
            this.props.actions_session.logout();
        }
    }

    updateTab(id) {

        this.setState({tab: id});
    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.tab !== this.state.tab)
            || (nextProps.user !== this.props.user)
        )
    }

    render() {
        var img = null;

        if (typeof this.props.user !== "undefined"
            && typeof this.props.user.media !== "undefined"
            && typeof this.props.user.media.file !== "undefined" && this.props.user.media.file !== "") {

            img = USER_IMAGES_PATH + this.props.user.media.file;
        }
        else if (typeof this.props.user !== "undefined"
            && typeof this.props.user.gender !== "undefined" && this.props.user.gender !== "") {
            if (this.props.user.gender == "male") {
                img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
            }
            else {
                img = PUBLIC_IMAGES_PATH + "composant/nobody_f.jpg";
            }
        }
        else {
            img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
        }


        var to_show = null;

        if (this.state.tab == 3) {
            to_show = <Mydata />;
        }
        return (
            <div id="myaccount">


                <div id="my-account-header">
                    <img id="img-profile" src={img}/>
                    <div id="titlegroup">
                        {(typeof this.props.user !== "undefined"
                        && typeof this.props.user.lastname !== "undefined"
                        && typeof this.props.user.firstname !== "undefined") &&
                        <h1><b>{this.props.user.firstname} {this.props.user.lastname}</b></h1>
                        }
                        <p className="info">Student - 2A</p>
                    </div>
                    <div id="icon-right">
                        <a id="logout" onClick={this.logout.bind(this)}>
                            <i className="font-logout"></i>
                        </a>
                    </div>
                    <div className="clear clearfix"></div>
                    <div id="tab-menu">
                        <a
                            onClick={this.updateTab.bind(this,1)}
                            className={(this.state.tab==1)?"tab-item active":"tab-item"}>
                            Mon activité
                        </a><a
                        onClick={this.updateTab.bind(this,2)}
                        className={(this.state.tab==2)?"tab-item active":"tab-item"}>
                        Mon groupe
                    </a>
                        <a onClick={this.updateTab.bind(this,3)}
                           className={(this.state.tab==3)?"tab-item active":"tab-item"}>
                            Mes informations personnelles
                        </a>

                        <a onClick={this.updateTab.bind(this,4)}
                           className={(this.state.tab==4)?"tab-item active":"tab-item"}>
                            Mes préferences
                        </a>
                    </div>
                </div>
                <div className="clear clearfix"></div>
                {to_show}

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

export default connect(mapStateToProps, mapDispatchToProps)(Myaccount);

