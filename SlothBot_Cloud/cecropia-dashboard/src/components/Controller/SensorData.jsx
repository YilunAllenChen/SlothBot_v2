import React from "react";
import { connect } from "react-redux";
import DB from "../../apis/database";
import { Line } from "react-chartjs-2";
import { Container, FormSelect } from "shards-react";

import {
  setVisualization,
  setVisualizedSensorDataView,
} from "../../store/store";
import _ from "lodash";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 5,
      },
    },
  },
};

class SensorData extends React.Component {
  constructor(props) {
    super(props);

    this.dataListener = () => {};
  }

  componentWillUnmount() {
    this.dataListener(); // unhook the listener
  }

  render() {
    if (!this.props.agentDataReady) {
      if(!this.props.activeAgent  || this.props.activeAgent === "select") {
        return <div>Please select an agent.</div>
      }
      this.dataListener(); // unhook the current listener
      this.dataListener = DB.doc(this.props.activeAgent).onSnapshot((doc) => {
        let grouped = {};
        doc = doc.data().env_data;

        var newGrouped = _.mapValues(_.groupBy(doc, 'type'),
                          clist => clist.map(dp => _.omit(dp, 'type')));
        console.log(newGrouped)

        for (let ts in doc) {
          if (!(doc[ts]["type"] in grouped))
            grouped[doc[ts]["type"]] = {
              labels: [],
              datasets: [
                {
                  label: doc[ts]["type"],
                  data: [],
                  fill: false,
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgba(255, 99, 132, 0.2)",
                },
              ],
            };

          grouped[doc[ts]["type"]].labels.push(
            new Date(parseInt(ts)).toLocaleTimeString()
          );
          grouped[doc[ts]["type"]].datasets[0].data.push(doc[ts]["data"]);
        }
        this.props.dispatch(
          setVisualization({
            agentDataChart: grouped,
            agentDataReady: true,
            selectedDataView: Object.keys(grouped)[0],
          })
        );
      });
    }
    if (!this.props.agentDataReady) {
      return <div>Loading...</div>;
    } else {
      let selections = [];
      for (let dataType of Object.keys(this.props.agentDataChart)) {
        selections.push(<option value={dataType}>{dataType}</option>);
      }
      return (
        <Container>
          <FormSelect
            onChange={(event) => {
              this.props.dispatch(
                setVisualizedSensorDataView(event.target.value)
              );
            }}
          >
            {selections}
          </FormSelect>
          <Line
            data={this.props.agentDataChart[this.props.selectedDataView]}
            options={options}
          />
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  activeAgent: state.controller.activeAgent,
  agentDataReady: state.controller.agentDataReady,
  agentDataChart: state.controller.agentDataChart,
  selectedDataView: state.controller.selectedDataView,
});

export default connect(mapStateToProps)(SensorData);
