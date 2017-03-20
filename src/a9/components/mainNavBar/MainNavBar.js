import React from 'react';
import { NavLink } from 'fluxible-router';
import BaseComponent from '../../../core/components/BaseComponent';

export default class Nav extends BaseComponent {
  renderBaseComponent() {
    const selected = this.props.currentRoute;
    const links = this.props.links;

    const navStyle = {
      background: '#c0ca33',
      padding: '0px 20px',
    };

    const alertStyle = {
        position: 'relative',
    };

    const alertBadgeStyle = {
        position: 'absolute',
        top: '8px',
        right: '-15px',
    };

    const linkHTML = Object.keys(links).map((name) => {
      var className = '';
      var link = links[name];

      if (selected && selected.name === name) {
        className = 'pure-menu-selected';
      }

      return null;
    });

    return (
      <nav>
        <div style={navStyle} className="nav-wrapper ui-a9-main-nav">
          <a href="#" className="brand-logo">Buscador</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="">Info</a></li>
            <li><a href="" style={alertStyle} className="ui-a9-main-nav-alert">
                <i className="material-icons">notifications</i>
                <span style={alertBadgeStyle} className="new badge ui-a9-main-nav-alert-new">4</span>
            </a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

Nav.defaultProps = {
  selected: null,
  links: {}
};
