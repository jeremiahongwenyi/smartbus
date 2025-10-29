import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
// import RouteSearch from "./components/RouteSearch";
import BusesPage from "./pages/BusesPage";
import SeatSelection from "./pages/SeatSelection";
import CustomerPage from "./pages/CustomerPage";
import PaymentPage from "./pages/PaymentPage";
import Confirmation from "./pages/Confirmation";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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

  {
    path: "confirmation",
    element: <Confirmation />,
  },
]);
function App() {
  return <>
<RouterProvider router={router}></RouterProvider>;
  <Toaster richColors position="top-right" />
  </>
}

export default App;
