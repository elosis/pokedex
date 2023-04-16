import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function PokeHeader() {
  const { pokemonID, pokemonData } = useContext(DexContext);
  return (
    <div className="poke-header">
      <div className="poke-header-starter">
        <div>Pokémon</div>
        <div>#0{pokemonID}</div>
      </div>
      <div className="pokename">
        {() => {
          return pokemonData.name;
          debugger;
        }}
      </div>
    </div>
  );
}
