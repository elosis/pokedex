import React, { useContext } from "react";
import "../App.css";
import { DexContext } from "../store/context";

export default function PokeThumbnail(props) {
  const { pokemonData } = useContext(DexContext);
  const style =
    pokemonData && pokemonData.types ? pokemonData.types[0].name : "";

  return <div className={`${style} app-container`}>{props.children}</div>;
}
