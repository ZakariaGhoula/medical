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
import BigCalendar from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AddCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: null,
            step: 2,

            userId: null,
            date_start: moment(),
            date_end: moment()
        }

        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
        this.handleStep = this.handleStep.bind(this);
        moment.locale('fr');
        BigCalendar.momentLocalizer(moment);
    }

    componentDidMount() {

        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;

        this.props.actions_calendar.getOneCalendar("58a1fe1d47bd821e53be9eed", "585ad260d035669bbf19c28b");

        this.setState({
            groupId: groupId,
            userId: userId,
        })
        console.log(moment.locale());

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


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.calendar !== this.props.calendar)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
            || (nextState.date_start !== this.state.date_start)
            || (nextState.date_end !== this.state.date_end)
            || (nextState.step !== this.state.step)

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

        if (step == 2 && this.state.start_end !== this.state.date_start) {


            var data = {groupId: this.state.groupId, start_date: this.state.start_date, start_end: this.state.start_end}
            this.props.actions_calendar.createCalendar(data);
        }
        this.setState({step: step});
    }


    render() {

        let formats = {

            weekdayFormat: "dddd",


        }

        const events = [

            {
                'title': 'Conference',
                'start': new Date(2017, 0, 11),
                'end': new Date(2017, 1, 11),
                desc: 'Big conference for important people'
            }
        ];
        var date_start = null;
        var cal = null;
        if (typeof this.props.calendar !== "undefined" && typeof this.props.calendar[0] !== "undefined") {
            console.log();
            console.log(new Date(2017, 0, 1));
            date_start = new Date(moment(this.props.calendar[0].date_start).toDate());
            cal = <BigCalendar
                formats={formats}
                id="add_calendar"
                selectable
                toolbar={false}
                events={events}
                defaultView='month'
                views={["month"]}

                defaultDate={ date_start}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={(slotInfo) => alert(
                    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                    `\nend: ${slotInfo.end.toLocaleString()}`
                )}

            />;
        }
        return (
            <div id="Mydata" className="container-fluid">
                {this.state.step == 2 && date_start !== null && typeof this.props.calendar !== "undefined" && typeof this.props.calendar[0] !== "undefined" &&
                <div className="col-md-12">
                    <h1 id="date_h1" className="text-center">Du {(moment(this.props.calendar[0].date_start).format("DD/MM/YYYY"))} au {(moment(this.props.calendar[0].date_end).format("DD/MM/YYYY"))}</h1>
                    <div className="clear clearfix"></div>
                    {cal}    <div className="clear clearfix"></div></div>}
                {this.state.step == 1 && <div className="form-group row">


                    <div className="col-md-6 col-input">
                        <label className="col-xs-3 col-md-3 col-form-label">Date de début</label>
                        <div className="col-xs-9 col-md-7">
                            <DatePicker
                                className="form-control"
                                locale="fr-fr"
                                selectsStart
                                showYearDropdown
                                minDate={moment()}
                                dateFormatCalendar="MMMM"
                                selected={this.state.date_start}
                                startDate={this.state.date_start}
                                endDate={this.state.date_end}
                                onChange={this.handleChangeDateStart.bind(this)}/>

                        </div>
                    </div>
                    <div className="col-md-6 col-input">
                        <label className="col-xs-3 col-md-3 col-form-label">Date de fin</label>
                        <div className="col-xs-9 col-md-7">
                            <DatePicker
                                className="form-control"
                                locale="fr-fr"
                                showYearDropdown
                                minDate={moment()}
                                dateFormatCalendar="MMMM"
                                selectsEnd
                                selected={this.state.date_end}
                                startDate={this.state.date_start}
                                endDate={this.state.date_end}
                                onChange={this.handleChangeDateEnd.bind(this)}/>

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

