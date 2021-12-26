import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    event.preventDefault();
    if (email.length && password.length) {
      const response = await fetch("http://localhost:9999/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.user) {
        console.log(data.user);
        localStorage.setItem("token", data.user);
        alert("Logged In successfully");
        window.location.href = "/quote";
      } else {
        alert("Please check your email and password");
      }
    } else {
      alert("please enter your email and password");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <br />{" "}
        <input
          autoComplete="false"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />{" "}
        <input
          autoComplete="false"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <input type="submit" value="Login" />
        <a href="/register">Register</a>
      </form>
    </div>
  );
};

export default Login;
