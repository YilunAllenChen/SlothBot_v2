import React from "react";
import { ListGroup, ListGroupItem } from "shards-react";
import { connect } from "react-redux";
import DB from "../../apis/database";
import "./InstructionList.css"


class RobotController extends React.Component {
  constructor(props) {
    super(props);

    this.dataListener = () => {};

    this.state = {
      agentData: null,
      agentDataReady: false,
    };
  }

  componentDidMount() {
    this.dataListener = DB.doc("AGENT_0xdca632abbe28").onSnapshot(
      (docSnapshot) => {
        console.log(docSnapshot.data());
        this.setState({
          agentData: docSnapshot.data(),
          agentDataReady: true,
        });
      }
    );
  }

  componentWillUnmount() {
    this.dataListener(); // unhook the listener
  }

  render() {
    let instructions = [];
    let uniqueKey = 0;
    if (this.state.agentDataReady) {
      let data = this.state.agentData;
      for (let instruction of data.instructions) {
        instructions.push(
          <ListGroupItem className="SmallPaddingInstruction" key={uniqueKey++}>{instruction}</ListGroupItem>
        );
      }
      if (instructions.length === 0) {
        instructions.push(
          <ListGroupItem className="SmallPaddingInstruction" key="empty">Instruction Queue is empty</ListGroupItem>
        );
      }
    } else {
      instructions = <ListGroupItem>Loading...</ListGroupItem>;
    }
    return <ListGroup className="black SmallPaddingInstruction">{instructions}</ListGroup>;
  }
}

const mapStateToProps = (state) => ({
  activeAgent: state.controller.activeAgent,
});

export default connect(mapStateToProps)(RobotController);
