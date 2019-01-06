import React, {Component} from 'react';
import {ChatBot, ControlledTabs} from '../containers';
import {Grid, Col, Row} from 'react-bootstrap';
import Campk12 from '../campk12';

export default class App extends Component {
  componentDidMount() {
    window.Campk12 = Campk12;
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid" id="wrapper">
          <Col xs={12} md={6}>
            <ControlledTabs />
          </Col>
          <Col xs={12} md={6}>
            <ChatBot />
          </Col>
        </Row>
      </Grid>
    );
  }
}
