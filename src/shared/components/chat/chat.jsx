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
import ChatMessages from "./ChatMessages";
import {WEBRoot,PUBLIC_IMAGES_PATH,USER_IMAGES_PATH} from './../../constants/DefaultConstants';

import io from 'socket.io-client';
const socket = io(WEBRoot);
class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input_text: "",
            userId: "",
            groupId: "",
            messages: [],
        }
        this.changeTextInput = this.changeTextInput.bind(this);
        this.keypressTextInput = this.keypressTextInput.bind(this);
        this.send = this.send.bind(this);

    }

    componentDidMount() {
        var groupId = (typeof this.props.group.group !== "undefined" && typeof this.props.group.group.id !== "undefined") ? this.props.group.group.id : null;
        var userId = (typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined") ? this.props.user._id : null;


        this.props.actions_message.getMessages(groupId);

        this.setState({
            groupId: groupId,
            userId: userId,

        })


    }


    componentWillUpdate(nextProps, nextState) {


        if (nextProps.list_messages !== this.props.list_messages && nextProps.group.listUserGroup !== null) {
            var list_message = [];
            for (var i in nextProps.list_messages) {
                var uid = nextProps.list_messages[i].userId;
                var user_picked = _.filter(nextProps.group.listUserGroup, {'_id': '' + uid});


                if (typeof user_picked[0] !== "undefined") {


                    var message = {
                        time: nextProps.list_messages[i].time,
                        content: nextProps.list_messages[i].content,
                        is_mine: (nextState.userId == nextProps.list_messages[i].userId),
                        user: user_picked[0]
                    };
                    list_message.push(message);
                }
                else if (nextState.userId == nextProps.list_messages[i].userId) {
                    var message = {
                        time: nextProps.list_messages[i].time,
                        content: nextProps.list_messages[i].content,
                        is_mine: (nextState.userId == nextProps.list_messages[i].userId),
                        user: nextProps.user
                    };
                    list_message.push(message);
                }
            }
            this.setState({messages: (list_message)});

        }
    }



    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.list_messages !== this.props.list_messages)
            || (nextProps.user !== this.props.user)
            || (nextState.input_text !== this.state.input_text)
            || (nextState.messages !== this.state.messages)
            || (nextState.groupId !== this.state.groupId)
            || (nextState.userId !== this.state.userId)
        )
    }


    send() {
        var value_to_send = this.state.input_text.trim();
        if (value_to_send.length > 0 && this.state.groupId !== null && this.state.userId !== null) {
            var data_msg = {
                id: `${Date.now()}${uuid.v4()}`,
                groupId: this.state.groupId,
                userId: this.state.userId,
                content: {
                    type: "text",
                    content: value_to_send
                },
                time: moment.utc().format('ll LTS'),
            }
            this.props.actions_message.sendMessage(data_msg);
            this.setState({input_text: ""});
            socket.emit('message', data_msg);
        }

    }


    keypressTextInput(val) {
        if (val.charCode == 13) {
            this.send();
        }
    }

    changeTextInput(val) {


        this.setState({input_text: val.target.value});

    }

    render() {



        var img = null;
        if (typeof this.props.session.user !== "undefined" && this.props.session.user !== null
            && typeof this.props.session.user.media !== "undefined"
            && typeof this.props.session.user.media.file !== "undefined" && this.props.session.user.media.file !== "") {

            img = USER_IMAGES_PATH + this.props.session.user.media.file;
        }
        else if (typeof this.props.session.user !== "undefined" && this.props.session.user !== null
            && typeof this.props.session.user.gender !== "undefined" && this.props.session.user.gender !== "") {
            if (this.props.session.user.gender == "male") {
                img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
            }
            else {
                img = PUBLIC_IMAGES_PATH + "composant/nobody_f.jpg";
            }
        }
        else {
            img = PUBLIC_IMAGES_PATH + "composant/nobody_m.jpg";
        }


        return (
            <div className="container-fluid no-padding">
                {typeof this.props.session.user !== "undefined" && this.props.session.user !== null &&
                <div id="container-chat">
                    <div id="chat">

                        <div id="message-chat">
                            {this.state.messages.length > 0 &&
                            <ChatMessages list_messages={this.state.messages}/>}
                        </div>
                        <div id="input-chat">
                            <div id="bloc-input">
                                <div id="bloc-pic">
                                    <img src={img} width="50px"/>
                                </div>
                                <input type="text" value={this.state.input_text}
                                       onKeyPress={this.keypressTextInput.bind(this)}
                                       onChange={this.changeTextInput.bind(this)}
                                       id="input-text"
                                       placeholder="Insérer votre message ici..."/>
                                <a id="input-send" onClick={this.send.bind(this)}><i
                                    className="font-send-enter"></i><span
                                    className="txt-send">Envoyer</span></a>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    group: state.group,
    user: state.session.user,
    list_messages: state.message.list_messages,
    loading: state.loadingBar,
    token: state.session.token,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(GroupActions, dispatch),
    actions_session: bindActionCreators(SessionActions, dispatch),
    actions_message: bindActionCreators(MessageActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
