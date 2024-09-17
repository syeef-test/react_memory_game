import React from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";

function Navigation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(authActions.logout());
    alert("Logout Succesful");
    history.push("/signin");
  };

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">React Memory Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuth && <NavLink to="/signup">Signup</NavLink>}
          </Nav>
          <Nav className="me-auto">
            {!isAuth && <NavLink to="/signin">Signin</NavLink>}
          </Nav>
          <Nav className="me-auto">
            {isAuth && <NavLink to="/home">Home</NavLink>}
          </Nav>
          <Nav className="me-auto">
            {isAuth && <NavLink to="/game">Start Game</NavLink>}
          </Nav>

          {isAuth && (
            <Button
              variant="danger"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
        <ul></ul>
      </Container>
    </Navbar>
  );
}

export default Navigation;
