import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Login() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        const user = response.data.existingUser;
        setCookie("user", { id: user._id, email: user.email });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return cookies.user ? (
    <Redirect to="/" />
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
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
      <button type="submit">SIGN IN</button>
    </form>
  );
}

export default Login;
