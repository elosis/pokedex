import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function Details({ id }) {
  const { renderEvolution, evolutionData, getNextPokemon, getPrevPokemon } =
    useContext(DexContext);

  return (
    <div className="evolution-chain">
      <div className="evo-header">
        <div>Evolution Chain</div>
        <div>
          <img src="tree.png"></img>
        </div>
      </div>
      <div className="evo-pics-container">
        {evolutionData && renderEvolution(evolutionData)}
      </div>
      <div className="evo-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div>#0{id}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
