import React from "react";
import { connect } from "react-redux";
import DB from "../../apis/database";
import { Line } from "react-chartjs-2";
import { Container, FormSelect } from "shards-react";

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
    this.state = {
      agentData: null,
      agentDataReady: false,
      selectedDataView: null,
    };
  }

  componentDidMount() {
    this.dataListener = DB.doc("AGENT_0xdca632abbe28").onSnapshot(
      (doc) => {
        let grouped = {};
        doc = doc.data().env_data;
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
            new Date(parseInt(ts)).toLocaleDateString()
          );
          grouped[doc[ts]["type"]].datasets[0].data.push(doc[ts]["data"]);
        }
        this.setState({
          agentData: grouped,
          agentDataReady: true,
          selectedDataView: Object.keys(grouped)[0]
        });
      }

      // {
      //   console.log(docSnapshot.data());
      //   this.setState({
      //     agentData: docSnapshot.data(),
      //     agentDataReady: true,
      //   });
      // }
    );
  }

  componentWillUnmount() {
    this.dataListener(); // unhook the listener
  }

  render() {
    if (!this.state.agentDataReady) {
      return <div>Loading...</div>;
    } else {
      let selections = [];
      for (let dataType of Object.keys(this.state.agentData)) {
        selections.push(<option value={dataType}>{dataType}</option>);
      }
      return (
        <Container>
          <FormSelect
            onChange={(event) => {
              this.setState({ selectedDataView: event.target.value });
              console.log(event.target.value);
            }}
          >
            {selections}
          </FormSelect>
          <Line
            data={this.state.agentData[this.state.selectedDataView]}
            options={options}
          />
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  activeAgent: state.controller.activeAgent,
});

export default connect(mapStateToProps)(SensorData);
