import React, { createContext, useState, useEffect, useContext } from "react";

const DexContext = createContext();

export default function DexProvider(props) {
  const [pokemonID, setPokemonID] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [prevPokemonID, setPrevPokemonID] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);

  async function getNextPokemon(e) {
    e.preventDefault();
    setPokemonID(pokemonID + 1);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => response.json())
      .then((data) => setPokemonData(data));
  }

  async function getPrevPokemon(e) {
    e.preventDefault();
    if (pokemonID > 1) {
      setPrevPokemonID(pokemonID);
      setPokemonID(pokemonID - 1);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        .then((response) => response.json())
        .then((data) => setPokemonData(data));
    }
  }

  const getPoke = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    const data = await res.json();

    const types = await Promise.all(
      data.types.map(async (typeData) => {
        const typeRes = await fetch(typeData.type.url);
        return await typeRes.json();
      })
    );

    const weaknesses = types.reduce((allWeaknesses, currentType) => {
      return [
        ...allWeaknesses,
        ...currentType.damage_relations.double_damage_from,
      ];
    }, []);

    const uniqueWeaknesses = Array.from(
      new Set(weaknesses.map((weakness) => weakness.name))
    );

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();
    const evolutionChainRes = await fetch(speciesData.evolution_chain.url);

    const evolutionChainData = await evolutionChainRes.json();
    const detailedData = {
      ...data,
      types: types,
      weaknesses: uniqueWeaknesses,
    };

    setPokemonData(detailedData);
    setEvolutionData(evolutionChainData.chain);
  };

  const renderEvolution = (evolutionData) => {
    if (!evolutionData) {
      return null;
    }

    // Check if there are two evolutions in the chain
    const hasTwoEvolutions =
      evolutionData.evolves_to.length === 1 &&
      evolutionData.evolves_to[0].evolves_to.length === 1;

    if (hasTwoEvolutions) {
      const firstEvolution = evolutionData.evolves_to[0];
      const secondEvolution = firstEvolution.evolves_to[0];

      return (
        <div className="evolution-container">
          <div className="evolution-item">
            <div>
              <p>{evolutionData.species.name}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  evolutionData.species.url.split("/").slice(-2)[0]
                }.png`}
                alt={evolutionData.species.name}
                style={{ width: 120, height: 120 }}
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
                style={{ width: 120, height: 120 }}
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
                style={{ width: 120, height: 120 }}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {evolutionData.evolves_to.length > 0 && (
          <div className="evolution-container">
            {evolutionData.evolves_to.map((evolution) => (
              <div key={evolution.species.name} className="evolution-item">
                <div>
                  <p>{evolution.species.name}</p>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                      evolution.species.url.split("/").slice(-2)[0]
                    }.png`}
                    alt={evolution.species.name}
                    style={{ width: 120, height: 120 }}
                  />
                </div>
                {renderEvolution(evolution)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getPoke();
  }, [pokemonID]);

  const data = {
    pokemonID,
    setPokemonID,
    pokemonData,
    setPokemonData,
    prevPokemonID,
    setPrevPokemonID,
    evolutionData,
    setEvolutionData,
    getPoke,
    getNextPokemon,
    getPrevPokemon,
    renderEvolution,
  };

  return (
    <DexContext.Provider value={data}>{props.children}</DexContext.Provider>
  );
}

export { DexProvider, DexContext, useContext };
