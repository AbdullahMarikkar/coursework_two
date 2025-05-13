import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashBoardScreen from "./components/Dashboard/DashboardScreen";

function App() {
  return (
    <>
      <ReactQueryDevtools />
      <DashBoardScreen />
    </>
  );
}

export default App;
