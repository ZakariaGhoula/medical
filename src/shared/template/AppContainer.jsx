import React from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import {Router} from 'react-router';
import {bindActionCreators} from 'redux';
import {DEFAULT_LNG,PUBLIC_IMAGES_PATH} from './../constants/DefaultConstants';
import Header from './../components/default/header';
import Sidebar from './../components/default/sidebar';

export function requireContainer(Component) {

    class AppContainer extends React.Component {
        constructor(props) {
            super(props);


            var lang = (this.props.route.locale || DEFAULT_LNG)


            this.state = {
                "lang": lang
            }

            //  this.props.localise_actions.switchLang(lang);

        }

        componentDidMount() {

        }

        componentWillUpdate(nextProps, nextState) {

        }

        shouldComponentUpdate(nextProps, nextState) {
         return (  this.props.loading != nextProps.loading
         || this.props.session != nextProps.session
         || this.props.group != nextProps.group )
         }

        render() {

            var sidebar = Sidebar.default;
            let return_to_show = null;


            return_to_show = (
                <div>
                    <div className="container-fluid no-padding" style={{background: "#ecf0f1"}}>
                        <Sidebar active_li={this.props.location.pathname} {...this.props}/>
                        <div className="col-xs-8 col-md-9 col-lg-10 no-padding">
                            <Header/>
                            <div className="clear clearfix"></div>
                            <Component {...this.props}/>
                        </div>
                        <div className="clear clearfix"></div>
                    </div>
                    <div className="clear clearfix"></div>
                </div>
            )


            return (
                <div>
                    {return_to_show}
                </div>

            )

        }
    }

    const mapStateToProps = (state) => ({
        loading: state.loadingBar,
        group: state.group,
        session: state.session,
        // page_lang: state.page.page_lang
    });
    const mapDispatchToProps = (dispatch) => ({
        // localise_actions: bindActionCreators(LocaliseActions, dispatch),
    });
    return connect(mapStateToProps, mapDispatchToProps)(AppContainer);

}
