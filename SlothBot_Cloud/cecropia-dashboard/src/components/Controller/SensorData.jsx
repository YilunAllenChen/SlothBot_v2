import React from "react";
import { connect } from "react-redux";
import DB from "../../apis/database";
import { Line } from "react-chartjs-2";
import { Container, FormSelect } from "shards-react";

import {
  setVisualization,
  setVisualizedSensorDataView,
} from "../../store/store";
import _, {sortBy } from "lodash";

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
      if (!this.props.activeAgent || this.props.activeAgent === "select") {
        return <div>Please select an agent.</div>;
      }
      this.dataListener(); // unhook the current listener
      this.dataListener = DB.doc(this.props.activeAgent).onSnapshot((doc) => {
        let grouped = {};
        doc = doc.data().env_data;

        for (let [ts, dp] of Object.entries(doc))
          Object.assign(dp, { timestamp: parseInt(ts) });
        let buckets = _.mapValues(_.groupBy(doc, "type"), (dlist) =>
          dlist.map((dpoint) => _.omit(dpoint, "type"))
        );
        for (let [dname, bucket] of Object.entries(buckets)) {

          // downsample as needed
          if(bucket.length > 100){
            bucket = bucket.filter(function(_value, index, _Arr) {
                return index % 3 === 0;
            });
          }

          // sort bucket by timestamp
          bucket = sortBy(bucket, "timestamp");
          

          // process timestamp into readable dates
          function getLocaleDate(input){
             return new Date(input.timestamp).toLocaleDateString();
          }

          // prepare visualization data
          grouped[dname] = {
            labels: _.map(bucket, getLocaleDate),
            datasets: [
              {
                label: dname,
                data: _.map(bucket, "data"),
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
              },
            ],
          };
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
        selections.push(<option value={dataType} selected={this.props.selectedDataView===dataType} >{dataType}</option>);
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
