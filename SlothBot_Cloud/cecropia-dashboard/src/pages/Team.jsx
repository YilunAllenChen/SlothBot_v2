import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  CardHeader,
  CardBody,
  CardTitle,
} from "shards-react";

const cardStyle = {
  margin: "10px",
};

export default function BasicCardExample() {
  return (
    <Container>
      <Row>
        <Col sm="12" md="4">
          <Card className="black" style={cardStyle}>
            <CardHeader>Faculty Advisor</CardHeader>
            <CardBody>
              <CardTitle>Dr. Magnus Egerstedt</CardTitle>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col sm="12" md="4">
          <Card className="black" style={cardStyle}>
            <CardHeader>Project Lead</CardHeader>
            <CardBody>
              <CardTitle>Allen Chen</CardTitle>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col sm="12" md="4">
          <Card className="black" style={cardStyle}>
            <CardHeader>Team Member</CardHeader>
            <CardBody>
              <CardTitle>Yousef Emam</CardTitle>
            </CardBody>
          </Card>
        </Col>{" "}
        <Col sm="12" md="4">
          <Card className="black" style={cardStyle}>
            <CardHeader>Team Member</CardHeader>
            <CardBody>
              <CardTitle>Carmen Jimenez</CardTitle>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="4">
          <Card className="black" style={cardStyle}>
            <CardHeader>Team Member</CardHeader>
            <CardBody>
              <CardTitle>Hannah Phillips</CardTitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
