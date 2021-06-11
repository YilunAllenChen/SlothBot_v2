import React from "react";
import { ListGroup, ListGroupItem } from "shards-react";
import { connect } from "react-redux";
import DB from "../../apis/database";
import "./InstructionList.css";

import { setFetchedAgentInstruction } from "../../store/store";

class RobotController extends React.Component {
  constructor(props) {
    super(props);

    this.dataListener = () => {};
  }

  componentWillUnmount() {
    this.dataListener(); // unhook the listener
  }

  render() {
    if (!this.props.agentInstructionsReady) {
      if(!this.props.activeAgent  || this.props.activeAgent === "select") {
        return <div>Please select an agent.</div>
      }
      this.dataListener(); //unhook the listener
      this.dataListener = DB.doc(this.props.activeAgent).onSnapshot(
        (docSnapshot) => {
          this.props.dispatch(
            setFetchedAgentInstruction({
              agentInstructions: docSnapshot.data().instructions,
              agentInstructionsReady: true
            })
          );
        }
      );
    }
    let instructions = [];
    let uniqueKey = 0;
    if (this.props.agentInstructionsReady) {
      let data = this.props.agentInstructions;
      for (let instruction of data) {
        instructions.push(
          <ListGroupItem className="SmallPaddingInstruction" key={uniqueKey++}>
            {instruction}
          </ListGroupItem>
        );
      }
      if (instructions.length === 0) {
        instructions.push(
          <ListGroupItem className="SmallPaddingInstruction" key="empty">
            Instruction Queue is empty
          </ListGroupItem>
        );
      }
    } else {
      instructions = <ListGroupItem>Loading...</ListGroupItem>;
    }
    return (
      <ListGroup className="black SmallPaddingInstruction">
        {instructions}
      </ListGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  activeAgent: state.controller.activeAgent,
  agentInstructions: state.controller.agentInstructions,
  agentInstructionsReady: state.controller.agentInstructionsReady,
});

export default connect(mapStateToProps)(RobotController);
