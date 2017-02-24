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


        this.customElem = this.customElem.bind(this);
        this.deleteElem = this.deleteElem.bind(this);
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
            custom: false,
            date: (this.props.val_day != null && typeof this.props.val_day.date !== "undefined") ? moment((this.props.val_day.date)) : moment(),
            r1: (this.props.val_day != null && typeof this.props.val_day.r1 !== "undefined") ? this.props.val_day.r1 : false,
            r2: (this.props.val_day != null && typeof this.props.val_day.r2 !== "undefined") ? this.props.val_day.r2 : false,
            r3: (this.props.val_day != null && typeof this.props.val_day.r3 !== "undefined") ? this.props.val_day.r3 : false,
            r4: (this.props.val_day != null && typeof this.props.val_day.r4 !== "undefined") ? this.props.val_day.r4 : false,
            r5: (this.props.val_day != null && typeof this.props.val_day.r5 !== "undefined") ? this.props.val_day.r5 : false,


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

    deleteElem() {
        if (confirm("êtes vous sûr de vouloir supprimer cette date ?")) {
            var data = {
                date: this.state.date,
                _id: this.props.val_day._id,
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
                this.props.actions_calendar.deleteCalendarDayOff(data);

            }


        }
        //
    }


    customElem() {
        this.setState({custom: !this.state.custom});
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
            _id: this.props.val_day._id,
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
            this.props.actions_calendar.updateCalendarDayOff(data);
            this.customElem();
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
            || (nextState.added !== this.state.added)
            || (nextState.date !== this.state.date)
            || (nextState.custom !== this.state.custom)
            || (nextState.r1 !== this.state.r1)
            || (nextState.r2 !== this.state.r2)
            || (nextState.r3 !== this.state.r3)
            || (nextState.r4 !== this.state.r4)
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


            <tr>
                <td className="text-center">
                    {this.state.custom && <DatePicker
                        className="form-control"
                        locale="fr-fr"
                        showYearDropdown
                        minDate={moment()}
                        dateFormatCalendar="MMMM"
                        selected={this.state.date}
                        onChange={this.handleChangeBirth.bind(this)}/>
                    }
                    {!this.state.custom && <p>{moment(this.state.date).format("DD/MM/YYYY")}</p>}
                </td>
                <td className="text-center">

                    {this.state.custom && <input type="checkbox" checked={this.state.r1}
                                                 onChange={this.handleChangR1.bind(this)}/>}

                    {!this.state.custom &&
                    <p>{(this.state.r1) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}</p>}
                </td>
                <td className="text-center">

                    {this.state.custom && <input type="checkbox" checked={this.state.r2}
                                                 onChange={this.handleChangR2.bind(this)}/>}
                    {!this.state.custom &&
                    <p>{(this.state.r2) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}</p>}
                </td>
                <td className="text-center">
                    {this.state.custom && <input type="checkbox" checked={this.state.r3}
                                                 onChange={this.handleChangR3.bind(this)}/>}
                    {!this.state.custom &&
                    <p>{(this.state.r3) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}</p>}
                </td>
                <td className="text-center">
                    {this.state.custom && <input type="checkbox" checked={this.state.r4}
                                                 onChange={this.handleChangR4.bind(this)}/>}
                    {!this.state.custom &&
                    <p>{(this.state.r4) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}</p>}
                </td>
                <td className="text-center">
                    {this.state.custom && <input type="checkbox" checked={this.state.r5}
                                                 onChange={this.handleChangR5.bind(this)}/>}
                    {!this.state.custom &&
                    <p>{(this.state.r5) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}</p>}
                </td>

                <td className="text-center">

                    {this.state.custom && <a onClick={this.saveForm.bind(this)}
                                             style={{color:"#019875",cursor:"pointer"}}><i
                        className="fa fa-floppy-o"></i></a>
                    }
                    {!this.state.custom && <a style={{color:"#333",cursor:"pointer"}}
                                              onClick={this.customElem.bind(this)}
                    ><i className="fa fa-cog" aria-hidden="true"></i></a>}
                </td>
                <td className="text-center">


                    {!this.state.custom && <a style={{color:"#333",cursor:"pointer"}}
                                              onClick={this.deleteElem.bind(this)}
                    ><i className="fa fa-trash" aria-hidden="true"></i></a>}
                </td>
            </tr>




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

