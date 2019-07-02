import React, { Component } from 'react'
import Navigation from './view/Navigation.js'
import {Container, Col, Row} from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col md={10}>
            <legend>Transponder Query Generator (Postman):</legend>
            <Navigation/>
          </Col>
        </Row>
      </Container>
    )  
  }
}

export default App