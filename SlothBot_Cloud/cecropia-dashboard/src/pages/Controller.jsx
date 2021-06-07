import React, { useState } from "react";
import { Col, Container, Row, Button, FormSelect } from "shards-react";

import InstructionList from "../components/Controller/InstructionList";
import SensorData from "../components/Controller/SensorData";
import CommandBank from "../components/Controller/CommandBank";
import { useDispatch } from "react-redux";
import { selectActiveAgentAndUnreadyData } from "../store/store";

import DB from "../apis/database";

export default function BasicCardExample() {
  const dispatch = useDispatch();

  const handleChangeOption = (e) => {
    console.log(e.target.value);
    dispatch(selectActiveAgentAndUnreadyData(e.target.value));
  };

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

  let options = [<option value={null} disabled>Please Select</option>];
  data.forEach((agent_id) => {
    options.push(<option value={agent_id}>{agent_id}</option>);
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
          </Row>
          <Row>
            <CommandBank />
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
