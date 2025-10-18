import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
// import RouteSearch from "./components/RouteSearch";
import BusesPage from "./pages/BusesPage"
import SeatSelection from "./pages/SeatSelection";
import CustomerPage from "./pages/CustomerPage";
import PaymentPage from "./pages/PaymentPage";

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

   {
    path: "customer-details",
    element: <CustomerPage />,
  },
     {
    path: "payment-details",
    element: <PaymentPage />,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
