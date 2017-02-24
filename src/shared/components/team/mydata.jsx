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
import AvatarCropper from './AvatarCropper';


class Mydata extends React.Component {
    constructor(props) {
        super(props);
        this.saveForm = this.saveForm.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.state = {
            groupId: null,
            name: "",
            userId: null,
            errorName: false,
            cropperOpen: false,
            croppedImg: null,
            img: null,
        }

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleRequestHide = this.handleRequestHide.bind(this);
        this.handleCrop = this.handleCrop.bind(this);
        this.handleFile = this.handleFile.bind(this);

    }

    componentDidMount() {

        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var name = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.name !== "undefined") ? this.props.group.group.name : "";
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;

        this.setState({
            groupId: groupId,
            userId: userId,
            name: name,
        })
    }

    componentWillUpdate(nextProps, nextState) {

    }


    saveForm() {
        var name = this.state.name;

        var canProced = false;
        if (name.length > 0) {
            canProced = true;
        }

        if (canProced) {
            var data = {
                groupId: this.state.groupId,
                userId: this.state.userId,
                token: this.props.token,
                name: this.state.name.trim(),
                img_uri: this.state.croppedImg

            }

            this.props.actions.updateGroup(data);
        }
    }

    onChangeName(val) {
        this.setState({
            errorName: val.target.value == 0,
            name: val.target.value
        });
    }



    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.name !== this.state.name)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)

            || (nextState.focused !== this.state.focused)
            || (nextState.cropperOpen !== this.state.cropperOpen)
            || (nextState.croppedImg !== this.state.croppedImg)
            || (nextState.img !== this.state.img)
            || (nextProps.user !== this.props.user)
        )
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

        var name = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.name !== "undefined") ? this.props.group.group.name : "";
        var nameClass = (this.state.errorName) ? "form-control has-error error-input" : "has-success form-control";

        return (
            <div id="Mydata" className="container-fluid">
                <div className="form-group row">

                    <form className="form  ">

                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-form-label">Nom du groupe</label>
                            <div className="col-xs-10 col-md-8">
                                <input
                                    className={nameClass} type="text"
                                    ref="name"
                                    onChange={this.onChangeName.bind(this)}
                                    value={this.capitalize(this.state.name)}
                                    defaultValue={this.capitalize(name)}/>
                            </div>
                        </div>



                        <div className="clear clearfix"></div>
                        <div className="col-md-6 col-input">
                            <label className="col-xs-2 col-md-4 col-form-label">Photo</label>
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

