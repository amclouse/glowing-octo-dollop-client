import React, { useState, useEffect } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Dashboard/Home";
import Navbar from "./components/Dashboard/Sidenav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const updateToken = (token) => {
    localStorage.setItem("token", token);
    setSessionToken(token);
  };

  return (
    <Router>
      <div className="App" style={{ display: "flex" }}>
        {sessionToken === localStorage.getItem("token") ? (<Navbar token={sessionToken} clearToken={clearToken} />) : (<Auth updateToken={updateToken} />)}

        
      </div>
    </Router>
  );
}

export default App;
