import React from "react";

const Home = () => {
  return (
    <div>
      <button onClick={() => (window.location.href = "/login")}>login</button>
      <button onClick={() => (window.location.href = "/register")}>
        Register
      </button>
    </div>
  );
};

export default Home;
