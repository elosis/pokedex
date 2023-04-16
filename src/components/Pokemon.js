import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";
import { render } from "@testing-library/react";

export default function Pokemon() {
  const { renderPokemon, pokemonData } = useContext(DexContext);
  return <div className="pokemon">{renderPokemon(pokemonData)}</div>;
}
