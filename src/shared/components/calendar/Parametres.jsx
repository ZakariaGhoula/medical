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
class Parametres extends React.Component {
    constructor(props) {
        super(props);
        this.changeNbrPersonneGarde = this.changeNbrPersonneGarde.bind(this);
        this.changeNbrRepos = this.changeNbrRepos.bind(this);
        this.handleChangeBirth = this.handleChangeBirth.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.handleChangR12 = this.handleChangR12.bind(this);
        this.handleChangR13 = this.handleChangR13.bind(this);
        this.handleChangR14 = this.handleChangR14.bind(this);
        this.handleChangR15 = this.handleChangR15.bind(this);

        this.handleChangR23 = this.handleChangR23.bind(this);
        this.handleChangR24 = this.handleChangR24.bind(this);
        this.handleChangR25 = this.handleChangR25.bind(this);
        this.handleChangR34 = this.handleChangR34.bind(this);
        this.handleChangR35 = this.handleChangR35.bind(this);
        this.handleChangR45 = this.handleChangR45.bind(this);


        console.log(this.props.list_params);
        this.state = {
            groupId: null,
            userId: null,
            nbr_repos:  (this.props.list_params != null && typeof this.props.list_params.nbr_day_off !== "undefined") ? this.props.list_params.nbr_day_off : 0,
            nbr_personne_garde: (this.props.list_params != null && typeof this.props.list_params.nbr_by_watch !== "undefined") ? this.props.list_params.nbr_by_watch : 1,
            date: (this.props.list_params != null && typeof this.props.list_params.length_hour_watch !== "undefined") ? this.props.list_params.length_hour_watch : 12,

            r1_2: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r1_2 : false,
            r1_3: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r1_3 : false,
            r1_4: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r1_4 : false,
            r1_5: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r1_5 : false,

            r2_3: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r2_3 : false,
            r2_4: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r2_4 : false,

            r2_5:  (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r2_5 : false,

            r3_4: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r3_4 : false,
            r3_5: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r3_5 : false,

            r4_5: (this.props.list_params != null && typeof this.props.list_params.levelCross !== "undefined") ? this.props.list_params.levelCross.r4_5 : false,


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

    changeNbrRepos(val) {
        this.setState({
            nbr_repos: val.target.value
        })
    }

    changeNbrPersonneGarde(val) {
        this.setState({
            nbr_personne_garde: val.target.value
        })
    }

    handleChangeBirth(val) {
        this.setState({
            date: val.target.value
        })
    }


    handleChangR12(val) {
        this.setState({
            r1_2: !this.state.r1_2
        })

    }

    handleChangR13(val) {

        this.setState({
            r1_3: !this.state.r1_3
        })

    }

    handleChangR14(val) {

        this.setState({
            r1_4: !this.state.r1_4
        })

    }

    handleChangR15(val) {

        this.setState({
            r1_5: !this.state.r1_5
        })

    }

    handleChangR23(val) {
        this.setState({
            r2_3: !this.state.r2_3
        })

    }

    handleChangR24(val) {

        this.setState({
            r2_4: !this.state.r2_4
        })

    }

    handleChangR25(val) {

        this.setState({
            r2_5: !this.state.r2_5
        })

    }

    handleChangR34(val) {

        this.setState({
            r3_4: !this.state.r3_4
        })

    }

    handleChangR35(val) {

        this.setState({
            r3_5: !this.state.r3_5
        })

    }

    handleChangR45(val) {

        this.setState({
            r4_5: !this.state.r4_5
        })

    }

    saveForm() {


        var r1 = {};
        if (this.state.r1_2) {
        }
        var data_croissement = {
            r1_2: this.state.r1_2,
            r1_3: this.state.r1_3,
            r1_4: this.state.r1_4,
            r1_5: this.state.r1_5,
            r2_3: this.state.r2_3,
            r2_4: this.state.r2_4,
            r2_5: this.state.r2_5,
            r3_4: this.state.r3_4,
            r3_5: this.state.r3_5,
            r4_5: this.state.r4_5,

        };


        var final_data = {
            groupId: this.state.groupId,
            userId: this.state.userId,
            token: this.props.token,
            levelCross: data_croissement,
            nbr_day_off: parseInt(this.state.nbr_repos),
            nbr_by_watch: parseInt(this.state.nbr_personne_garde),
            length_hour_watch: parseInt(this.state.date),
        }

        if (this.state.groupId != null)
            this.props.actions_calendar.updateCalendarParams(final_data);
    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
            || (nextState.nbr_personne_garde !== this.state.nbr_personne_garde)
            || (nextState.nbr_repos !== this.state.nbr_repos)
            || (nextState.date !== this.state.date)
            || (nextState.r1_2 !== this.state.r1_2)
            || (nextState.r1_3 !== this.state.r1_3)
            || (nextState.r1_4 !== this.state.r1_4)
            || (nextState.r1_5 !== this.state.r1_5)
            || (nextState.r2_3 !== this.state.r2_3)
            || (nextState.r2_4 !== this.state.r2_4)
            || (nextState.r2_5 !== this.state.r2_5)
            || (nextState.r3_4 !== this.state.r3_4)
            || (nextState.r3_5 !== this.state.r3_5)
            || (nextState.r4_5 !== this.state.r4_5)

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
                <div className="form-group row">
                    <div

                        className="col-md-8 col-md-push-2">

                    </div>
                    <form className="form  ">

                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-3 col-md-5 col-form-label">Nbr de jour de repos</label>
                            <div className="col-xs-9 col-md-7">
                                <input
                                    className={"form-control"} type="number"
                                    ref="number"
                                    onChange={this.changeNbrRepos.bind(this)}
                                    value={(this.state.nbr_repos)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-3 col-md-5 col-form-label">Nbr de personne par garde</label>
                            <div className="col-xs-9 col-md-7">
                                <input
                                    className={"form-control"} type="number"
                                    ref="number"
                                    min="1"
                                    max={nbr_personne_group}
                                    onChange={this.changeNbrPersonneGarde.bind(this)}
                                    value={(this.state.nbr_personne_garde)}
                                />
                            </div>
                        </div>


                        <div className="clear clearfix"></div>

                        <div className="clear clearfix"></div>
                        <div className="col-md-12 col-input">
                            <label className="col-xs-12 col-md-12 col-form-label">Croisement</label>
                            <div className="col-xs-12 ">
                                <table className="table table-striped">
                                    <tr>
                                        <th></th>
                                        <th>R1</th>
                                        <th>R2</th>
                                        <th>R3</th>
                                        <th>R4</th>
                                        <th>R5</th>
                                    </tr>
                                    <tr>
                                        <td>R1</td>
                                        <td></td>
                                        <td><input type="checkbox" checked={this.state.r1_2}
                                                   onChange={this.handleChangR12.bind(this)}/></td>
                                        <td><input type="checkbox" checked={this.state.r1_3}
                                                   onChange={this.handleChangR13.bind(this)}/></td>
                                        <td><input type="checkbox"
                                                   checked={this.state.r1_4}
                                                   onChange={this.handleChangR14.bind(this)}
                                        /></td>
                                        <td><input type="checkbox"

                                                   checked={this.state.r1_5}
                                                   onChange={this.handleChangR15.bind(this)}/></td>

                                    </tr>
                                    <tr>
                                        <td>R2</td>
                                        <td><input   checked={this.state.r1_2}
                                                   onChange={this.handleChangR12.bind(this)}
                                                   type="checkbox"/></td>
                                        <td></td>
                                        <td><input
                                            checked={this.state.r2_3}
                                            onChange={this.handleChangR23.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input
                                            checked={this.state.r2_4}
                                            onChange={this.handleChangR24.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input type="checkbox"
                                                   checked={this.state.r2_5}
                                                   onChange={this.handleChangR25.bind(this)}
                                        /></td>
                                    </tr>
                                    <tr>
                                        <td>R3</td>
                                        <td><input

                                            checked={this.state.r1_3}
                                            onChange={this.handleChangR13.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input
                                            checked={this.state.r2_3}
                                            onChange={this.handleChangR23.bind(this)}
                                            type="checkbox"/></td>
                                        <td></td>
                                        <td><input
                                            checked={this.state.r3_4}
                                            onChange={this.handleChangR34.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input
                                            checked={this.state.r3_5}
                                            onChange={this.handleChangR35.bind(this)}
                                            type="checkbox"/></td>
                                    </tr>
                                    <tr>
                                        <td>R4</td>
                                        <td><input
                                            checked={this.state.r1_4}
                                            onChange={this.handleChangR14.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input
                                            checked={this.state.r2_4}
                                            onChange={this.handleChangR24.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input
                                            checked={this.state.r3_4}
                                            onChange={this.handleChangR34.bind(this)}
                                            type="checkbox"/></td>
                                        <td></td>
                                        <td><input
                                            checked={this.state.r4_5}
                                            onChange={this.handleChangR45.bind(this)}
                                            type="checkbox"/></td>
                                    </tr>
                                    <tr>
                                        <td>R5</td>
                                        <td><input
                                            checked={this.state.r1_5}
                                            onChange={this.handleChangR15.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input

                                            checked={this.state.r2_5}
                                            onChange={this.handleChangR25.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input
                                            checked={this.state.r3_5}
                                            onChange={this.handleChangR35.bind(this)}
                                            type="checkbox"/></td>
                                        <td><input
                                            checked={this.state.r4_5}
                                            onChange={this.handleChangR45.bind(this)}
                                            type="checkbox"/></td>
                                        <td></td>
                                    </tr>
                                </table>

                            </div>
                        </div>

                        <div className="clear clearfix"></div>
                        <div

                            className="col-md-6 col-md-push-3">
                            <a id="submit-form"
                               onClick={this.saveForm.bind(this)}
                               className="btn">Enregistrer</a>
                        </div>


                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Parametres);

