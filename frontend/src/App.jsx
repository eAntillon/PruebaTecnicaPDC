import { PrimeReactProvider } from "primereact/api";
import Home from "./pages/Home";
// import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "/node_modules/primeflex/primeflex.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PrimeReactProvider>
  );
}

export default App;
