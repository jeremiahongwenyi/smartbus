import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
// import RouteSearch from "./components/RouteSearch";
import BusesPage from "./pages/BusesPage"
import SeatSelection from "./pages/SeatSelection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    //  element: <RouteSearch />,
  },
  {
    path: "buses",
    element: <BusesPage />,
  },
  {
    path: "seat-selection",
    element: <SeatSelection />,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
