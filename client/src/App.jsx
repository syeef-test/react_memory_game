import { useState } from "react";

import "./App.css";

function App() {
  return (
    <main>
      <h1>Memory Game</h1>

      <div>
        <h2>Score:0</h2>

        <button>Hint</button>
      </div>

      <div className="container">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front"></div>
            <div className="flip-card-back">
              <h1>John Doe</h1>
              <p>Architect & Engineer</p>
              <p>We love that guy</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
