import React, { useContext, useEffect } from "react";
import "../App.css";
import { DexContext } from "../store/context";

export default function PokeThumbnail(props) {
  const { pokemonData } = useContext(DexContext);
  const style =
    pokemonData && pokemonData.types ? pokemonData.types[0].name : "";

  useEffect(() => {
    document.body.style.backgroundImage = `linear-gradient(to top right, var(--${style}-color), var(--normal-color))`;
  }, [style]);

  return <div className={`app-container`}>{props.children}</div>;
}
