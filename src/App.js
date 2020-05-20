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
import NotFound from "./components/NotFound";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Container fluid="md">
        <Router>
          <NoteProvider>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/notes" />} />
              <Route path="/notes" component={Notes} />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </NoteProvider>
        </Router>
      </Container>
    </div>
  );
}

export default App;
