import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SidebarItem from './SidebarItem';
import {PUBLIC_IMAGES_PATH,USER_IMAGES_PATH} from './../../constants/DefaultConstants';
class Sidebar extends React.Component {


    constructor(props) {
        super(props);
        this.getFirstWord = this.getFirstWord.bind(this);

    }

    getFirstWord(str) {
        if (str.indexOf(' ') === -1)
            return str;
        else
            return str.substr(0, str.indexOf(' '));
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
            <div id="sidebar" className="col-xs-4 col-md-3 col-lg-2 no-padding">

                {typeof this.props.session.user !== "undefined" && this.props.session.user !== null &&
                <div id="title-sidebar">
                    <Link to="/myaccount" className="picture-profile"><img src={img}/> </Link>
                    {(typeof this.props.session !== "undefined" && this.props.session.user !== null
                    && typeof this.props.session.user !== "undefined"
                    && typeof this.props.session.user.lastname !== "undefined"
                    && typeof this.props.session.user.firstname !== "undefined") &&
                    <h3>
                        <b>{this.getFirstWord(this.props.session.user.firstname)} {this.props.session.user.lastname.substr(0, 1) + "."}</b>
                    </h3>}
                </div>
                }
                <ul>
                    <SidebarItem is_active={(this.props.active_li=="/")} link_to="/" font_name="font-home"
                                 title="Tableau de bord"/>
                    <SidebarItem is_active={(this.props.active_li=="/calendar")} link_to="/calendar"
                                 font_name="font-calendar" title="Calendrier"/>

                    {this.props.group != null && typeof this.props.group.is_admin !== "undefined" && this.props.group.is_admin === true &&
                    <SidebarItem is_active={(this.props.active_li=="/team")} link_to="/team" font_name="font-team"
                                 title="L'équipe"/>}

                </ul>
            </div>
        );
    }

}
const mapStateToProps = (state) => (


{
    loading: state.loadingBar,
    session: state.session,
    group: state.group
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

/*   {#<SidebarItem is_active={(this.props.active_li=="/chat")} link_to="/calendar" font_name="font-chat"
 title="Discussion"/>#}*/