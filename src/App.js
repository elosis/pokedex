import "./App.css";
import PercentageBar from "./components/PercentageBar";
import PokeHeader from "./components/PokeHeader";

function App() {
  return (
    <div className="app-container">
      <div className="cap">
        <h1>Astro + TanStack Query</h1>
        <p>Pokédex Example</p>
      </div>
      <div className="poke-container">
        <PokeHeader />
        <div className="stats-container">
          <div className="pokemon">
            <div className="pokemon-header">
              <div>Picture</div>
              <div>
                <img src="atom.png"></img>
              </div>
            </div>
            <div className="pokemon-image">
              <img src="avatar.png"></img>
            </div>
            <div className="pokemon-button">
              <span>&#60;</span>
              <div>#024</div>
              <span>&#62;</span>
            </div>
          </div>
          <div className="stats">
            <div className="stats-header">
              <div>Stats</div>
              <div>
                <img src="wave.png"></img>
              </div>
            </div>
            <div>
              <PercentageBar name="Hp" percentage={50} />
              <PercentageBar name="Attack" percentage={50} />
              <PercentageBar name="Defense" percentage={50} />
              <PercentageBar name="Sp.Atk" percentage={50} />
              <PercentageBar name="Sp.Def" percentage={50} />
              <PercentageBar name="Speed" percentage={50} />
            </div>
            <div className="stats-button">
              <span>&#60;</span>
              <div>#024</div>
              <span>&#62;</span>
            </div>
          </div>
          <div className="details">
            <div className="details-header">
              <div>Details</div>
              <div>
                <img src="flash.png"></img>
              </div>
            </div>
            <div className="features">
              <div className="type-container">
                <div className="type">Type</div>
                <div className="type-name">poison</div>
              </div>
              <div>
                <div className="weaknesses-container">
                  <div className="weaknesses">Weaknesses</div>
                  <div className="weaknesses-name">ground</div>
                </div>
              </div>
            </div>
            <div className="details-button">
              <span>&#60;</span>
              <div>#024</div>
              <span>&#62;</span>
            </div>
          </div>
          <div className="evolution-chain">
            <div className="evo-header">
              <div>Evolution Chain</div>
              <div>
                <img src="tree.png"></img>
              </div>
            </div>
            <div className="evo-pics-container">
              <div className="evo-pics">
                <div className="evo-name">Ekans</div>
                <div className="evo-img">
                  <img src="avatar.png"></img>
                </div>
              </div>
              <div className="evo-pics">
                <div className="evo-name">Arbok</div>
                <div className="evo-img">
                  <img src="avatar.png"></img>
                </div>
              </div>
            </div>
            <div className="evo-button">
              <span>&#60;</span>
              <div>#024</div>
              <span>&#62;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
