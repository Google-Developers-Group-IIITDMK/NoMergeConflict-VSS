import React from "react";

import Graph from "./components/graph_visualizing/Graph";

function App() {
  const myValues = [5, 10, 3, 8, 15, 20, 12, 18];

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "50px" }}>
      <h2>My Graph</h2>
      <Graph values={myValues} />
    </div>
  );
}

export default App;
