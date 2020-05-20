import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";

import Loader from "react-loader-spinner";

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
        <button type="submit">REGISTER</button>
      )}
    </form>
  );
}

export default withRouter(Register);
