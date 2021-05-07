import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import React from "react"

import FrontPage from './views/frontpage'
import DataView from './views/dataview'
import Intro from './views/intro'
import Features from './views/features'
import Team from './views/team'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "view": "main" };
  }

  render() {

    let main;
    switch (this.state.view) {
      case "data":
        main = <DataView />;
        break;
      case "intro":
        main = <Intro />;
        break;
      case "features":
        main = <Features />;
        break;
      case "team":
        main = <Team />;
        break;
      default:
        main = <FrontPage />;
        break;
    }

    return (
      <div className="App">
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand onClick={()=>{this.setState({view: 'main'})}} href="#home">
            Cecropia
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={()=>{this.setState({view: "intro"})}} href="#SlothBot">SlothBot</Nav.Link>
              <Nav.Link onClick={()=>{this.setState({view: "features"})}} href="#Features">Features</Nav.Link>
              <Nav.Link onClick={()=>{this.setState({view: "data"})}} href="#Monitoring">Monitoring</Nav.Link>
              <Nav.Link onClick={()=>{this.setState({view: "team"})}} href="#Team">Team</Nav.Link>

              {/* <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={()=>{this.setState({view: 'data'})}} href="#action/3.1">Data Ingestion</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Monitoring</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Control Panel</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Some other stuff</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

            <Nav>
              <Nav.Link href="#deets">some other link</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                idk
          </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {main}
      </div>
    );
  }
}


export default App;
