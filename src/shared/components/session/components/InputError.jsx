
import React                  from 'react';
import _                      from 'underscore';
import classNames              from 'classnames';



export default class InputError extends React.Component {
  constructor(props) {
    super(props);

    this.message = 'Input is invalid';
  }



  render() {
    var errorClass =classNames('',{
      'error_container':   true,
      'visible':           this.props.visible,
      'invisible':         !this.props.visible
    });
    return (
        <div className={errorClass}>
          <span>{this.props.errorMessage}</span>
        </div>

    )

  }
}

