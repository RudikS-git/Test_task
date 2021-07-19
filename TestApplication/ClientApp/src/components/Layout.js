import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Layout.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container className="layout__container">
          {this.props.children}
        </Container>
          <NotificationContainer />
      </div>
    );
  }
}
