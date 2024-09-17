import { useState, useEffect, useRef, useMemo } from "react";

import "./App.css";
import GameComponent from "./pages/GameComponent";
import Navigation from "./components/Navigation";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/home">
            <Signin />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
