import React from "react";
import "../App.css";

import { DexContext, useContext } from "../store/context";

export default function Stats() {
  const { pokemonData, renderStats } = useContext(DexContext);
  return <div>{renderStats(pokemonData)}</div>;
}
