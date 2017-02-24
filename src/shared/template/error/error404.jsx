import React                  from 'react';
import {bindActionCreators} from 'redux';
import {connect}            from 'react-redux';
import { Link as ReactRouterLink} from 'react-router';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';
import   ReactDom               from 'react-dom';
import {calculateResponsiveState} from './../../actions/index'
import {WEBRoot, PUBLIC_IMAGES_PATH,ROUTING} from './../../constants/DefaultConstants';
import Radium, {Style} from 'radium';
import {GlobalStyle, GraphChart} from './../../constants/GlobalStyle'
import RetinaImage from 'react-retina-image';
import Helmet from "react-helmet";
const Link = Radium(ReactRouterLink);
@Radium
export default  class error404 extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
       /* var styles = {
            pictureDiv: {
                width: '100%',
                opacity: '0.7',
                maxHeight: '600px',
                height: '600px',
            },
            pictureDivContainer: {
                width: '100%',
                opacity: '1',
                maxHeight: '600px',
                height: '600px',
                background: '#000',
                display: 'block',
            },
            baseline: {
                marginTop: '20%',
                position: 'absolute',
                color: '#fff',
                width: '100%',
                fontSize: '3.8vw',
                fontFamily: GraphChart.font.newmainFont,
                zIndex: 6,
                // textTransform: "uppercase",
                fontVariant: 'small-caps',
                fontWeight: 400,
                letterSpacing: '0.6vw',
                lineHeight: '5vw',
                wordSpacing: '10px',
                textAlign: 'center',

            },
            centerLogoStyle: {
                display: 'inline-block',
                width: '70px',
                margin: '0px auto 15px',
                border: '8px solid #fff'
            },
            mainGrid: {
                background: GraphChart.color.globalBackground,
                position: "relative"

            },
            simpleColDiv: {
                padding: '0px 30px 0px 30px',
                color: '#4a4a4a',
                textAlign: 'center',
                fontFamily: "'Alegreya Sans', sans-serif",
            },
            scrollDownBtn: {
                position: 'relative',
                bottom: '10vw',
                textAlign: 'center',
                color: '#fff',
                border: "none",
                outline: "0",
                background: "0 0",
                opacity: '.6',
                transition: 'all .3s',
                ':hover': {
                    opacity: '1',
                }
            },
            scrollDownIcon: {
                width: '35px',
                marginBottom: '20px'
            }
        };
        var style_baseline = GlobalStyle.baseline_h1.medium;
        var style_h2 = GlobalStyle.h2under.medium;
        var style_first_p = Object.assign(GlobalStyle.p.medium, {
            paddingLeft: 15,
            paddingRight: 15,
            marginBottom: 45,
            color: "#3a3a3a",
            textAlignLast: "center"
        });

        var new_style_discover_btn = Object.assign(GlobalStyle.discover_btn.medium, {
            position: "relative",
            left: "inherit",
            bottom: "inherit"
        });
        if (this.props.browser.greaterThan.large) {
            style_baseline = GlobalStyle.baseline_h1.large;
            style_h2 = GlobalStyle.h2under.large;
            style_first_p = Object.assign(GlobalStyle.p.large, {
                paddingLeft: 15,
                paddingRight: 15,
                marginBottom: 60,
                color: "#3a3a3a",
                textAlignLast: "center"

            });
            new_style_discover_btn = Object.assign(GlobalStyle.discover_btn.large, {
                position: "relative",
                left: "inherit",
                bottom: "inherit"
            });
        }
        if (this.props.browser.lessThan.medium) {
            style_baseline = GlobalStyle.baseline_h1.small;
            style_h2 = GlobalStyle.h2under.small;
            style_first_p = Object.assign(GlobalStyle.p.small, {color: "#3a3a3a"});
            new_style_discover_btn = Object.assign(GlobalStyle.discover_btn.small, {
                position: "relative",
                left: "inherit",
                bottom: "inherit"
            });
        }
        var presentation = {};
        var style_h3 = {};
        var style_discover_btn = {};
        if (this.props.browser.lessThanOrEqual.bigger) {
            presentation = {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '27px',
                lineHeight: '1.7',
                paddingTop: 25,
                paddingBottom: 25
            };

            style_discover_btn = {
                fontFamily: GraphChart.font.newmainFont,
                padding: '16px 37px',
                color: "#3A3A3A",
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '1',
                border: '1px solid  #173E43',
                cursor: "pointer",
                margin: "24px auto",
            }
            style_h2 = Object.assign(GlobalStyle.h2_under.bigger, {textAlign: 'justify', marginBottom: 13});
            style_h3 = Object.assign(GlobalStyle.h3_under.bigger, {
                fontSize: 41,
                textAlign: 'justify',
                marginBottom: 13
            });

        }
        if (this.props.browser.lessThanOrEqual.extraLarge) {
            presentation = {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '28px',
                lineHeight: '1.7',
                paddingTop: 15,
                paddingBottom: 15
            };
            style_h2 = Object.assign(GlobalStyle.h2_under.extraLarge, {textAlign: 'justify', marginBottom: 13});
            style_h3 = Object.assign(GlobalStyle.h3_under.extraLarge, {textAlign: 'justify', marginBottom: 13});
            style_discover_btn = {
                fontFamily: GraphChart.font.newmainFont,
                padding: '14px 31px',
                color: "#3A3A3A",
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '23px',
                lineHeight: '1',
                border: '1px solid  #173E43',
                cursor: "pointer",
                margin: "24px auto",
            }

        }
        if (this.props.browser.lessThanOrEqual.large) {
            presentation = {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '23px',
                lineHeight: '1.7',
                paddingTop: 15,
                paddingBottom: 15
            };
            style_h2 = Object.assign(GlobalStyle.h2_under.large, {textAlign: 'justify', marginBottom: 13});
            style_h3 = Object.assign(GlobalStyle.h3_under.large, {textAlign: 'justify', marginBottom: 13});
            style_discover_btn = {
                fontFamily: GraphChart.font.newmainFont,
                padding: '14px 31px',
                color: "#3A3A3A",
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '19px',
                lineHeight: '1',
                border: '1px solid  #173E43',
                cursor: "pointer",
                margin: "24px auto",
            }

        }
        if (this.props.browser.lessThanOrEqual.medium) {
            presentation = {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '1.7',
                paddingTop: 15,
                paddingBottom: 15
            };

            style_h2 = Object.assign(GlobalStyle.h2_under.medium, {textAlign: 'justify', marginBottom: 13});
            style_h3 = Object.assign(GlobalStyle.h3_under.medium, {textAlign: 'justify', marginBottom: 13});
            style_discover_btn = {
                fontFamily: GraphChart.font.newmainFont,
                padding: '13px 25px',
                color: "#3A3A3A",
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1',
                border: '1px solid  #173E43',
                cursor: "pointer",
                margin: "0px auto",
            }

        }
        if (this.props.browser.lessThanOrEqual.small) {
            presentation = {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '17px',
                lineHeight: '1.7',
                paddingTop: 10,
                paddingBottom: 10
            };
            style_h2 = Object.assign(GlobalStyle.h2_under.small, {textAlign: 'justify', marginBottom: 13});
            style_h3 = Object.assign(GlobalStyle.h3_under.small, {textAlign: 'justify', marginBottom: 13});

            style_discover_btn = {
                fontFamily: GraphChart.font.newmainFont,
                padding: '13px 25px',
                color: "#3A3A3A",
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '1',
                border: '1px solid  #173E43',
                cursor: "pointer",
                margin: "0px auto 27px",

            }
        }
        if (this.props.browser.lessThanOrEqual.extraSmall) {
            presentation = {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '1.7',
                paddingTop: 10,
                paddingBottom: 10
            }
            style_h2 = Object.assign(GlobalStyle.h2_under.extraSmall, {textAlign: 'justify', marginBottom: 13});
            style_h3 = Object.assign(GlobalStyle.h3_under.extraSmall, {textAlign: 'justify', marginBottom: 13});


        }*/
        return (
            <div id="app-view">


            </div>
        );
    }
}
