import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";

import Notes from "./components/Notes";
import Login from "./components/Login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cookies] = useCookies([]);

  return (
    <div className="App">
      <Container fluid="md">
        <Router>
          <Switch>
            <Route path="/" component={cookies.user ? Notes : Login} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
