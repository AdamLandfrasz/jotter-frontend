import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Notes from "./components/Notes";
import Login from "./components/Login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Container fluid="md">
        <Router>
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
