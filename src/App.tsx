import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RouteSearch from "./pages/RouteSearch";
import BusCard from "./pages/BusCard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    //  element: <RouteSearch />,
  },
  {
    path:"buses",
    element: <BusCard/>
  }
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
