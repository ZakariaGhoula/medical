import React from 'react';
import {WEBRoot} from './../constants/DefaultConstants';
export default  class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {ga: null}

    }

    componentDidMount() {


    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
        //this.logPageView();
    }



    render() {
        return (
            <div id="app-view">
                {this.props.children}
            </div>
        );
    }
}
