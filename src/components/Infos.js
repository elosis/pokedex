import React from "react";
import "../App.css";
import Stats from "./Stats";
import Pokemon from "./Pokemon";
import Details from "./Details";
import EvolutionChain from "./EvolutionChain";
import { DexContext, useContext } from "../store/context";

export default function Infos() {
  const { pokemonID } = useContext(DexContext);

  return (
    <div className="stats-container">
      <div className="upper-container">
        <Pokemon />
        <Stats id={pokemonID} />
      </div>
      <div className="lower-container">
        <Details />
        <EvolutionChain id={pokemonID} />
      </div>
    </div>
  );
}
