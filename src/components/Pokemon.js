import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function Pokemon({ id, image }) {
  const { getPrevPokemon, getNextPokemon } = useContext(DexContext);
  return (
    <div className="pokemon">
      <div className="pokemon-header">
        <div>Picture</div>
        <div>
          <img src="atom.png"></img>
        </div>
      </div>
      <div className="pokemon-image">
        <img src={image} style={{ width: 250, height: 250 }}></img>
      </div>
      <div className="pokemon-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div>#0{id}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
