import React from "react";
import "../App.css";

import { DexContext, useContext } from "../store/context";

export default function Stats() {
  const { getPrevPokemon, getNextPokemon, pokemonData, pokemonID } =
    useContext(DexContext);
  if (!pokemonData) {
    return null;
  }

  return (
    <div className="stats">
      <div className="stats-header">
        <div>Stats</div>
        <div>
          <img src="wave.png"></img>
        </div>
      </div>
      <div className="per-con">
        {pokemonData.stats.map((stat) => (
          <div className="percentage-bar-container" key={stat.stat.name}>
            <span className="percentage-bar-name">
              {stat.stat.name === "special-attack"
                ? "Sp. At"
                : stat.stat.name === "special-defense"
                ? "Sp. Def"
                : stat.stat.name}
            </span>
            <div className="percentage-bar">
              <div
                className={`percentage-bar-fill ${pokemonData.types[0].name}`}
                style={{ width: `${(stat.base_stat / 200) * 100}%` }}
              ></div>
            </div>
            <span className="percentage-bar-percentage">{stat.base_stat}</span>
          </div>
        ))}
      </div>
      <div className="stats-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div className="button-name">#0{pokemonID}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
