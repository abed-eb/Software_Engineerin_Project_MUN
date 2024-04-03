import "./App.css";
import Graph from "./components/Graph/Graph";
import "react-tooltip/dist/react-tooltip.css";
import Map from "./components/Map/map";
function App() {
  return (
    <div className="App w-full h-full xs:overflow-x-scroll xl:overflow-x-hidden overflow-y-hidden text-white">
      {/* <Map /> */}
      <Graph />
    </div>
  );
}

export default App;
