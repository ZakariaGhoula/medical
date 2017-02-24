import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {PUBLIC_VIDEOS_PATH, PUBLIC_IMAGES_PATH} from './../../constants/DefaultConstants';
import LoadingBar from 'react-redux-loading-bar'

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextStates) {
        return ( this.props.loading !== nextProps.loading);
    }
/* <a href="#"><span className="font-settings"></span></a>*/

    render() {
        return (
            <div >
                <LoadingBar updateTime={100} maxProgress={95} progressIncrease={5} className="loading-bar"/>
                <div id="navigation">
                    <div className="container-fluid">

                        <div id="nav-left">

                        </div>
                        <div id="nav-right">
                            <a href="#"><span className="font-notification"></span></a>
                            <Link to="/chat"><span className="font-chat"></span></Link>

                        </div>
                        <div className="clearfix clear"></div>
                    </div>
                </div>
            </div>

        );
    }

}


const mapStateToProps = (state) => (

{
    loading: state.loadingBar,
    session: state.session
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);