import React from "react";
import "../App.css";
import { DexContext, useContext } from "../store/context";

export default function Details() {
  const { pokemonData, renderDetails } = useContext(DexContext);
  return <div>{renderDetails(pokemonData)}</div>;
}
