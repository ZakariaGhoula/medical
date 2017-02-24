import React from 'react';
import { Link } from 'react-router';

export default class SidebarItem extends React.Component {
    render() {

        var classNameLi = this.props.is_active?"active":"no-active"
        return (

            <li className={classNameLi}><Link to={this.props.link_to}><span className={"font "+this.props.font_name}></span><span className="text">{this.props.title}</span>
            </Link></li>

        );
    }

}


