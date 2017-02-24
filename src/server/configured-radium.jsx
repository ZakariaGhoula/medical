var Radium = require('radium');

var _matchMedia = null;

function ConfiguredRadium(component) {
    return Radium({
        matchMedia: _matchMedia
    })(component);
}

ConfiguredRadium.setMatchMedia = function (matchMedia) {
    _matchMedia = matchMedia;
};

module.exports = ConfiguredRadium;