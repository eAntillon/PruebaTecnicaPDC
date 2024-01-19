import { PrimeReactProvider } from "primereact/api";
import Home from "./pages/Home";
import "primereact/resources/themes/lara-light-blue/theme.css";
import '/node_modules/primeflex/primeflex.css'
function App() {
  return (
    <PrimeReactProvider>
      <Home />
    </PrimeReactProvider>
  );
}

export default App;
