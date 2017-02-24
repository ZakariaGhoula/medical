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
import CustomDay from './CustomDay';
import CustomReadDay from './CustomReadDay';
import DatePicker from 'react-datepicker';
import moment from 'moment';
class Days extends React.Component {
    constructor(props) {
        super(props);
        this.addDay = this.addDay.bind(this);

        this.state = {
            groupId: null,
            userId: null,
            added: false,


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


    addDay() {
        this.setState({
            added: !this.state.added
        })

    }

    saveForm() {


    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.list_days_off !== this.props.list_days_off)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
            || (nextState.added !== this.state.added)


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
                <div

                    className="col-md-12 text-center">
                    <a id="add-jour"
                       onClick={this.addDay.bind(this)}
                       className="btn">Ajouter un jour</a>
                </div>
                {this.state.added && <CustomDay addAction={this.addDay.bind(this)}/>}

                {this.props.list_days_off != null &&
                <div style={{marginTop:15}} className="col-md-10 col-lg-8 col-md-push-1 col-lg-push-2">
                    <table className="table table-striped">
                        <tr>
                            <th className="text-center">Jours</th>
                            <th className="text-center" colSpan="5">Participants</th>
                            <th className="text-center">Modifier</th>
                            <th className="text-center">Supprimer</th>

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
                        {this.props.list_days_off.map(function (day, i) {
                            return (
                                <CustomReadDay key={i} val_day={day}/>
                            )
                        })}


                    </table>
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
    params: state.calendar.params,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
    actions_calendar: bindActionCreators(CalendarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Days);

