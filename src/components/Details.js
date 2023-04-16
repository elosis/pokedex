import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function Details({ id }) {
  const { pokemonData, getNextPokemon, getPrevPokemon } =
    useContext(DexContext);
  return (
    <div className="details">
      <div className="details-header">
        <div>Details</div>
        <div>
          <img src="flash.png"></img>
        </div>
      </div>
      <div className="features">
        <div>
          <div className="type">Type</div>
          <div className="type-container">
            {() => {
              pokemonData.types.map((type) => (
                <div className="type-name">
                  <span key={type.name}>{type.name} </span>
                </div>
              ));
              debugger;
            }}
          </div>
        </div>
        <div>
          <div className="weaknesses">Weaknesses</div>
          <div className="weaknesses-container">
            {() => {
              pokemonData.weaknesses.map((weakness) => (
                <div className="weaknesses-name">
                  <span key={weakness}>{weakness} </span>
                </div>
              ));
              debugger;
            }}
          </div>
        </div>
      </div>
      <div className="details-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div>#0{id}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
