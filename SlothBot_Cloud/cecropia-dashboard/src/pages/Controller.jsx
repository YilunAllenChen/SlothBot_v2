import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  FormSelect,
} from "shards-react";

import InstructionList from "../components/Controller/InstructionList";
import { useSelector } from "react-redux";

import DB from "../apis/database";

const activeAgentSelector = (state) => state.controller.activeAgent;

export default function BasicCardExample() {
  const activeAgent = useSelector(activeAgentSelector);
  return (
    <Container>
      <Row>
        <Col xs="12" md="6">
          <Row>
            <Col xs="8" lg="9">
              <FormSelect>
                <option value="first">{activeAgent}</option>
                <option value="third" disabled>
                  This feature is under development
                </option>
              </FormSelect>
            </Col>
            <Col xs="4" lg="3">
              <Button style={{ width: "100%", height: "100%" }}>Connect</Button>
            </Col>
          </Row>
          <Row>
            <Card style={{ width: "100%", margin: "10px" }} className="black">
              <CardHeader>Robot Controller</CardHeader>
              <CardBody>
                <p>
                  All instructions will be queued to the robot and executed at
                  earliest convenience.
                </p>
                <Button
                  onClick={() => {
                    DB.doc("AGENT_0xdca632abbe28").set({
                      instructions: [
                        "LED ON",
                        "SLEEP 1",
                        "LED OFF",
                        "SLEEP 1"
                      ]
                    }, { merge: true });
                  }}
                >
                  Blink
                </Button>
              </CardBody>
              <CardFooter>Card footer</CardFooter>
            </Card>
          </Row>
        </Col>
        <Col xs="12" md="6">
          <InstructionList></InstructionList>
        </Col>
      </Row>
    </Container>
  );
}
