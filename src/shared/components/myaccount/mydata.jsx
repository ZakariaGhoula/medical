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


class Mydata extends React.Component {
    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.state = {
            userId: null,
            name: "",
            firstname: "",
            gender: "",
            email: "",
            errorEmail: false,
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

        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;
        var name = (typeof this.props.user !== "undefined" && typeof this.props.user.lastname !== "undefined") ? this.props.user.lastname : "";
        var firstname = (typeof this.props.user !== "undefined" && typeof this.props.user.firstname !== "undefined") ? this.props.user.firstname : "";
        var email = (typeof this.props.user !== "undefined" && typeof this.props.user.email !== "undefined") ? this.props.user.email : "";
        var gender = (typeof this.props.user !== "undefined" && typeof this.props.user.gender !== "undefined") ? this.props.user.gender : "";
        var date = (typeof this.props.user !== "undefined" && typeof this.props.user.birthday !== "undefined") ? moment.utc(this.props.user.birthday) : moment();

        this.setState({
            userId: userId,
            name: name,
            firstname: firstname,
            email: email,
            gender: gender,
            date: date,
        })
    }

    componentWillUpdate(nextProps, nextState) {

    }

    handleChangeBirth(date) {
        this.setState({date: date});
    }


    saveForm() {
        var name = this.state.name;
        var firstname = this.state.firstname;
        var email = this.state.email;
        var canProced = false;
        if (email.length > 0 && name.length > 0 && firstname.length > 0) {
            canProced = true;
        }

        if (canProced) {
            var data = {
                userId: this.state.userId,
                token: this.props.token,
                lastname: this.state.name.trim(),
                firstname: this.state.firstname.trim(),
                email: this.state.email,
                gender: this.state.gender,
                birthday: this.state.date,
                img_uri: this.state.croppedImg

            }
            console.log(data);
            this.props.actions_session.updateMyAccount(data);
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

    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.name !== this.state.name)
            || (nextState.firstname !== this.state.firstname)
            || (nextState.gender !== this.state.gender)
            || (nextState.errorName !== this.state.errorName)
            || (nextState.errorFirstName !== this.state.errorFirstName)
            || (nextState.errorEmail !== this.state.errorEmail)
            || (nextState.email !== this.state.email)
            || (nextState.date !== this.state.date)
            || (nextState.focused !== this.state.focused)
            || (nextState.cropperOpen !== this.state.cropperOpen)
            || (nextState.croppedImg !== this.state.croppedImg)
            || (nextState.img !== this.state.img)
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

        var name = (typeof this.props.user !== "undefined" && typeof this.props.user.lastname !== "undefined") ? this.props.user.lastname : "";
        var firstname = (typeof this.props.user !== "undefined" && typeof this.props.user.firstname !== "undefined") ? this.props.user.firstname : "";
        var email = (typeof this.props.user !== "undefined" && typeof this.props.user.email !== "undefined") ? this.props.user.email : "";
        var gender = (typeof this.props.user !== "undefined" && typeof this.props.user.gender !== "undefined") ? this.props.user.gender : "";


        var emailClass = (this.state.errorEmail) ? "form-control has-error error-input" : "has-success form-control";
        var nameClass = (this.state.errorName) ? "form-control has-error error-input" : "has-success form-control";
        var firstNameClass = (this.state.errorFirstName) ? "form-control has-error error-input" : "has-success form-control";

        console.log(this.state);
        return (
            <div id="Mydata" className="container-fluid">
                <div className="form-group row">

                    <form className="form  ">
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-2 col-form-label">Email</label>
                            <div className="col-xs-10 col-md-8">
                                <input className={emailClass} type="email"
                                       ref="email"
                                       onChange={this.onChangeEmail.bind(this)}
                                       value={this.state.email}
                                       defaultValue={email}/>
                            </div>
                        </div>
                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-2 col-form-label">Nom</label>
                            <div className="col-xs-10 col-md-8">
                                <input
                                    className={nameClass} type="text"
                                    ref="name"
                                    onChange={this.onChangeName.bind(this)}
                                    value={this.capitalize(this.state.name)}
                                    defaultValue={this.capitalize(name)}/>
                            </div>
                        </div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-2 col-form-label">Prénom</label>
                            <div className="col-xs-10 col-md-8">
                                <input
                                    ref="firstname"
                                    className={firstNameClass} type="text"
                                    onChange={this.onChangeFirstName.bind(this)}
                                    value={this.capitalize(this.state.firstname)}
                                    defaultValue={this.capitalize(firstname)}/>
                            </div>
                        </div>
                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-2 col-form-label">Sexe</label>
                            <div className="col-xs-10 col-md-8">
                                <select className="form-control" onChange={this.onChangeSelect.bind(this)}
                                        value={this.state.gender}>
                                    <option value="female">Femme</option>
                                    <option value="male">Homme</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-lg-4 col-form-label">Date de naissance</label>
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
                            <label className="col-xs-2 col-md-2 col-form-label">Photo</label>
                            <div className="col-xs-10 col-md-8">
                                <div className="avatar-photo">
                                    <input ref="in" type="file" accept="image/*" onChange={this.handleFile}/>
                                    <a id="btn-img" className="btn btn-default">Rechercher une image</a>
                                </div>
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
                {this.state.cropperOpen &&
                <AvatarCropper
                    onRequestHide={this.handleRequestHide}
                    cropperOpen={this.state.cropperOpen}
                    onCrop={this.handleCrop}
                    image={this.state.img}
                    width={400}
                    height={400}
                />
                }

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
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mydata);

