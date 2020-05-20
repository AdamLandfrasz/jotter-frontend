import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import Loader from "react-loader-spinner";

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
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          autoComplete="off"
          name="email"
          id="login-email"
          placeholder="E-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="login-password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLoading ? (
          <Loader type="TailSpin" color="#000" />
        ) : (
          <button type="submit">SIGN IN</button>
        )}
      </form>
      <Link to="/register">REGISTER</Link>
    </React.Fragment>
  );
}

export default Login;
