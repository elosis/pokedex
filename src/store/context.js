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
    console.log(pokemonData);
    setEvolutionData(evolutionChainData.chain);
  };

  const renderPokeHeader = (pokemonData) => {
    if (!pokemonData) {
      return null;
    }
    return (
      <div>
        <div className="poke-header-starter">
          <div>Pokémon</div>
          <div>#0{pokemonID}</div>
        </div>
        <div className="pokename">
          {pokemonData.name ? (
            pokemonData.name
          ) : (
            <div> No pokemon name found</div>
          )}
        </div>
      </div>
    );
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
            src={pokemonData.sprites.other["official-artwork"].front_default}
            style={{
              width: 150,
              height: 150,
            }}
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

  const renderStats = (pokemonData) => {
    if (!pokemonData) {
      return null;
    }

    return (
      <div>
        <div className="stats-header">
          <div>Stats</div>
          <div>
            <img src="wave.png"></img>
          </div>
        </div>
        <div className="per-con">
          {pokemonData.stats.map((stat) => (
            <div className="percentage-bar-container" key={stat.stat.name}>
              <span className="percentage-bar-name">{stat.stat.name}</span>
              <div className="percentage-bar">
                <div
                  className="percentage-bar-fill"
                  style={{ width: `${stat.base_stat}%` }}
                ></div>
              </div>
              <span className="percentage-bar-percentage">
                {stat.base_stat}
              </span>
            </div>
          ))}
        </div>
        <div className="stats-button">
          <span onClick={getPrevPokemon}>&#60;</span>
          <div>#0{pokemonID}</div>
          <span onClick={getNextPokemon}>&#62;</span>
        </div>
      </div>
    );
  };

  const renderDetails = (pokemonData) => {
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
        <div className="features">
          <div>
            <div className="type">Type</div>
            <div className="type-container">
              {pokemonData.types.map((type) => (
                <div className="type-name">
                  <span key={type.name}>{type.name} </span>
                </div>
              ))}
            </div>
          </div>
          <div>
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
        </div>
        <div
          className="details-button"
          style={{
            marginTop: pokemonData.weaknesses.length > 5 ? "20px" : "10px",
          }}
        >
          <span onClick={getPrevPokemon}>&#60;</span>
          <div>#0{pokemonID}</div>
          <span onClick={getNextPokemon}>&#62;</span>
        </div>
      </div>
    );
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
    renderPokemon,
    renderDetails,
    renderPokeHeader,
    renderStats,
  };

  return (
    <DexContext.Provider value={data}>{props.children}</DexContext.Provider>
  );
}

export { DexProvider, DexContext, useContext };
