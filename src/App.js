import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Quote from "./Pages/Quote";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <h1>MERN stack Authentication</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/quote" exact element={<Quote />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
