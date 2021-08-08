import React from "react";
import {Container, Navbar, Nav, NavDropdown, } from "react-bootstrap";
import {connect}from "react-redux"
import {logout}from "../redux/actions"
import {Link} from "react-router-dom"
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <NavDropdown title={this.props.username? ` Hi ${this.props.username}` : "Dropdown"} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={this.props.logout}>{this.props.username ? "LOGOUT" : "LOGIN"}</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">REGISTER</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state)=>{
    return{
        username : state.userReducer.username

    }
}
export default connect(mapStateToProps,{logout}) (NavigationBar)