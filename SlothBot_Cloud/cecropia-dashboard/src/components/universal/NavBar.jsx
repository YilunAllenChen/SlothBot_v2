import React from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
} from "shards-react";
import "./navbar.css";

import { connect } from "react-redux";
import { toPage } from "../../store/store";

class CecropiaNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen,
      },
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen,
      },
    });
  }

  handleGoToPage(target) {
    this.props.dispatch(toPage(target));
    console.log(target);
  }

  render() {
    return (
      <Navbar type="dark" expand="md" sticky="top" style={{ backgroundColor: "#223344" }}>
        <NavbarBrand href="#">Cecropia</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                onClick={() => this.handleGoToPage("home")}
                href="#"
                active={this.props.view==="home"}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => this.handleGoToPage("dashboard")}
                href="#"
                active={this.props.view==="dashboard"}
              >
                Dashboard
              </NavLink>
            </NavItem>{" "}
            <NavItem>
              <NavLink
                onClick={() => this.handleGoToPage("controller")}
                href="#"
                active={this.props.view==="controller"}
              >
                Controller
              </NavLink>
            </NavItem>{" "}
            <NavItem>
              <NavLink
                onClick={() => this.handleGoToPage("team")}
                href="#"
                active={this.props.view==="team"}
              >
                Team
              </NavLink>
            </NavItem> {" "}           
          </Nav>

          <Nav navbar className="ml-auto">
            <InputGroup size="sm" seamless>
              <InputGroupAddon type="prepend">
                <InputGroupText>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroupText>
              </InputGroupAddon>
              <FormInput className="border-0" placeholder="Search..." />
            </InputGroup>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  view: state.view,
});

export default connect(mapStateToProps)(CecropiaNavBar);
