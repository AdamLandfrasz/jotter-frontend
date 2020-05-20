import React from "react";
import Container from "react-bootstrap/Container";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { NoteProvider } from "./context/noteContext";
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
            <NoteProvider>
              <Route
                exact
                path="/"
                render={(props) => <Redirect to="/notes" />}
              />
              <Route path="/notes" component={Notes} />
              <Route path="/login" component={Login} />
            </NoteProvider>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
