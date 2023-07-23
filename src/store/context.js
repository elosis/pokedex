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
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
      if (!res.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await res.json();

      console.log("Fetched Pokemon Data:", data);

      const types = await Promise.all(
        data.types.map(async (typeData) => {
          const typeRes = await fetch(typeData.type.url);
          if (!typeRes.ok) {
            throw new Error("Network response was not ok.");
          }
          return await typeRes.json();
        })
      );

      console.log("Fetched Types:", types);

      const weaknesses = types.reduce((allWeaknesses, currentType) => {
        return [
          ...allWeaknesses,
          ...currentType.damage_relations.double_damage_from,
        ];
      }, []);

      console.log("Weaknesses:", weaknesses);

      const uniqueWeaknesses = Array.from(
        new Set(weaknesses.map((weakness) => weakness.name))
      );

      console.log("Unique Weaknesses:", uniqueWeaknesses);

      const speciesRes = await fetch(data.species.url);
      if (!speciesRes.ok) {
        throw new Error("Network response was not ok.");
      }
      const speciesData = await speciesRes.json();

      console.log("Fetched Species Data:", speciesData);

      const evolutionChainRes = await fetch(speciesData.evolution_chain.url);
      if (!evolutionChainRes.ok) {
        throw new Error("Network response was not ok.");
      }
      const evolutionChainData = await evolutionChainRes.json();

      console.log("Fetched Evolution Chain Data:", evolutionChainData);

      const detailedData = {
        ...data,
        types: types,
        weaknesses: uniqueWeaknesses,
      };

      setPokemonData(detailedData);
      setEvolutionData(evolutionChainData.chain);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
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
  };

  return (
    <DexContext.Provider value={data}>{props.children}</DexContext.Provider>
  );
}

export { DexProvider, DexContext, useContext };
