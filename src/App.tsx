import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RouteSearch from "./pages/RouteSearch";


const router = createBrowserRouter([
  {
    path: "/",
    // element: <HomePage />,
     element: <RouteSearch />,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
