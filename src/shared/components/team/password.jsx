import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import { Link as ReactRouterLink} from 'react-router';


class Password extends React.Component {
    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfPassword = this.onChangeConfPassword.bind(this);
        this.state = {
            groupId: null,
            password: "",
            confPasswd: "",
            requestElement: false,
            userId: null,
            errorPwd: false,
            errorConfPwd: false,

        }


    }

    componentDidMount() {

        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;


        if (this.props.token !== null) {
            var data = {groupId: groupId, userId: userId, token: this.props.token};
            this.props.actions.retrievePwdGroup(data);

        }

        this.setState({
            groupId: groupId,
            userId: userId,
            requestElement: true,

        })
    }

    componentWillUpdate(nextProps, nextState) {


        var groupPassword = ( typeof nextProps.group.groupPassword !== "undefined" && nextProps.group.groupPassword !== "") ? nextProps.group.groupPassword : "";
        if (nextState.requestElement && groupPassword != "") {
            this.setState({
                password: groupPassword,
                requestElement: false,
            });


        }

    }

    componentWillUnmount() {
        this.props.actions.destroyPwdGroup();
    }

    saveForm() {
        var password = this.state.password;

        var canProced = false;
        if (password.length >= 3) {
            canProced = true;
        }

        if (canProced) {
            var data = {
                groupId: this.state.groupId,
                userId: this.state.userId,
                token: this.props.token,
                password: this.state.password.trim(),


            }
            this.props.actions.updatePwdGroup(data);
        }
    }

    onChangePassword(val) {

        this.setState({
            errorPwd: val.target.value.length < 3,
            password: val.target.value
        });
    }

    onChangeConfPassword(val) {
        this.setState({
            errorConfPwd: val.target.value.length < 3,
            confPasswd: val.target.value
        });
    }


    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.password !== this.state.password)
            || (nextState.confPasswd !== this.state.confPasswd)
            || (nextState.errorPwd !== this.state.errorPwd)
            || (nextState.errorConfPwd !== this.state.errorConfPwd)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
            || (nextState.requestElement !== this.state.requestElement)
            || (nextProps.user !== this.props.user)
            || (nextProps.textStatutPassword !== this.props.textStatutPassword)
            || (nextProps.textStatutErrorPassword !== this.props.textStatutErrorPassword)
        )
    }


    capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }


    render() {

        var pwdClass = (this.state.errorPwd) ? "form-control has-error error-input" : "has-success form-control";
        var confPwdClass = (this.state.errorConfPwd) ? "form-control has-error error-input" : "has-success form-control";


        return (
            <div id="Mydata" className="container-fluid">
                <div className="form-group row">
                    <div

                        className="col-md-8 col-md-push-2">
                        {typeof this.props.textStatutPassword !== "undefined" && this.props.textStatutPassword != "" &&
                        <p className='alert alert-success'>{this.props.textStatutPassword}</p>}

                        {typeof this.props.textStatutErrorPassword !== "undefined" && this.props.textStatutErrorPassword != "" &&
                        <p className='alert alert-info'>{this.props.textStatutErrorPassword}</p>}
                    </div>
                    {!this.props.loading && <form className="form  ">

                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-3 col-md-5 col-form-label">Mot de passe du groupe</label>
                            <div className="col-xs-9 col-md-7">
                                <input
                                    className={pwdClass} type="text"
                                    ref="name"
                                    onChange={this.onChangePassword.bind(this)}
                                    value={(this.state.password)}
                                />
                            </div>
                        </div>


                        <div className="clear clearfix"></div>
                        <div

                            className="col-md-6 col-md-push-3">
                            <a id="submit-form"
                               onClick={this.saveForm.bind(this)}
                               className="btn">Enregistrer</a>
                        </div>
                    </form>}
                </div>

                <div className="clear clearfix"></div>
            </div>


        );
    }
}
const mapStateToProps = (state) => ({
    group: state.group,
    textStatutPassword: state.group.textStatutPassword,
    textStatutErrorPassword: state.group.textStatutErrorPassword,
    user: state.session.user,
    loading: state.loadingBar,
    token: state.session.token,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);

