import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Redirect, withRouter, Link } from "react-router-dom";
import axios from "axios";

import formStyles from "./Form.module.css";
import containerStyles from "./Container.module.css";
import buttonStyles from "./Button.module.css";

import { Form, Row, Col } from "react-bootstrap";

function Register(props) {
  const [cookies] = useCookies(["user"]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsLoading(false);
        props.history.push("/login");
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return cookies.user ? (
    <Redirect to="/notes" />
  ) : (
    <div className={containerStyles.container}>
      <Form onSubmit={handleSubmit} className={formStyles.form}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Label>E-mail address</Form.Label>
            <Form.Control
              type="email"
              autoComplete="off"
              name="email"
              id="register-email"
              placeholder="E-mail..."
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="register-password"
              placeholder="Password..."
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <button
              disabled={isLoading}
              type="submit"
              className={buttonStyles.button}
            >
              {isLoading ? "Loading…" : "Register"}
            </button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center">
            <span>Already have an account? </span>
            <Link to="/login">Log In</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default withRouter(Register);
