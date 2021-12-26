import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();
    if (name.length && email.length && password.length) {
      console.log("datainside" + name, email, password);
      const res = await fetch("http://localhost:9999/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (data.status === "ok") {
        navigate("/login");
      }
      console.log("user data frontend" + data);
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          autoComplete="false"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <br /> <input type="submit" value="Register" />
        <a href="/login">Login</a>
      </form>
    </div>
  );
};

export default Register;
