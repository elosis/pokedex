import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function Pokemon() {
  const { getPrevPokemon, getNextPokemon, pokemonData, pokemonID } =
    useContext(DexContext);
  if (!pokemonData) {
    return null;
  }
  return (
    <div className="pokemon">
      <div className="pokemon-header">
        <div>Picture</div>
        <div>
          <img src="atom.png" className="small-img"></img>
        </div>
      </div>
      <div className="pokemon-image">
        <img
          src={pokemonData.sprites.other["official-artwork"].front_default}
          className="poke-pic"
        ></img>
      </div>
      <div className="pokemon-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div className="button-name">#0{pokemonID}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
