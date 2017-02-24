import React                  from 'react';
import _                      from 'underscore';
import Icon                   from './Icon';
import classNames              from 'classnames';

export default class PasswordValidator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            minCharacters: this.props.minCharacters,
            requireCapitals: this.props.requireCapitals,
            requireNumbers: this.props.requireNumbers,
            forbiddenWords: this.props.forbiddenWords,
            name: this.props.name
        };
    }

    render() {
        var validatorClass = classNames('', {
            'password_validator': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });
        if (!_.isEmpty((this.state.forbiddenWords))) {
            var forbiddenWords = this.state.forbiddenWords.map(function (word, i) {
                return (
                    <span key={i} className="bad_word">
          "{word}"
        </span>
                )
            });
        }
        else {
            var forbiddenWords = []
        }


        var validatorTitle;

        if (this.props.valid) {
            validatorTitle =
                <h4 className="validator_title valid">
                    {this.props.name} IS OK
                </h4>
        } else {
            validatorTitle =
                <h4 className="validator_title invalid">
                    {this.props.translate_error.norme}
                </h4>
        }

        var li_min_char;
        if (this.state.minCharacters > 0) {
            li_min_char = <li className={classNames('',{'valid': this.props.validData.minChars})}>
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span
                    className="error_message">{this.state.minCharacters + " " + this.props.translate_error.num_min}</span>
            </li>
        }
        var li_capitalLetters;
        if (this.state.requireCapitals > 0) {
            li_capitalLetters = <li className={classNames('',{'valid': this.props.validData.capitalLetters})}>
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span
                    className="error_message">{this.props.translate_error.one_capital + "" + this.state.requireCapitals + " " + this.props.translate_error.cap}</span>
            </li>
        }
        var li_requireNumbers;
        if (this.state.requireNumbers > 0) {
            li_requireNumbers = <li className={classNames('',{'valid': this.props.validData.numbers})}>
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span
                    className="error_message">{this.props.translate_error.one_capital + "" + this.state.requireNumbers + " " + this.props.translate_error.number}</span>
            </li>
        }
        var li_words;
        if (!_.isEmpty((this.state.forbiddenWords))) {
            li_words = <li className={classNames('',{'valid': this.props.validData.words})}>
                <i className="icon_valid"> <Icon type="circle_tick_filled"/> </i>
                <i className="icon_invalid"> <Icon type="circle_error"/> </i>
                <span className="error_message">{this.props.translate_error.cannotbe} {forbiddenWords}</span>
            </li>
        }


        return (
            <div className={validatorClass}>
                <div className="validator_container">

                    {validatorTitle}

                    <ul className="rules_list">
                        {li_min_char}
                        {li_capitalLetters}
                        {li_requireNumbers}
                        {li_words}


                    </ul>
                </div>
            </div>
        )

    }
}
