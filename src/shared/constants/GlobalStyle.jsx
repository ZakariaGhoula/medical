//   GlobalStyle

// Ici est géré la feuille de style globale pour Radium et les différents styles de chaques pages.

export const GraphChart = {
    color: {
        dark: '#3a3a3a',
        light: '#e3e3e3',
        onLight: '#4a4a4a',
        onDark: '#e3e3e3',
        blue: '#173E43',
        globalBackground: '#fff',
        globalGreyBackground: '#f2f5f6'
    },
    font: {
        mainFont: "'David Libre', serif",
        newmainFont: "'David Libre', serif",
        newmainFont2: "'Playfair Display', sans-serif",
        logoFont: "'David Libre', serif"
    }

};

export const GlobalStyle = {

        h2: {
            fontFamily: GraphChart.font.newmainFont,
            fontSize: '28px',
            display: 'block',
            color: GraphChart.color.onLight,
            textAlign: 'center',
            letterSpacing: '1px'
        },

        h2under: {
            'extraSmall': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 400,
                fontSize: '27px',
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            },'small': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 400,
                fontSize: '35px',
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            },
            'medium': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 400,
                fontSize: '35px',
                margin: '20px auto 30',
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            }, 'large': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 400,
                fontSize: '45px',
                lineHeight: '1.1',
                margin: '20px auto 30',
                fontVariant: 'small-caps',
            },
            'extraLarge': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 400,
                fontSize: '60px',
                lineHeight: '1.1',
                margin: '20px auto  37',
                fontVariant: 'small-caps',
            },
            'bigger': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 400,
                fontSize: '70px',
                lineHeight: '1.1',
                margin: '20px auto 45',
                fontVariant: 'small-caps',
            }


        }, h2_under: {
            'extraSmall': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '27px',
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            },'small': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '35px',
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            },
            'medium': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '35px',
                marginBottom:30,
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            }, 'large': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '45px',
                lineHeight: '1.1',
                marginBottom: 30,
                fontVariant: 'small-caps',
            },
            'extraLarge': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '60px',
                lineHeight: '1.1',
                marginBottom: 37,
                fontVariant: 'small-caps',
            },
            'bigger': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '70px',
                lineHeight: '1.1',
                marginBottom: 45,
                fontVariant: 'small-caps',
            }


        },h3_under: {
            'extraSmall': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            },'small': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '19px',
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            },
            'medium': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '24px',
                marginBottom:30,
                lineHeight: '1.1',
                fontVariant: 'small-caps',
            }, 'large': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '30px',
                lineHeight: '1.1',
                marginBottom: 30,
                fontVariant: 'small-caps',
            },
            'extraLarge': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '40px',
                lineHeight: '1.1',
                marginBottom: 37,
                fontVariant: 'small-caps',
            },
            'bigger': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'block',
                textAlign: 'center',
                fontWeight: 500,
                fontSize: '55px',
                lineHeight: '1.1',
                marginBottom: 45,
                fontVariant: 'small-caps',
            }


        }, h3under: {
            fontFamily: GraphChart.font.mainFont,
            fontSize: '24px',
            lineHeight: '30px',
            color: GraphChart.color.onLight,
            display: 'block',
            textAlign: 'justify',
            textAlignLast: 'center',
            fontWeight: 300
        },
        h3: {
            fontFamily: GraphChart.font.mainFont,
            fontSize: '34px',
            display: 'block',
            color: GraphChart.color.onLight,
            textAlign: 'center',
            letterSpacing: '1px',
            fontWeight: "100",
            fontVariant: "small-caps"
        },
        hr: {
            width: '120px',
            border: '1px solid ' + GraphChart.color.onLight
        },

        p: {
            'small': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
            },
            'medium': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '26px',
                lineHeight: '1.2',
            }, 'large': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '23px',
                lineHeight: '1.7',
            }, 'extraLarge': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.dark,
                display: 'block',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '28px',
                lineHeight: '1.7',
            }
        },
        discover_btn: {
            'small': {
                textDecoration: "none",
                fontFamily: GraphChart.font.newmainFont,
                color: "#3A3A3A",
                display: 'table',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
                padding: '8px 22px',
                border: '1px solid #173E43',
                cursor: "pointer",
                margin: "10px auto"
            },
            'medium': {
                fontFamily: GraphChart.font.newmainFont,
                color: "#3A3A3A",
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '26px',
                lineHeight: '1',
                padding: '15px 28px',
                border: '1px solid #173E43',
                cursor: "pointer",
                margin: "10px auto"
            }, 'large': {
                fontFamily: GraphChart.font.newmainFont,
                padding: '16px 37px',
                color: "#3A3A3A",
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '28px',
                lineHeight: '1',
                border: '1px solid  #173E43',
                cursor: "pointer",
                margin: "24px auto"
            }
        }, simple_discover_btn: {
            'small': {
                textDecoration: "none",
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'table',
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',

                cursor: "pointer",
                margin: "10px auto 0px"
            },
            'medium': {
                fontFamily: GraphChart.font.newmainFont,
                color: GraphChart.color.blue,
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '26px',
                lineHeight: '1',
                cursor: "pointer",
                margin: "10px auto"
            }, 'large': {
                fontFamily: GraphChart.font.newmainFont,

                color: GraphChart.color.blue,
                display: 'table',
                textDecoration: "none",
                textAlign: 'justify',
                fontWeight: 400,
                fontSize: '28px',
                lineHeight: '1',

                cursor: "pointer",
                margin: "24px auto"
            }
        },
        homeReadMore: {
            display: 'block',
            color: '#bab5ae',
            textDecoration: 'none',
            textAlign: 'right',
            fontFamily: GraphChart.font.mainFont,
            fontSize: "22px",
            fontWeight: "100",
            fontVariant: "small-caps"
        },
        baseline: {
            marginTop: '10%',
            position: 'absolute',
            color: '#fff',
            width: '100%',
            fontSize: '3.7vw',
            fontFamily: GraphChart.font.newmainFont,
            // textTransform: "uppercase",
            fontVariant: 'small-caps',
            fontWeight: 100,
            letterSpacing: '0.6vw',
            lineHeight: '5vw',
            wordSpacing: '10px',
            textAlign: 'center',
            zIndex: 2
        },
        centerLogoStyle: {
            display: 'inline-block',
            height: "inherit",
            margin: '0px auto 15px',

        },
        centerLogoStyleResponsive: {
            'small': {
                width: 50,
                border: '1px solid #fff'
            },
            'medium': {
                width: 70,
                border: '2px solid #fff',
            }, 'large': {
                width: 100,
                border: '3px solid #fff',
            }
        },
        aSocial: {
            display: 'inline-block',
            width: '35px',
            height: '35px',
            margin: '5px',
            opacity: '0.5',
            transition: '0.1s',
            ':hover': {
                opacity: '0.9'
            }
        },
        greyBlock: {

            paddingTop: 22,
            paddingBottom: 22,
            background: GraphChart.color.globalGreyBackground,
        }, whiteBlock: {

            paddingTop: 22,
            paddingBottom: 22,
            background: GraphChart.color.globalBackground,
        },
        baseline_h1: {
            'extraSmall': {
                marginTop: '10%',
                position: 'absolute',
                color: '#fff',
                width: '100%',
                fontSize: '6vw',
                fontFamily: GraphChart.font.newmainFont,
                // textTransform: "uppercase",
                fontVariant: 'small-caps',
                fontWeight: 100,
                letterSpacing: '0.6vw',
                lineHeight: '7vw',
                wordSpacing: '10px',
                textAlign: 'center',
                zIndex: 2,
                textShadow: "1px 1px 1px rgba(0, 8, 15, 0.60)"
            }, 'small': {
                marginTop: '10%',
                position: 'absolute',
                color: '#fff',
                width: '100%',
                fontSize: '25px',
                fontFamily: GraphChart.font.newmainFont,
                // textTransform: "uppercase",
                fontVariant: 'small-caps',
                fontWeight: 100,
                letterSpacing: '0.6vw',
                lineHeight: '5vw',
                wordSpacing: '10px',
                textAlign: 'center',
                zIndex: 2,
                textShadow: "1px 1px 1px rgba(0, 8, 15, 0.60)"
            },
            'medium': {
                marginTop: '10%',
                position: 'absolute',
                color: '#fff',
                width: '100%',
                fontSize: '37px',
                fontFamily: GraphChart.font.newmainFont,
                // textTransform: "uppercase",
                fontVariant: 'small-caps',
                fontWeight: 100,
                letterSpacing: '0.6vw',
                lineHeight: '42px',
                wordSpacing: '10px',
                textAlign: 'center',
                zIndex: 2,
                textShadow: "1px 1px 1px rgba(0, 8, 15, 0.50)"
            }, 'large': {
                marginTop: '10%',
                position: 'absolute',
                color: '#fff',
                width: '100%',
                fontSize: '3.8vw',
                fontFamily: GraphChart.font.newmainFont,
                fontVariant: 'small-caps',
                fontWeight: 100,
                letterSpacing: '5px',
                lineHeight: '5vw',
                wordSpacing: '10px',
                textAlign: 'center',
                zIndex: 2,
                textShadow: "1px 1px 1px rgba(0, 8, 15, 0.50)",
            },
            'extraLarge': {
                marginTop: '10%',
                position: 'absolute',
                color: '#fff',
                width: '100%',
                fontSize: '3.8vw',
                fontFamily: GraphChart.font.newmainFont,
                fontVariant: 'small-caps',
                fontWeight: 100,
                letterSpacing: '5px',
                lineHeight: '5vw',
                wordSpacing: '10px',
                textAlign: 'center',
                zIndex: 2,
                textShadow: "1px 1px 1px rgba(0, 8, 15, 0.50)",
            },
            'bigger': {
                marginTop: '10%',
                position: 'absolute',
                color: '#fff',
                width: '100%',
                fontSize: '105px',
                fontFamily: GraphChart.font.newmainFont,
                fontVariant: 'small-caps',
                fontWeight: 100,
                letterSpacing: '5px',
                lineHeight: '121px',
                wordSpacing: '10px',
                textAlign: 'center',
                zIndex: 2,
                textShadow: "1px 1px 1px rgba(0, 8, 15, 0.50)"
            }

        },
        overlay: {
            position: "absolute",
            zIndex: 3,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(17,31,46,0.4)"
        }


    }
    ;