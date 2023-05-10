import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function PokeHeader() {
  const { pokemonID, pokemonData } = useContext(DexContext);
  if (!pokemonData) {
    return null;
  }
  return (
    <div className="poke-header">
      <div className="poke-header-starter">
        <div>Pokémon</div>
        <div>#0{pokemonID}</div>
      </div>
      <div className="pokename">
        {pokemonData.name ? (
          pokemonData.name
        ) : (
          <div> No pokemon name found</div>
        )}
      </div>
    </div>
  );
}
