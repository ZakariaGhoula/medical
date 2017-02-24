import React                  from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM               from 'react-dom';

import { pushState,replaceState } from 'redux-router';

import { Router } from 'react-router';
import { connect }            from 'react-redux';
import * as GroupActions    from './../../actions/GroupActions';
import { Link as ReactRouterLink} from 'react-router';
import { PUBLIC_IMAGES_PATH} from './../../constants/DefaultConstants';
import RetinaImage from 'react-retina-image';


class home extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        if (!this.props.loading && typeof this.props.user !== "undefined" && typeof this.props.user._id !== "undefined" && this.props.user._id != null) {
            this.props.actions.getMyGroup(this.props.user._id);
        }
    }

    componentWillUpdate(nextProps, nextState) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return ((nextProps.loading !== this.props.loading)
            || (nextProps.group !== this.props.group)
            || (nextProps.user !== this.props.user)
        )
    }

    render() {


        return (
            <div className="container-fluid">
                <div className="page-header">
                    <h1>Tableau de bord</h1>
                </div>
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
    actions: bindActionCreators(GroupActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(home);

