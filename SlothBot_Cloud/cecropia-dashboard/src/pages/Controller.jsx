import React, { useState } from "react";
import { Col, Container, Row, Button, FormSelect } from "shards-react";

import InstructionList from "../components/Controller/InstructionList";
import SensorData from "../components/Controller/SensorData";
import CommandBank from "../components/Controller/CommandBank";
import StatusData from "../components/Controller/StatusData";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveAgentAndUnreadyData } from "../store/store";

import DB from "../apis/database";

const activeAgentSelector = (state) => state.controller.activeAgent

export default function BasicCardExample() {
  const dispatch = useDispatch();
  let activeAgent = useSelector(activeAgentSelector);

  const handleChangeOption = (e) => {
    console.log(e.target.value);
    dispatch(selectActiveAgentAndUnreadyData(e.target.value));
  };

  const handleRefreshListOfAgents = () => {
    console.log("refreshing")
    setDataReady(false);
    DB.get().then((data) => {
      let all_agents = [];
      data.docs.forEach((doc) => {
        all_agents.push(doc.id);
      });
      setData(all_agents);
      setDataReady(true);
    });
  }

  let [dataReady, setDataReady] = useState(false);
  let [data, setData] = useState([]);

  if (!dataReady) {
    DB.get().then((data) => {
      let all_agents = [];
      data.docs.forEach((doc) => {
        all_agents.push(doc.id);
      });
      setData(all_agents);
      setDataReady(true);
    });
    return (
      <Container>
        <Row>Loading...</Row>
      </Container>
    );
  }

  let options = [<option value={"select"}>Please Select</option>];
  data.forEach((agent_id) => {
    options.push(<option value={agent_id} selected={activeAgent===agent_id}>{agent_id}</option>);
  });

  return (
    <Container>
      <Row>
        <Col xs="12" md="6">
          <h3 className="white">Command Center</h3>
          <Row>
            <Col xs="8" lg="9">
              <FormSelect onChange={handleChangeOption}>{options}</FormSelect>
            </Col>
            <Col xs='4' lg='3'>
              <Button theme='info' style={{width: '100%'}} onClick={handleRefreshListOfAgents}>Refresh</Button>
            </Col>
          </Row>
          <Row>
            <CommandBank />
          </Row>
          <Row>
            <StatusData />
          </Row>
        </Col>
        <Col xs="12" md="6">
          <h3 className="white">Sensor Data</h3>
          <SensorData />
          <hr />
          <h3 className="white">Instruction Queue</h3>
          <InstructionList></InstructionList>
        </Col>
      </Row>
    </Container>
  );
}
