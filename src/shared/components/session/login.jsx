import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as SessionActions    from './../../actions/SessionActions';
import { Link as ReactRouterLink} from 'react-router';
import { PUBLIC_IMAGES_PATH} from './../../constants/DefaultConstants';
import RetinaImage from 'react-retina-image';
import Input          from './components/Input';
import Icon          from './components/Icon';
import _                      from 'underscore';
import parseQueryString     from '../../utils/String';
import LoadingBar from 'react-redux-loading-bar'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        var redirectRoute = this.props.route.success;
        if (this.props.location.search != "") {
            var queryString = this.props.location.search;
            queryString = queryString.substring(1).split("&amp;");
            var l = queryString.length
            // Convert the array of strings into an object
            for (var i = 0; i < l; i++) {
                var temp = queryString[i].split('=');
                if (temp[0] == "next")
                    redirectRoute = temp[1];
            }


        }

        this.state = {
            email: '',
            password: '',
            showEmailError: false,
            redirectTo: (typeof redirectRoute!=="undefined")?redirectRoute:"/",
            content_translate: null

        };
    }

    componentDidMount() {

        if ((this.props.isAuthenticated)) {

            localStorage.setItem("token", this.props.token);

            //this.props.dispatch(pushState(null, this.props.redirect));
            var redirect = (this.state.redirectTo != "/" && this.state.redirectTo != "/login") ? this.state.redirectTo : this.props.redirect;
            this.props.history.push(redirect);

        }
        else {
            // localStorage.removeItem('token');
        }
    }

    componentWillUpdate(nextProps, nextState) {


        if ((nextProps.isAuthenticated)) {

            localStorage.setItem("token", nextProps.token);
            var redirect = (nextState.redirectTo != "/"
            && nextState.redirectTo != "/login") ? nextState.redirectTo : nextProps.redirect;
            this.props.history.push(redirect);
        }
        else {

//            localStorage.removeItem('token');
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.session !== this.props.session
        || nextProps.redirect !== this.props.redirect
        || nextProps.isAuthenticated !== this.props.isAuthenticated
        || this.state.email != nextState.email
        || this.state.password != nextState.password
        || this.state.showEmailError != nextState.showEmailError
        || this.state.content_translate != nextState.content_translate
        || this.state.redirectTo !== nextState.redirectTo)
    }

    validateEmail(event) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    }

    isEmpty(value) {
        return !_.isEmpty(value);
    }

    handleEmailChange(event) {

        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    login(e) {
        e.preventDefault();
        var canProceed = this.validateEmail(this.state.email)
            && this.refs.password.isValid()

        if (canProceed) {
            var data = {
                email: this.state.email,
                password: this.state.password

            }
            this.props.actions.loginUser(data.email, data.password, this.state.redirectTo);
        } else {
            this.refs.email.isValid();
            this.refs.password.isValid();
        }
    }

    render() {


        return (
            <div className="container-fluid session">
                <LoadingBar updateTime={100} maxProgress={95} progressIncrease={5} className="loading-bar"/>
                <div id="form-login" className="col-md-4 col-md-push-4 col-xs-10 col-xs-push-1">
                    <h3>Login</h3>

                    {this.props.statusText != null && <div className='alert alert-info'>{this.props.statusText}</div>}
                    <form className="form-signin" onSubmit={this.login.bind(this)}>
                        <Input
                            text={"Email"}
                            ref="email"
                            type="text"
                            defaultValue={this.state.email}
                            validate={this.validateEmail}
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            errorMessage={""}
                            emptyMessage={""}
                            errorVisible={this.state.showEmailError}
                        />
                        <Input
                            text={"Password"}
                            type="password"
                            ref="password"
                            validate={this.isEmpty}
                            value={this.state.password}
                            translate_error={""}
                            emptyMessage={""}
                            errorMessage={""}
                            onChange={this.handlePasswordChange}
                        />
                        <button type="submit" className="button button_wide">Login</button>

                    </form>


                </div>

            </div>

        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticating: state.session.isAuthenticating,
    isAuthenticated: state.session.isAuthenticated,
    statusText: state.session.statusText,
    redirect: state.session.redirect,
    token: state.session.token,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(SessionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

