import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import formStyles from "./Form.module.css";
import buttonStyles from "../Button.module.css";
import containerStyles from "../Container.module.css";

import { Form, Row, Col } from "react-bootstrap";

function Login() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsLoading(false);
        const user = response.data.existingUser;
        setCookie(
          "user",
          { id: user._id, email: user.email },
          { expires: new Date(Date.now() + 60 * 60000) }
        );
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
          <Col>
            <Form.Label>E-mail address</Form.Label>
            <Form.Control
              type="email"
              autoComplete="off"
              name="email"
              id="login-email"
              placeholder="E-mail..."
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="login-password"
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
              className={buttonStyles.blockButton}
            >
              {isLoading ? "Loading…" : "Log In"}
            </button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="text-center">
            <span>Don't have an account yet? </span>
            <Link to="/register">Register</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Login;
