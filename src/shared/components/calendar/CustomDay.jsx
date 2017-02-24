import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import * as CalendarActions    from './../../actions/CalendarActions';
import { Link as ReactRouterLink} from 'react-router';

import DatePicker from 'react-datepicker';
import moment from 'moment';
class Days extends React.Component {
    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);

        this.handleChangeBirth = this.handleChangeBirth.bind(this);
        this.handleChangR1 = this.handleChangR1.bind(this);
        this.handleChangR2 = this.handleChangR2.bind(this);
        this.handleChangR3 = this.handleChangR3.bind(this);
        this.handleChangR4 = this.handleChangR4.bind(this);
        this.handleChangR5 = this.handleChangR5.bind(this);

        this.state = {
            groupId: null,
            userId: null,
            custom:false,
            date: moment(),
            r1: false,
            r2: false,
            r3: false,
            r4: false,
            r5: false,


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


        /*if (nextProps.params == null && groupId != null) {
         nextProps.actions_calendar.getCalendarParams(groupId);
         }*/


    }

    componentWillUnmount() {

    }


    handleChangeBirth(date) {
        this.setState({date: date});
    }

    handleChangR1(val) {
        this.setState({
            r1: !this.state.r1
        })

    }

    handleChangR2(val) {
        this.setState({
            r2: !this.state.r2
        })

    }

    handleChangR3(val) {
        this.setState({
            r3: !this.state.r3
        })

    }

    handleChangR4(val) {
        this.setState({
            r4: !this.state.r4
        })

    }

    handleChangR5(val) {
        this.setState({
            r5: !this.state.r5
        })

    }

    saveForm() {

        var data = {
            date: this.state.date,
            groupId: this.state.groupId,
            userId: this.state.userId,
            token: this.props.token,
            r1: this.state.r1,
            r2: this.state.r2,
            r3: this.state.r3,
            r4: this.state.r4,
            r5: this.state.r5,
        };

        if (this.state.groupId != null) {
            this.props.actions_calendar.addCalendarDayOff(data);
            this.props.addAction();
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
            || (nextState.added !== this.state.added)
            || (nextState.date !== this.state.date)
            || (nextState.r1 !== this.state.r1)
            || (nextState.r2 !== this.state.r2)
            || (nextState.r3 !== this.state.r3)
            || (nextState.r4 !== this.state.r4)
            || (nextState.custom !== this.state.custom)
            || (nextState.r5 !== this.state.r5)

            || (nextProps.user !== this.props.user)
        )
    }


    capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }


    render() {

        var nbr_personne_group = (typeof this.props.group.listUserGroup !== "undefined" ) ? this.props.group.listUserGroup.length : 1;
        return (
            <div id="Mydata" className="container-fluid">

                <div className="clear clearfix"></div>
                <div className="col-md-10 col-lg-8 col-md-push-1 col-lg-push-2">
                    <table className="table table-striped">
                        <tr>
                            <th className="text-center">Jour</th>
                            <th className="text-center" colSpan="5">Participant</th>
                            <th className="text-center"></th>
                        </tr>
                        <tr>
                            <td></td>
                            <th className="text-center">R1</th>
                            <th className="text-center">R2</th>
                            <th className="text-center">R3</th>
                            <th className="text-center">R4</th>
                            <th className="text-center">R5</th>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="text-center">
                                <DatePicker
                                    className="form-control"
                                    locale="fr-fr"
                                    showYearDropdown
                                    minDate={moment()}
                                    dateFormatCalendar="MMMM"
                                    selected={this.state.date}
                                    onChange={this.handleChangeBirth.bind(this)}/></td>
                            <td className="text-center"><input type="checkbox" checked={this.state.r1}
                                                               onChange={this.handleChangR1.bind(this)}/></td>
                            <td className="text-center"><input type="checkbox" checked={this.state.r2}
                                                               onChange={this.handleChangR2.bind(this)}/></td>
                            <td className="text-center"><input type="checkbox" checked={this.state.r3}
                                                               onChange={this.handleChangR3.bind(this)}/></td>
                            <td className="text-center"><input type="checkbox" checked={this.state.r4}
                                                               onChange={this.handleChangR4.bind(this)}/></td>
                            <td className="text-center"><input type="checkbox" checked={this.state.r5}
                                                               onChange={this.handleChangR5.bind(this)}/></td>

                            <td className="text-center"><a onClick={this.saveForm.bind(this)}
                                                           id="save-jour">Enregister</a></td>
                        </tr>

                    </table>
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
    params: state.calendar.params,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
    actions_calendar: bindActionCreators(CalendarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Days);

