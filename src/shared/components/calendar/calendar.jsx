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
import {PUBLIC_IMAGES_PATH} from './../../constants/DefaultConstants';
import RetinaImage from 'react-retina-image';

import  Parametres from "./Parametres";
import  AddCalendar from "./AddCalendar";
import  Days from "./Days";
class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.updateTab = this.updateTab.bind(this);
        this.state = {
            tab: 1
        }
    }

    updateTab(id) {


        this.setState({

            tab: id
        });

    }


    componentDidMount() {

        if (!this.props.loading && typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined" && this.props.user._id != null) {
            this.props.actions.getMyGroup(this.props.user._id);
        }

        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;
        if (this.props.params == null && groupId != null) {
            this.props.actions_calendar.getCalendarParams(groupId);
        }
        if (this.props.list_days_off == null && groupId != null) {
            this.props.actions_calendar.getCalendarDayOff(groupId);
        }

    }

    componentWillUpdate(nextProps, nextState) {
        var groupId = (typeof nextProps.group.group !== "undefined" && typeof nextProps.group.group.id !== "undefined") ? nextProps.group.group.id : null;

        if (!nextProps.loading && nextProps.params == null && groupId != null) {
            nextProps.actions_calendar.getCalendarParams(groupId);
        }
        if (!nextProps.loading && nextProps.list_days_off == null && groupId != null) {

            nextProps.actions_calendar.getCalendarDayOff(groupId);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.params !== this.props.params)
            || (nextProps.list_days_off !== this.props.list_days_off)
            || (nextProps.user !== this.props.user)
            || (nextState.tab !== this.state.tab)
        )
    }

    render() {


        var to_show = null;

        if (this.state.tab == 1 && this.props.params != null) {
            to_show = <h1>Home</h1>
        }
        if (this.state.tab == 2 && this.props.params != null) {
            to_show = <Parametres list_params={this.props.params}/>
        }

        if (this.state.tab == 3 && this.props.list_days_off != null) {
            to_show = <Days list_days_off={this.props.list_days_off}/>
        }
        if (this.state.tab == 4 && this.props.list_days_off != null) {
            to_show = <AddCalendar updateTab={this.updateTab.bind(this)}/>
        }

        return (

            <div id="team">

                <div id="my-account-header">
                    <div id="icon-right">

                        <a id="add" onClick={this.updateTab.bind(this, 4)}>
                            <i className="font-add-simple"></i>
                        </a>


                    </div>
                    <div className="clear clearfix"></div>
                    <div id="tab-menu">
                        <a
                            onClick={this.updateTab.bind(this, 1)}
                            className={(this.state.tab != 2 && this.state.tab != 3) ? "tab-item active" : "tab-item"}>
                            Calendrier
                        </a><a
                        onClick={this.updateTab.bind(this, 2)}
                        className={(this.state.tab == 2) ? "tab-item active" : "tab-item"}>
                        Paramétres
                    </a><a
                        onClick={this.updateTab.bind(this, 3)}
                        className={(this.state.tab == 3) ? "tab-item active" : "tab-item"}>
                        Jours fériés
                    </a>

                    </div>
                    <div className="clear clearfix"></div>
                </div>
                {to_show}
            </div>
        )

    }
}
const mapStateToProps = (state) => ({
    group: state.group,
    user: state.session.user,
    loading: state.loadingBar,
    token: state.session.token,
    params: state.calendar.params,
    list_days_off: state.calendar.list_days_off,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_calendar: bindActionCreators(CalendarActions, dispatch),

    actions_session: bindActionCreators(SessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
