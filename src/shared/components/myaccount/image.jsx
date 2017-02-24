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


class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 1
        }
    }

    componentDidMount() {


    }

    componentWillUpdate(nextProps, nextState) {

    }




    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextState.tab !== this.state.tab)
            || (nextProps.user !== this.props.user)
        )
    }

    render() {


        return (
            <div id="ImageProfile">


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

export default connect(mapStateToProps, mapDispatchToProps)(Image);

