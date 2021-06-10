import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "shards-react";
import { connect } from "react-redux";
import DB from "../../apis/database";
import "./InstructionList.css";

const buttonStyles = {
  margin: "5px",
};

class CommandBank extends React.Component {
  fireInstructions(inst) {
    if (!this.props.activeAgent || this.props.activeAgent === "select") return;
    DB.doc(this.props.activeAgent).set(
      {
        instructions: inst,
      },
      {
        merge: true,
      }
    );
  }

  render() {
    return (
      <Card style={{ width: "100%", margin: "10px" }} className="black">
        <CardHeader>Robot Command Bank</CardHeader>
        <CardBody>
          <p>
            All instructions will be queued to the robot and executed at
            earliest convenience.
          </p>
          <Button
            style={buttonStyles}
            onClick={() => this.fireInstructions(["LED ON"])}
          >
            LED ON
          </Button>
          <Button
            style={buttonStyles}
            onClick={() => this.fireInstructions(["LED OFF"])}
          >
            LED OFF
          </Button>
          <Button
            style={buttonStyles}
            onClick={() =>
              this.fireInstructions([
                "LED ON",
                "SLEEP 1",
                "LED OFF",
                "SLEEP 1",
                "LED ON",
                "SLEEP 1",
                "LED OFF",
                "SLEEP 1",
              ])
            }
          >
            Blink
          </Button>
          <hr />
          {/* <Button
            style={buttonStyles}
            onClick={() => {
              this.fireInstructions(["READ SENSORS"]);
            }}
          >
            Read Sensors
          </Button> */}
          <Button
            style={buttonStyles}
            onClick={() => {
              this.fireInstructions(["GO"]);
            }}
          >
            GO
          </Button>
          <Button
            style={buttonStyles}
            onClick={() => {
              this.fireInstructions(["STOP"]);
            }}
          >
            STOP
          </Button>
          <Button
            style={buttonStyles}
            theme='info'
            onClick={() => {
              this.fireInstructions(["UPDATE"]);
            }}
          >
            Update
          </Button>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  activeAgent: state.controller.activeAgent,
});

export default connect(mapStateToProps)(CommandBank);
