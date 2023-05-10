import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function Details() {
  const { getPrevPokemon, getNextPokemon, pokemonData, pokemonID } =
    useContext(DexContext);
  if (!pokemonData) {
    return null;
  }

  return (
    <div className="details">
      <div className="details-header">
        <div>Details</div>
        <div>
          <img src="flash.png"></img>
        </div>
      </div>
      <div className="type-layer">
        <div className="type">Type</div>
        <div className="type-container">
          {pokemonData.types.map((type) => (
            <div className="type-name">
              <span key={type.name}>{type.name} </span>
            </div>
          ))}
        </div>
      </div>
      <div className="weak-layer">
        <div className="weaknesses">Weaknesses</div>
        <div className="weaknesses-container">
          {pokemonData.weaknesses ? (
            pokemonData.weaknesses.map((weakness) => (
              <div className="weaknesses-name" key={weakness}>
                <span>{weakness}</span>
              </div>
            ))
          ) : (
            <div>No weaknesses found.</div>
          )}
        </div>
      </div>

      <div className="details-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div className="button-name">#0{pokemonID}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
