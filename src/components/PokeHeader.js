import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function PokeHeader() {
  const { renderPokeHeader, pokemonData } = useContext(DexContext);
  return <div className="poke-header">{renderPokeHeader(pokemonData)}</div>;
}
