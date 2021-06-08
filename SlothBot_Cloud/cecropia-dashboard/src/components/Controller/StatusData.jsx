import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "shards-react";
import { connect } from "react-redux";
import DB from "../../apis/database";
import "./InstructionList.css";

import { setAgentStatusData } from "../../store/store";

class CommandBank extends React.Component {
  constructor(props) {
    super(props);
    this.dataListener = () => {};
  }

  componentWillUnmount() {
    this.dataListener(); // unhook the listener
  }

  render() {
    if (!this.props.agentStatusReady) {
      if (!this.props.activeAgent) {
        return <div>Please select an agent.</div>;
      }
      this.dataListener(); //unhook the listener
      this.dataListener = DB.doc(this.props.activeAgent).onSnapshot(
        (docSnapshot) => {
          this.props.dispatch(
            setAgentStatusData({
              agentStatus: docSnapshot.data().state,
              agentStatusReady: true,
            })
          );
        }
      );
      return <div>loading...</div>
    }

    let lastHeartBeatTime = new Date(this.props.agentStatus.heartbeat);


    return (
      <Card style={{ width: "100%", margin: "10px" }} className="black">
        <CardHeader>Robot Status</CardHeader>
        <CardBody>
          <p>Last Heartbeat: {lastHeartBeatTime.toLocaleString()}</p>
          <p>IP Address: {this.props.agentStatus.ip_addr}</p>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  activeAgent: state.controller.activeAgent,
  agentStatus: state.controller.agentStatus,
  agentStatusReady: state.controller.agentStatusReady,
});

export default connect(mapStateToProps)(CommandBank);
