import "./App.css";
import React from "react";
import PokeHeader from "./components/PokeHeader";
import Infos from "./components/Infos";
import Cap from "./components/Cap";
import DexProvider from "./store/context";
import PokeThumbnail from "./components/PokeThumbnail";

function App() {
  return (
    <DexProvider>
      <PokeThumbnail>
        <Cap />
        <div className="poke-container">
          <PokeHeader />
          <Infos />
        </div>
      </PokeThumbnail>
    </DexProvider>
  );
}

export default App;
