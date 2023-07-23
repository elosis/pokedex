import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function EvolutionChain() {
  const { getPrevPokemon, getNextPokemon, pokemonID, evolutionData } =
    useContext(DexContext);

  if (!evolutionData) {
    return null;
  }

  const renderEvolution = (evolution) => {
    return (
      <div key={evolution.species.name} className="evolution-item">
        <div>
          <p>{evolution.species.name}</p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              evolution.species.url.split("/").slice(-2)[0]
            }.png`}
            alt={evolution.species.name}
            className="evo-pic"
          />
        </div>
        {evolution.evolves_to.length > 0 && (
          <div className="evolution-container">
            {evolution.evolves_to.map((nextEvolution) =>
              renderEvolution(nextEvolution)
            )}
          </div>
        )}
      </div>
    );
  };

  // Check if there are two evolutions in the chain
  const hasTwoEvolutions =
    evolutionData.evolves_to.length === 1 &&
    evolutionData.evolves_to[0].evolves_to.length === 1;

  if (hasTwoEvolutions) {
    const firstEvolution = evolutionData.evolves_to[0];
    const secondEvolution = firstEvolution.evolves_to[0];

    return (
      <div className="evolution-chain">
        <div className="evo-header">
          <div>Evolution Chain</div>
          <div>
            <img src="tree.png" alt="Evolution Chain" className="small-img" />
          </div>
        </div>
        <div className="evolution-container">
          <div className="evolution-item">
            <div>
              <p>{evolutionData.species.name}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  evolutionData.species.url.split("/").slice(-2)[0]
                }.png`}
                alt={evolutionData.species.name}
                className="evo-pic"
              />
            </div>
          </div>
          <div className="evolution-item">
            <div>
              <p>{firstEvolution.species.name}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  firstEvolution.species.url.split("/").slice(-2)[0]
                }.png`}
                alt={firstEvolution.species.name}
                className="evo-pic"
              />
            </div>
          </div>
          <div className="evolution-item">
            <div>
              <p>{secondEvolution.species.name}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  secondEvolution.species.url.split("/").slice(-2)[0]
                }.png`}
                alt={secondEvolution.species.name}
                className="evo-pic"
              />
            </div>
          </div>
        </div>
        <div className="evo-button">
          <span onClick={getPrevPokemon}>&#60;</span>
          <div className="button-name">#0{pokemonID}</div>
          <span onClick={getNextPokemon}>&#62;</span>
        </div>
      </div>
    );
  }

  return (
    <div className="evolution-chain">
      <div className="evo-header">
        <div>Evolution Chain</div>
        <div>
          <img src="tree.png" alt="Evolution Chain" />
        </div>
      </div>
      <div className="evolution-container">
        {evolutionData.evolves_to.map((evolution) =>
          renderEvolution(evolution)
        )}
      </div>
      <div className="evo-button">
        <span onClick={getPrevPokemon}>&#60;</span>
        <div className="button-name">#0{pokemonID}</div>
        <span onClick={getNextPokemon}>&#62;</span>
      </div>
    </div>
  );
}
