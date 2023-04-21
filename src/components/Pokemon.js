import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function Pokemon() {
  const { renderPokemon, pokemonData } = useContext(DexContext);
  return <div>{renderPokemon(pokemonData)}</div>;
}
