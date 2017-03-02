import React                  from 'react';
import {bindActionCreators} from 'redux';
import ReactDOM               from 'react-dom';

import {pushState, replaceState} from 'redux-router';
import HTML5Backend from 'react-dnd-html5-backend';
import {Router} from 'react-router';
import {connect}            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import * as CalendarActions    from './../../actions/CalendarActions';
import {Link as ReactRouterLink} from 'react-router';
import BigCalendar from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CustomItemModal from './CustomItemModal';
import _ from 'lodash';
import {DragDropContext} from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

import SkyLight from 'react-skylight';
class AddCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: null,
            step: 1,
            initialUser: null,
            finalUser: null,
            userId: null,
            event: null,
            date_start: moment(),
            monthSelect: moment(),
            date_end: moment()
        }

        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
        this.moveEvent = this.moveEvent.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleStep = this.handleStep.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.validate = this.validate.bind(this);
        moment.locale('fr');
        BigCalendar.momentLocalizer(moment);
    }

    componentDidMount() {

        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;

        //this.props.actions_calendar.getOneCalendar("58a1fe1d47bd821e53be9eed", "585ad260d035669bbf19c28b");
        this.props.actions.getMyGroup(this.props.user._id);
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


        if (nextProps.calendar !== this.props.calendar && nextProps.calendar !=null && typeof nextProps.calendar.calendar !== "undefined" && typeof nextProps.calendar.calendar.dispatch !== "undefined" && nextProps.calendar.calendar.dispatch.length > 0) {
            this.setState({
                initialUser: nextProps.calendar.calendar.dispatch,
                finalUser: nextProps.calendar.calendar.dispatch,
            })
        }

    }

    componentWillUnmount() {

    }

    validate() {

        var data = {
            groupId: this.state.groupId,
            calId: this.props.calendar.calendar._id,
            dispatch: this.state.finalUser,
            is_active: true
        }
        this.props.actions_calendar.updateCalendar(data);
        this.props.updateTab(1);


    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.calendar !== this.props.calendar)
            || (nextProps.params !== this.props.params)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.initialUser !== this.state.initialUser)
            || (nextState.finalUser !== this.state.finalUser)
            || (nextState.userId !== this.state.userId)
            || (nextState.date_start !== this.state.date_start)
            || (nextState.date_end !== this.state.date_end)
            || (nextState.step !== this.state.step)
            || (nextState.event !== this.state.event)
            || (nextState.monthSelect !== this.state.monthSelect)

            || (nextProps.user !== this.props.user)
        )
    }


    capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }

    handleChangeDateStart(date) {
        this.setState({date_start: date});
    }

    handleChangeDateEnd(date) {
        this.setState({date_end: date});
    }

    handleStep(step) {

        if (step == 2 && this.state.date_end !== this.state.date_start) {


            var data = {
                groupId: this.state.groupId,
                start_date: moment(this.state.monthSelect).add('days', 1).format(),
                end_date: moment(this.state.monthSelect).add('months', 1).date(1).format()
            }
            this.props.actions_calendar.createCalendar(data);
        }
        this.setState({step: step});
    }

    moveEvent({event, start, end}) {
        const {finalUser} = this.state;

        const idx = finalUser.indexOf(event);
        const updatedEvent = {...event, start, end};

        const nextEvents = [...finalUser]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            finalUser: nextEvents
        })

        alert(`${event.title} was dropped onto ${event.start}`);
    }


    openModal(events) {
        this.setState({event: events})
        this.refs.dialogWithCallBacks.show()
    }


    changeUser(e) {

        this.refs.dialogWithCallBacks.hide()
        if (this.state.finalUser !== null && typeof this.state.finalUser !== "undefined" && this.state.finalUser.length > 0) {
            var new_array_selected = Array.from(this.state.finalUser);
            new_array_selected[e.id_el]['user']['userId_' + parseInt(e.pos_el + 1)] = e.id_user;
            new_array_selected[e.id_el]['user']['level_' + parseInt(e.pos_el + 1)] = e.level;
            var final_array = Array.from(new_array_selected);
            this.setState({
                finalUser: final_array
            })
        } else {
            alert("Une erreur s'est produite");
        }


    }

    changeMonth(e) {

        this.setState({monthSelect: moment(e.target.value)})
    }

    render() {
        var events = [];
        var date_start = null;
        var cal = null;

        if (this.state.step == 2 && typeof this.props.calendar !== "undefined"  &&  this.props.calendar != null && typeof this.props.calendar.calendar !== "undefined" && this.props.calendar != null) {
            const colors = ['#34495e', '#FF736A', '#50A8FF', '#BBCC2C', "#345E35"];

            let formats = {

                weekdayFormat: "dddd",


            }


            if (this.props.group !== null && typeof  this.props.group.listUserGroup !== "undefined"
                && this.props.group.listUserGroup !== null && this.state.finalUser !== null && typeof this.state.finalUser !== "undefined"
            ) {
                if (this.state.finalUser.length > 0
                    && typeof this.props.params !== "undefined") {
                    this.state.finalUser.map(function (obj, j) {
                        for (var i = 0; i < this.props.params.nbr_by_watch; i++) {

                            //--recup valeur user dans le group par id
                            var real_user = _.find(this.props.group.listUserGroup, function (o) {
                                return o._id === obj.user["userId_" + parseInt(i + 1)];
                            });


                            if (typeof real_user !== "undefined" && real_user != null) {
                                var data = {
                                    'title': real_user.firstname + " " + real_user.lastname,
                                    "start": new Date(moment(obj.date_day).subtract(1, "day").clone().startOf('day').toDate()),
                                    "end": new Date(moment(obj.date_day).subtract(1, "day").clone().startOf('day').toDate()),
                                    "desc": real_user.email,
                                    "id": j,
                                    "pos": i,
                                    "level": obj.user["level_" + parseInt(i + 1)],
                                    "user_id": obj.user["userId_" + parseInt(i + 1)],
                                    "color": colors[i]
                                };
                                events.push(data);
                            }
                        }

                    }, this);
                }


                date_start = new Date(moment(this.props.calendar.calendar.date_start).toDate());
                cal = <BigCalendar
                    formats={formats}
                    id="add_calendar"
                    toolbar={false}
                    events={events}
                    defaultView='month'
                    views={["month"]}
                    components={{
                        event: Event,
                        agenda: {
                            event: EventAgenda
                        }
                    }}
                    defaultDate={ date_start}
                    onSelectEvent={event => this.openModal(event)}


                />;
            }
        }


        if (this.state.step == 1) {
            var dates = [];


            var currDate = moment().subtract('months', 1).clone().startOf('day');

            var lastDate = moment().add('years', 1).clone().startOf('day');

            while (currDate.add('months', 1).diff(lastDate) <= 0) {
                //console.log(currDate.toDate());
                dates.push(currDate.clone().toDate());
            }

        }

        return (
            <div id="Mydata" className="container-fluid">
                {this.state.step == 2 && date_start !== null && typeof this.props.calendar !== "undefined" &&  this.props.calendar != null && typeof this.props.calendar.calendar !== "undefined" && this.props.calendar != null &&
                <div className="col-md-12">
                    <h1 id="date_h1" className="text-center">
                        Du {(moment(this.props.calendar.calendar.date_start).format("DD/MM/YYYY"))}
                        au {(moment(this.props.calendar.calendar.date_end).format("DD/MM/YYYY"))}</h1>
                    <div className="clear clearfix"></div>
                    <div

                        className="col-md-4 col-md-push-8 text-right text-center">
                        <a id="submit-form"
                           onClick={this.validate.bind(this)}
                           className="btn">Terminer</a>
                    </div>

                    <div className="clear clearfix"></div>
                    {cal}
                    <div className="clear clearfix"></div>
                </div>}
                {this.state.step == 1 && <div className="form-group row">

                    <div className="col-md-6 col-input">
                        <label className="col-xs-3 col-md-3 col-form-label">Mois</label>
                        <div className="col-xs-9 col-md-7">

                            <select className="form-control" onChange={this.changeMonth.bind(this)}
                                    value={ (this.state.monthSelect.startOf('day').toDate())}
                                    defaultValue={ (this.state.monthSelect.startOf('day').toDate())}>
                                {dates.map(function (d, i) {
                                    return (
                                        <option value={moment.utc(d).toDate()}
                                                key={i}>{moment(d).format("MMMM YYYY")}</option>)
                                }, this)}
                            </select>


                        </div>
                    </div>

                    <div className="clear clearfix"></div>
                    <div

                        className="col-md-12 text-center">
                        <a id="submit-form"
                           onClick={this.handleStep.bind(this, 2)}
                           className="btn">Suivant</a>
                    </div>

                </div>}
                <SkyLight

                    ref="dialogWithCallBacks">{this.state.event !== null &&
                <CustomItemModal event={this.state.event} listEvents={this.state.finalUser}
                                 users={this.props.group.listUserGroup}
                                 changeUser={this.changeUser.bind(this)}

                />}</SkyLight>
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
    calendar: state.calendar.calendar
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
    actions_calendar: bindActionCreators(CalendarActions, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddCalendar);

function Event({event}) {
    return (
        <div style={{backgroundColor: event.color, padding: 10}}>
            <strong>
                {event.title}
            </strong>
            <br/> { event.desc && ('  ' + event.desc)}
        </div>
    )
}

function EventAgenda({event}) {
    return <span>
    <em style={{color: 'green'}}>{event.title}</em>
    <p>{ event.desc }</p>
  </span>
}