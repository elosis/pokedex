import "./App.css";
import React from "react";
import PokeHeader from "./components/PokeHeader";
import Infos from "./components/Infos";
import Cap from "./components/Cap";
import DexProvider from "./store/context";

function App() {
  return (
    <DexProvider>
      <div className="app-container">
        <Cap />
        <div className="poke-container">
          <PokeHeader />
          <Infos />
        </div>
      </div>
    </DexProvider>
  );
}

export default App;
