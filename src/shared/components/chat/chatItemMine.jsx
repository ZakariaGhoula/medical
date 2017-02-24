import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';
import uuid from 'node-uuid';
import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import * as SessionActions    from './../../actions/SessionActions';
import * as MessageActions    from './../../actions/MessageActions';
import { Link as ReactRouterLink} from 'react-router';
import moment from 'moment';
import {PUBLIC_IMAGES_PATH,USER_IMAGES_PATH} from './../../constants/DefaultConstants';


export default class ChatItemMine extends React.Component {
    constructor(props) {
        super(props);
        this.getFirstWord = this.getFirstWord.bind(this);
    }

    componentDidMount() {


    }


    componentWillUpdate(nextProps, nextState) {
    }


    getFirstWord(str) {
        if (str.indexOf(' ') === -1)
            return str;
        else
            return str.substr(0, str.indexOf(' '));
    }

    render() {

        var img = null;
        if (typeof this.props.message.user !== "undefined" && this.props.message.user !== null
            && typeof this.props.message.user.media !== "undefined"
            && typeof this.props.message.user.media.file !== "undefined" && this.props.message.user.media.file !== "") {

            img = USER_IMAGES_PATH + this.props.message.user.media.file;
        }
        else if (typeof this.props.message.user !== "undefined" && this.props.message.user !== null
            && typeof this.props.message.user.gender !== "undefined" && this.props.message.user.gender !== "") {
            if (this.props.message.user.gender == "male") {
                img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
            }
            else {
                img = PUBLIC_IMAGES_PATH + "composant/nobody_f.jpg";
            }
        }
        else {
            img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
        }


        var heure = null;
        if (typeof this.props.message.time !== "undefined" && this.props.message.time !== null) {
            heure = moment(moment.utc(this.props.message.time).toDate()).local().format('HH:mm');
        }



        return (
            <div className="message-item mine-message">
                <div className="text">
                    <div className="triangle"></div>
                    <p><span
                        className="nameuser">{this.getFirstWord(this.props.message.user.firstname) + " " + this.props.message.user.lastname.substr(0, 1) + ". : "}
                        </span>{this.props.message.content.content}</p>
                </div>
                <div className="user-i">
                    <img src={img} width="50px"/>
                    <div className="clear clearfix"></div>
                    {heure !== null && <p className="time">{heure}</p>}

                </div>

                <div className="clear clearfix"></div>
            </div>

        );
    }
}

