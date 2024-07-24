import React from "react";
import CustomerComponent from "../../components/customer";
import { Container, Row, Col } from "react-bootstrap";

export default function CustomerScreen() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <CustomerComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
}
