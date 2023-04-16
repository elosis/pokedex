import React from "react";
import "../App.css";
import PercentageBar from "./PercentageBar";
import { DexContext, useContext } from "../store/context";

export default function Stats({ id }) {
  const { pokemonData, getNextPokemon, getPrevPokemon } =
    useContext(DexContext);

  return (
    <div className="stats">
      <div className="stats-header">
        <div>Stats</div>
        <div>
          <img src="wave.png"></img>
        </div>
      </div>
      <div className="per-con">
        <PercentageBar
          name="Hp"
          percentage={() => {
            return pokemonData.stats[0].base_stat;

            debugger;
          }}
        />
        <PercentageBar
          name="Attack"
          percentage={() => {
            return pokemonData.stats[1].base_stat;
            debugger;
          }}
        />
        <PercentageBar
          name="Defense"
          percentage={() => {
            return pokemonData.stats[2].base_stat;
            debugger;
          }}
        />
        <PercentageBar
          name="Sp.Atk"
          percentage={() => {
            return pokemonData.stats[3].base_stat;
            debugger;
          }}
        />
        <PercentageBar
          name="Sp.Def"
          percentage={() => {
            return pokemonData.stats[4].base_stat;
            debugger;
          }}
        />
        <PercentageBar
          name="Speed"
          percentage={() => {
            return pokemonData.stats[5].base_stat;
            debugger;
          }}
        />
      </div>
      <div className="stats-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div>#0{id}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
