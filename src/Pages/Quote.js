import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const Quote = () => {
  const history = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  const populateQuote = async () => {
    const req = await fetch("http://localhost:9999/api/quote", {
      headers: { "x-access-token": localStorage.getItem("token") },
    });

    const data = await req.json();
    console.log(data);

    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        history("/login");
      } else {
        populateQuote();
      }
    }
  }, []);

  const updateQuote = async (event) => {
    event.preventDefault();
    const req = await fetch("http://localhost:9999/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await req.json();
    console.log(data);

    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  };
  return (
    <div>
      <h1>Your Quote: {quote || "No quote found"}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update Quote" />
      </form>
      <button
        onClick={() => {
          localStorage.setItem("token", "");
          window.location.href = "/";
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Quote;
