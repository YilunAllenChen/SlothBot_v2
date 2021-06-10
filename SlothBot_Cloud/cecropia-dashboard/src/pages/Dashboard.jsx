import React from "react";
import {
  Card,
  Col,
  Container,
  Row,
  CardHeader,
  CardBody,
  CardTitle,
  Button
} from "shards-react";

import DB from "../apis/database"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toPage, selectActiveAgentAndUnreadyData} from "../store/store"

const cardStyle = {
  margin: "10px",
};

export default function BasicCardExample() {

  const dispatch = useDispatch();

  function handleConnect(agent_id){
    
    dispatch(selectActiveAgentAndUnreadyData(agent_id));
    dispatch(toPage("controller"));
  }


  let [dataReady, setDataReady] = useState(false);
  let [data, setData] = useState([]);

  if (!dataReady) {
    DB.get().then((data) => {
      let all_agents = [];
      data.docs.forEach((doc) => {
        all_agents.push(doc.data());
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

  let all_cards = []
  for(let agent of data){

    let online;
    if (agent.state.heartbeat > (Date.now() - 300 * 1000)){
      online = (<span style={{color: "#00AA00"}}>ONLINE</span>);
    } else {
      online = (<span style={{color: "#AAAAAA"}}>OFFLINE</span>);
    }

    all_cards.push(
        <Col sm="12" md="4">
          <Card className="black" style={cardStyle}>
            <CardHeader>{agent.id}</CardHeader>
            <CardBody>
              <CardTitle>{online}</CardTitle>
              <Button onClick={()=>handleConnect(agent.id)}>Connect</Button>
            </CardBody>
          </Card>
        </Col>
    )
  }



  return (
    <Container>
      <Row>
        {all_cards}
      </Row>
    </Container>
  );
}
