import React                  from 'react';
import {bindActionCreators} from 'redux';
import ReactDOM               from 'react-dom';

import {pushState, replaceState} from 'redux-router';

import {Router} from 'react-router';
import {connect}            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import * as CalendarActions    from './../../actions/CalendarActions';
import {Link as ReactRouterLink} from 'react-router';
import CustomDay from './CustomDay';
import CustomReadDay from './CustomReadDay';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import moment from 'moment';
class CustomItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.changeUser = this.changeUser.bind(this);
        this.saveData = this.saveData.bind(this);


        this.state = {
            groupId: null,
            userId: null,
            added: false,
            userSelected: this.props.event.user_id,


        }

    }

    componentDidMount() {

        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;


        this.setState({
            groupId: groupId,
            userId: userId,
        })


    }

    componentWillUpdate(nextProps, nextState) {
        var groupId = (typeof nextProps.group.group !== "undefined" && typeof nextProps.group.group.id !== "undefined") ? nextProps.group.group.id : null;
        var userId = (typeof nextProps.user !== "undefined" && typeof nextProps.user._id !== "undefined") ? nextProps.user._id : null;


        this.setState({
            groupId: groupId,
            userId: userId,
        })
    }

    componentWillUnmount() {

    }


    changeUser(e) {
        this.setState({userSelected: e.target.value});
    }

    saveData() {
        var id = this.state.userSelected;
        var real_user = _.find(this.props.group.listUserGroup, function (o) {
            return o._id === id;
        }, this);
        var e = {}
        e['date_day'] = moment(this.props.event.start).subtract(1, "day").clone().startOf('day').format()
        e['id_el'] = this.props.event.id;
        e['pos_el'] = this.props.event.pos;
        e['id_user'] = this.state.userSelected;
        e['level'] = real_user.level;
        this.props.changeUser(e);

    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.list_days_off !== this.props.list_days_off)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
            || (nextState.userSelected !== this.state.userSelected)


            || (nextProps.user !== this.props.user)
        )
    }


    capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }


    render() {
        return (
            <div id="Mydata" className="container-fluid">

                <h1 className="page-header">Modifier l'utilisateur </h1>
                <div className="row">
                    <label className="col-md-2">Date :</label>
                    <div className="form-group col-md-6">
                        <h4>{moment(this.props.event.start).format("DD/MM/YYYY")}</h4>
                        <br/>
                    </div>
                    <div className="clear clearfix"></div>

                    <label className="col-md-2">Utilisateur :</label>
                    <div className="form-group col-md-6">
                        <select className="form-control" onChange={this.changeUser.bind(this)}
                                value={this.state.userSelected} defaultValue={this.props.event.user_id}>
                            {this.props.users.map(function (user, i) {

                                return (
                                    <option key={i} value={user._id}>{user.lastname + " " + user.firstname}</option>)
                            }, this)}

                        </select>
                    </div>
                    <div className="clear clearfix"></div>
                    <div className="col-md-12 text-center">
                        <a id="submit-form" className="btn" onClick={this.saveData.bind(this)}>Enregistrer</a>
                    </div>

                </div>
            </div>


        );
    }
}
const mapStateToProps = (state) => ({
    group: state.group,
    user: state.session.user,
    loading: state.loadingBar,
    token: state.session.token,
    params: state.calendar.params,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
    actions_calendar: bindActionCreators(CalendarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomItemModal);

