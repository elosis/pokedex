import { createContext, useState, useEffect, useContext } from "react";

const DexContext = createContext();

export default function DexProvider(props) {
  const [pokemonID, setPokemonID] = useState(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [prevPokemonID, setPrevPokemonID] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);

  async function getNextPokemon() {
    setPokemonID(pokemonID + 1);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => response.json())
      .then((data) => setPokemonData(data));

    console.log(pokemonData);
  }

  async function getPrevPokemon() {
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

  const renderPokemon = (pokemonData) => {
    if (!pokemonData) {
      return null;
    }
    return (
      <div>
        <div className="pokemon-header">
          <div>Picture</div>
          <div>
            <img src="atom.png"></img>
          </div>
        </div>
        <div className="pokemon-image">
          <img
            src={pokemonData.sprites.front_default}
            style={{ width: 250, height: 250 }}
          ></img>
        </div>
        <div className="pokemon-button">
          <span onClick={getPrevPokemon}>&#60;</span>
          <div>#0{pokemonID}</div>
          <span onClick={getNextPokemon}>&#62;</span>
        </div>
      </div>
    );
  };

  const renderStats = () => {};

  const renderEvolution = (evolutionData) => {
    if (!evolutionData) {
      return null;
    }
    return (
      <div>
        {evolutionData.evolves_to.length > 0 && (
          <div>
            {evolutionData.evolves_to.map((evolution) => (
              <div key={evolution.species.name}>
                <div className="evo-con">
                  <div>
                    <p>{evolution.species.name}</p>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        evolution.species.url.split("/").slice(-2)[0]
                      }.png`}
                      alt={evolution.species.name}
                      style={{ width: 120, height: 120 }}
                    />
                  </div>
                  {renderEvolution(evolution)}
                </div>
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
    renderPokemon,
  };

  return (
    <DexContext.Provider value={data}>{props.children}</DexContext.Provider>
  );
}

export { DexProvider, DexContext, useContext };
