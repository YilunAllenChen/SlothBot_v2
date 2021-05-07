import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import CanvasJSReact from "./vendors/canvasjs.react";
import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCGiPWGUd_6q5FvGy908P91AT3i7pyslHI",
  authDomain: "cecropia.firebaseapp.com",
  databaseURL: "https://cecropia-default-rtdb.firebaseio.com",
  projectId: "cecropia",
  storageBucket: "cecropia.appspot.com",
  messagingSenderId: "582360457051",
  appId: "1:582360457051:web:d75e356ec9e83ef306c47e",
  measurementId: "G-QXFS18M5T5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const booksRef = firebase.firestore().collection("sensor_data");

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charts: {},
      charts_ready: false,
    };
  }

  async getDataAndCreateCharts() {
    let grouped = {};
    await booksRef.get().then((snapshot) => {
      snapshot.docs.map((doc) => {
        doc = doc.data();
        for (let ts in doc) {
          if (!(doc[ts]["type"] in grouped)) grouped[doc[ts]["type"]] = [];
          grouped[doc[ts]["type"]].push({
            x: new Date(parseInt(ts)),
            y: doc[ts]["data"],
          });
        }
        return null;
      });
    });
    let charts = [];
    for (let key in grouped) {
      let option = {
        title: { text: key, fontFamily: "tahoma" },
        data: [
          {
            type: "scatter",
            dataPoints: grouped[key],
          },
        ],
      };
      charts.push(
        <Col md={6}>
          <Container>
            <CanvasJSChart key={key} options={option} />
          </Container>
        </Col>
      );
    }
    return charts;
  }

  componentDidMount() {
    this.getDataAndCreateCharts().then((d) => {
      this.setState({ charts: d });
      this.setState({ charts_ready: true });
      this.forceUpdate();
    });
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state.charts_ready ? this.state.charts : <p>loading...</p>}
        </Row>
      </Container>
    );
  }
}

export default DataView;
