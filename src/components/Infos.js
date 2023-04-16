import React from "react";
import "../App.css";
import Stats from "./Stats";
import Pokemon from "./Pokemon";
import Details from "./Details";
import EvolutionChain from "./EvolutionChain";
import { DexContext, useContext } from "../store/context";

export default function Infos() {
  const { pokemonID, pokemonData } = useContext(DexContext);

  return (
    <div className="stats-container">
      <Pokemon
        id={pokemonID}
        image={() => {
          return pokemonData.sprites.front_default;
          debugger;
        }}
      />
      <Stats id={pokemonID} />
      <Details id={pokemonID} />
      <EvolutionChain id={pokemonID} />
    </div>
  );
}
