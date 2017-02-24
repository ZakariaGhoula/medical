import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';
import uuid from 'node-uuid';
import { Router } from 'react-router';
import { connect }            from 'react-redux';

import { Link as ReactRouterLink} from 'react-router';

import { truncate ,dynamicSort,dynamicSortByTime} from '../../utils/util';
import ChatItemMine from './ChatItemMine';
import ChatItemOther from './ChatItemOther';
import moment from 'moment';
import {PUBLIC_IMAGES_PATH,USER_IMAGES_PATH} from './../../constants/DefaultConstants';


export default class ChatMessages extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        var messageList = ReactDOM.findDOMNode(this.refs["messages-list-item"]);
        messageList.scrollTop = messageList.scrollHeight;
    }

    componentDidUpdate() {

        var messageList = ReactDOM.findDOMNode(this.refs["messages-list-item"]);
        messageList.scrollTop = (messageList.scrollHeight);

    }

    componentWillUpdate(nextProps, nextState) {

    }


    render() {


        var final_data = [];


        this.props.list_messages.map(function (message, i) {


            if (typeof  message.time !== "undefined" && message.time !== null) {
                var date_element = moment(moment.utc(message.time).toDate()).local().format('DD MMMM YYYY');

                if (date_element != 'Invalid date') {
                    if (typeof final_data[date_element] === 'undefined') {
                        final_data[date_element] = [];
                    }
                    final_data[date_element].push(message);
                }
            }
        }, this);

        var to_show = [];
        for (var k   in final_data) {
            var list_chat = final_data[k].sort(dynamicSort("time"));
            to_show.push(<div className="d-day">{k}</div>);

            list_chat.map(function (message, i) {
                if (message.is_mine) {
                    to_show.push(<ChatItemMine key={i} message={message}/>);
                }
                else {
                    to_show.push(<ChatItemOther key={i} message={message}/>);
                }
            })
            to_show.push(<div className="clear clearfix"></div>);
        }


        return (
            <div id="messages-list-item" ref="messages-list-item">

                { to_show.map(function (element, i) {

                    return <div key={i}>{element}</div>;


                })}
                <div className="clear clearfix"></div>
            </div>

        );
    }
}

