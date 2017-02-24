import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import { Link as ReactRouterLink} from 'react-router';
import { PUBLIC_IMAGES_PATH} from './../../constants/DefaultConstants';
import RetinaImage from 'react-retina-image';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import AvatarCropper from './AvatarCropper';


class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.state = {
            userId: null,
            name: "",
            firstname: "",
            gender: "female",
            password: "",
            level: "R1",
            groupPassword: "",
            email: "",
            errorEmail: false,
            errorPwd: false,
            errorName: false,
            errorFirstName: false,
            focused: false,
            cropperOpen: false,
            croppedImg: null,
            img: null,
            date: moment(),
        }

        this.handleChangeBirth = this.handleChangeBirth.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleRequestHide = this.handleRequestHide.bind(this);
        this.handleCrop = this.handleCrop.bind(this);
        this.handleFile = this.handleFile.bind(this);

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
                groupPassword: groupPassword,
                requestElement: false,
            });


        }

    }

    componentWillUnmount() {
        this.props.actions.destroyPwdGroup();
    }

    handleChangeBirth(date) {
        this.setState({date: date});
    }

    onChangePassword(val) {
        var err = false;
        if (val.target.value.length < 3) {
            err = true
        }
        if (val.target.value.length == 0) {
            err = false;
        }

        this.setState({
            errorPwd: err,
            password: (val.target.value.length == 0) ? this.state.groupPassword : val.target.value
        });
    }

    saveForm() {
        var name = this.state.name;
        var firstname = this.state.firstname;
        var email = this.state.email;
        var password = this.state.password;
        var canProced = false;
        if (email.length > 0 && name.length > 0 && firstname.length > 0 && password.length > 0) {
            canProced = true;
        }

        if (canProced) {
            var data = {
                groupId: this.state.groupId,
                userId: this.state.userId,
                token: this.props.token,
                lastname: this.state.name.trim(),
                firstname: this.state.firstname.trim(),
                email: this.state.email,
                gender: this.state.gender,
                password: this.state.password,
                birthday: this.state.date,
                level: this.state.level,


            }
            this.props.actions.addUserGroup(data);
        }
    }

    onChangeName(val) {
        this.setState({
            errorName: val.target.value == 0,
            name: val.target.value
        });
    }

    onChangeFirstName(val) {
        this.setState({
            errorFirstName: val.target.value == 0,
            firstname: val.target.value
        });
    }

    onChangeEmail(val) {

        this.setState({
            errorEmail: !this.validateEmail(val.target.value),
            email: val.target.value
        });
    }

    onChangeSelect(val) {

        this.setState({

            gender: val.target.value
        });
    }

    onChangeSelectLevel(val) {

        this.setState({

            level: val.target.value
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.requestElement !== this.state.requestElement)
            || (nextState.groupPassword !== this.state.groupPassword)
            || (nextState.password !== this.state.password)
            || (nextState.name !== this.state.name)
            || (nextState.firstname !== this.state.firstname)
            || (nextState.gender !== this.state.gender)
            || (nextState.errorName !== this.state.errorName)
            || (nextState.errorFirstName !== this.state.errorFirstName)
            || (nextState.errorEmail !== this.state.errorEmail)
            || (nextState.errorPwd !== this.state.errorPwd)
            || (nextState.email !== this.state.email)
            || (nextState.date !== this.state.date)
            || (nextState.focused !== this.state.focused)
            || (nextState.cropperOpen !== this.state.cropperOpen)
            || (nextState.croppedImg !== this.state.croppedImg)
            || (nextState.level !== this.state.level)
            || (nextState.img !== this.state.img)
            || (nextProps.textStatutAddUserGroup !== this.props.textStatutAddUserGroup)
            || (nextProps.user !== this.props.user)
        )
    }

    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }

    capitalize(s) {
        return s.toLowerCase().replace(/\b./g, function (a) {
            return a.toUpperCase();
        });
    }


    handleFileChange(dataURI) {

        this.setState({
            img: dataURI,
            croppedImg: this.state.croppedImg,
            cropperOpen: true
        });
    }

    handleCrop(dataURI) {
        //---upload
        // this.props.actions.uploadAndSaveUserData(this.state.token, dataURI);

        this.setState({
            cropperOpen: false,
            img: null,
            croppedImg: dataURI
        });


    }

    handleRequestHide() {
        this.setState({
            cropperOpen: false
        });
    }


    handleFile(e) {
        var reader = new FileReader();
        var file = e.target.files[0];

        if (!file) return;
        /*--- upload */
        reader.onload = function (img) {
            this.handleFileChange(img.target.result);

        }.bind(this);
        reader.readAsDataURL(file);

    }

    render() {


        var emailClass = (this.state.errorEmail) ? "form-control has-error error-input" : "has-success form-control";
        var passwordClass = (this.state.errorPwd) ? "form-control has-error error-input" : "has-success form-control";
        var nameClass = (this.state.errorName) ? "form-control has-error error-input" : "has-success form-control";
        var firstNameClass = (this.state.errorFirstName) ? "form-control has-error error-input" : "has-success form-control";


        return (
            <div id="Mydata" className="container-fluid">
                <div className="form-group row">

                    <form className="form  ">
                        <div className="col-md-8 col-md-push-2 col-input">
                            {typeof this.props.textStatutAddUserGroup !== "undefined" && this.props.textStatutAddUserGroup != "" &&
                            <p className='alert alert-info'>{this.props.textStatutAddUserGroup}</p>}
                        </div>
                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">

                            <label className="col-xs-2 col-md-4 col-form-label">Email</label>
                            <div className="col-xs-10 col-md-8">
                                <input className={emailClass} type="email"
                                       ref="email"
                                       onChange={this.onChangeEmail.bind(this)}
                                       value={this.state.email}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-form-label">Mot de passe</label>
                            <div className="col-xs-10 col-md-8">
                                <input className={passwordClass} type="email"
                                       ref="email"
                                       onChange={this.onChangePassword.bind(this)}
                                       value={this.state.password}
                                />
                            </div>
                        </div>
                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-m-4 col-form-label">Nom</label>
                            <div className="col-xs-10 col-md-8">
                                <input
                                    className={nameClass} type="text"
                                    ref="name"
                                    onChange={this.onChangeName.bind(this)}
                                    value={this.capitalize(this.state.name)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-form-label">Prénom</label>
                            <div className="col-xs-10 col-md-8">
                                <input
                                    ref="firstname"
                                    className={firstNameClass} type="text"
                                    onChange={this.onChangeFirstName.bind(this)}
                                    value={this.capitalize(this.state.firstname)}
                                />
                            </div>
                        </div>
                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-form-label">Sexe</label>
                            <div className="col-xs-10 col-md-8">
                                <select className="form-control" onChange={this.onChangeSelect.bind(this)}
                                        value={this.state.gender}>
                                    <option value="female">Femme</option>
                                    <option value="male">Homme</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-form-label">Date de naissance</label>
                            <div className="col-xs-10 col-md-6">
                                <DatePicker
                                    className="form-control"
                                    locale="fr-fr"
                                    showYearDropdown
                                    dateFormatCalendar="MMMM"
                                    selected={this.state.date}
                                    onChange={this.handleChangeBirth.bind(this)}/>
                            </div>
                        </div>


                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-form-label">Niveau d'étude</label>
                            <div className="col-xs-10 col-md-8">
                                <select className="form-control" onChange={this.onChangeSelectLevel.bind(this)}
                                        value={this.state.level}>
                                    <option value="R1">R1</option>
                                    <option value="R2">R2</option>
                                    <option value="R3">R3</option>
                                    <option value="R4">R4</option>
                                    <option value="R5">R5</option>
                                </select>
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
    textStatutAddUserGroup: state.group.textStatutAddUserGroup,
    user: state.session.user,
    loading: state.loadingBar,
    token: state.session.token,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

