import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  CardHeader,
  CardBody,
  CardTitle,
  CardImg,
  CardFooter,
} from "shards-react";

import Egerstedt from "../media/Egerstedt.jpg";
import Allen from "../media/Allen.jpg";
import Carmen from "../media/Carmen.jpg";
import Yousef from "../media/youssef.jpg";

const cardStyle = {
  margin: "10px",
};

export default function BasicCardExample() {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col sm="6" md="3">
              <Card className="black" style={cardStyle}>
                <CardHeader>Faculty Advisor</CardHeader>
                <CardBody>
                  <CardTitle>Dr. Magnus Egerstedt</CardTitle>
                  <CardImg style={{ width: "100%" }} src={Egerstedt} />
                </CardBody>
              </Card>
            </Col>
            <Col sm="6" md="9">
              <Card>
                <CardBody width="100%">
                  <CardImg width="90%" src="http://gritslab.gatech.edu/home/wp-content/uploads/2011/12/gritslogo-header1.png" />
                </CardBody>
                <CardFooter className="black">
                  <p>
                    The Georgia Robotics and Intelligent Systems (GRITS) Lab
                    conducts research in the general area of networked and
                    hybrid control systems, with applications to the control and
                    coordination of mobile robots. The common theme behind our
                    different research threads is that we provide theoretically
                    sound solutions to practically motivated problems.
                  </p>

                  <p>
                    To Learn more about the GRITS lab, visit:
                    http://gritslab.gatech.edu/home/about/
                  </p>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <hr color="white" />
          <Row>
            <Col sm="6" md="3">
              <Card className="black" style={cardStyle}>
                <CardHeader>Project Lead</CardHeader>
                <CardBody>
                  <CardTitle>Allen Chen</CardTitle>
                  <CardImg style={{ width: "100%" }} src={Allen} />
                </CardBody>
              </Card>
            </Col>{" "}
            <Col sm="6" md="3">
              <Card className="black" style={cardStyle}>
                <CardHeader>Team Member</CardHeader>
                <CardBody>
                  <CardTitle>Yousef Emam</CardTitle>
                  <CardImg style={{ width: "100%" }} src={Yousef} />
                </CardBody>
              </Card>
            </Col>{" "}
            <Col sm="6" md="3">
              <Card className="black" style={cardStyle}>
                <CardHeader>Team Member</CardHeader>
                <CardBody>
                  <CardTitle>Carmen Jimenez</CardTitle>
                  <CardImg style={{ width: "100%" }} src={Carmen} />
                </CardBody>
              </Card>
            </Col>
            <Col sm="6" md="3">
              <Card className="black" style={cardStyle}>
                <CardHeader>Team Member</CardHeader>
                <CardBody>
                  <CardTitle>Hannah Phillips</CardTitle>
                  {/* <CardImg style={{ width: "100%" }} src={} /> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
