import React from "react";
import NavBar from "./components/universal/NavBar";
import "./MainLayout.css"
import { connect } from "react-redux"


import Home from "./pages/Home";
import Controller from "./pages/Controller";
import Team from "./pages/Team"

class App extends React.Component {


  render() {
    let main;
    switch (this.props.view) {
      case "home":
        main = <Home />;
        break;
      case "controller":
        main = <Controller />
        break;
      case "team":
        main = <Team />
        break;
      default:
        main = <div>default</div>
        break;
    }

    return (
      <div className="App">
        <div className="topbar">
          <NavBar />
        </div>
        <div className="mainContent">{main}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  view: state.view
});

export default connect(mapStateToProps)(App);
