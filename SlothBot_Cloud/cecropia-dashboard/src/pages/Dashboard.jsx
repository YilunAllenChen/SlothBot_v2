import React, { useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
} from "shards-react";

import DB from "../apis/database";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toPage, selectActiveAgentAndUnreadyData } from "../store/store";

const cardStyle = {
  margin: "10px",
};

export default function BasicCardExample() {
  const dispatch = useDispatch();

  let [dataReady, setDataReady] = useState(false);
  let [data, setData] = useState([]);

  function handleConnect(agent_id) {
    dispatch(selectActiveAgentAndUnreadyData(agent_id));
    dispatch(toPage("controller"));
  }

  const handleRefreshListOfAgents = () => {
    console.log("refreshing");
    setDataReady(false);
    DB.get().then((data) => {
      let all_agents = [];
      data.docs.forEach((doc) => {
        all_agents.push(doc.data());
      });
      setData(all_agents);
      setDataReady(true);
    });
  };


  // autorefresh
  // useEffect(()=>{
  //   const intervalHook = setInterval(handleRefreshListOfAgents, 3000);
  //   return function cleanup(){
  //     clearInterval(intervalHook);
  //   }
  // })




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

  let all_cards = [];
  for (let agent of data) {
    let online;
    let button;
    if (agent.state.heartbeat > Date.now() - 300 * 1000) {
      online = (
        <Badge outline theme="success">
          ONLINE
        </Badge>
      );
      button = <Button onClick={() => handleConnect(agent.id)}>Control</Button>;
    } else {
      online = (
        <Badge outline theme="light">
          OFFLINE
        </Badge>
      );
      button = (
        <Button
          outline
          theme="dark"
          onClick={() => handleConnect(agent.id)}
          disabled
        >
          Control
        </Button>
      );
    }

    all_cards.push(
      <ListGroupItem>
        <Row className="black">
          <Col xs="12" md="6" lg="9">
            {agent.id}
          </Col>
          <Col xs="6" md="3" lg="1">
            <Row style={{ top: "25%", position: "absolute" }}>
              <Col>{online}</Col>
            </Row>
          </Col>
          <Col xs="6" md="3" lg="2">
            {button}
          </Col>
        </Row>
        {/* <ListGroupItemHeading>{agent.id}</ListGroupItemHeading> */}
        {/* <ListGroupItemText>{online}</ListGroupItemText> */}
      </ListGroupItem>
      // <Col sm="12" md="4">
      //   <Card className="black" style={cardStyle}>
      //     <CardHeader>{agent.id}</CardHeader>
      //     <CardBody>
      //       <CardTitle>{online}</CardTitle>
      //       <Button onClick={()=>handleConnect(agent.id)}>Connect</Button>
      //     </CardBody>
      //   </Card>
      // </Col>
    );
  }

  return (
    <Container>
      <hr />
      <Row>
        <Col xs="12" md="10">
          <h1 className="white">The SlothBot Network</h1>
        </Col>
        <Col xs='12' md='2'>
                    <Button
            theme="info"
            // style={{ width: "100%" }}
            onClick={handleRefreshListOfAgents}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
      </Row>
      <Row>
        <ListGroup style={{ width: "100%" }}>{all_cards}</ListGroup>
        {/* {all_cards} */}
      </Row>
    </Container>
  );
}
