import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/index";
import Javascript from "./components/Javascript";
import Python from "./components/Python";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const Root = () => (
  <Router basename="/newsapp/">
    <div>
      <Navbar collapseOnSelect bg="light" variant="light" expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/">
          News App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/javascript" activeClassName="active">
              JavaScript
            </Nav.Link>
            <Nav.Link as={NavLink} to="/python" activeClassName="active">
              Python
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route exact path="/" component={App} />
      <Route exact path="/javascript" component={Javascript} />
      <Route exact path="/python" component={Python} />
    </div>
  </Router>
);

const About = () => (
  <div>
    <h1>This is about page...</h1>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
