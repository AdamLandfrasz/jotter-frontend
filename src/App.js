import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { NoteProvider } from "./context/noteContext";
import { InputExpandedProvider } from "./context/inputExpandedContext";
import Notes from "./components/Notes";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import NotFound from "./components/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NoteProvider>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/notes" />} />
            <Route
              path="/notes"
              render={() => {
                return (
                  <InputExpandedProvider>
                    <Notes />
                  </InputExpandedProvider>
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </NoteProvider>
      </Router>
    </div>
  );
}

export default App;
