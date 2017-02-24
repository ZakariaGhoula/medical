import _ from "underscore";
import {WEBRoot} from "./../../constants/DefaultConstants";

let Api = {
    getContent(file, language = 'en') {
        var content = require('json!./../../../../public/lang/V1/' + file + '.json');
          var data = _.find(content, function (obj) {
            return (language.indexOf(obj.lang) > -1);
        });
        return data;
    }
};

module.exports = Api;