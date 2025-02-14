import "./App.css";
import Provider from "./utils/Provider";
import Routers from "./utils/Routes";

function App() {
  return (
    <Provider>
      <Routers />
    </Provider>
  );
}
export default App;
