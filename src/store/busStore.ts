import { create } from "zustand";
import {persist} from "zustand/middleware"
export interface BusData {
  id: string;
  name: string;
  company: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
  rating: number;
  busType: string;
}

interface Seat {
  id: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
  type: "window" | "aisle" | "middle";
}

export interface RouteDetails {
  to: string;
  from: string;
  departureDate: string | null;
  returnDate: string | null;
}

export const mockBuses: BusData[] = [
  {
    id: "1",
    name: "Easy Coach",
    company: "Easy Coach Ltd",
    departureTime: "08:00",
    arrivalTime: "14:30",
    duration: "6h 30m",
    price: 1500,
    availableSeats: 0,
    totalSeats: 40,
    amenities: ["WiFi", "Refreshments", "AC"],
    rating: 4.8,
    busType: "Luxury",
  },
  {
    id: "2",
    name: "Modern Coast",
    company: "Modern Coast Express",
    departureTime: "10:15",
    arrivalTime: "16:45",
    duration: "6h 30m",
    price: 1300,
    availableSeats: 8,
    totalSeats: 35,
    amenities: ["WiFi", "AC"],
    rating: 4.5,
    busType: "Standard",
  },
  {
    id: "3",
    name: "Dreamline",
    company: "Dreamline Coaches",
    departureTime: "22:00",
    arrivalTime: "04:30",
    duration: "4h 30m",
    price: 1400,
    availableSeats: 20,
    totalSeats: 42,
    amenities: ["WiFi", "Refreshments", "AC", "Reclining Seats"],
    rating: 4.6,
    busType: "Executive",
  },

  {
    id: "4",
    name: "Ena Coach",
    company: "Ena Coaches",
    departureTime: "22:00",
    arrivalTime: "04:30",
    duration: "2h 30m",
    price: 1400,
    availableSeats: 20,
    totalSeats: 42,
    amenities: ["WiFi", "Refreshments", "AC", "Reclining Seats"],
    rating: 4.6,
    busType: "Executive",
  },
];

interface BusStore {
  buses: BusData[];
  selectedBus: BusData;
  setBuses: (buses: BusData[]) => void;
  setSelectedBus: (bus: BusData) => void;
  selectedSeats: Seat[];
  totalPrice: number;
  setSelectedSeats: (seats: Seat[]) => void;
  setTotalPrice: (price: number) => void;
  routeDetails: RouteDetails;
  setRouteDetails: (route: RouteDetails) => void;
  towns: string[];
  fetchTowns: () => Promise<void>;
}

export const useBuses = create<BusStore>()(
  persist(
    (set) => ({
      buses: mockBuses,
      selectedBus: {} as BusData,

      setBuses: (buses) => set({ buses }),

      setSelectedBus: (bus) => {
        console.log("am setting the selected bus");
        set({ selectedBus: bus });
      },

      selectedSeats: [],
      setSelectedSeats: (seats) => set({ selectedSeats: seats }),

      totalPrice: 0,
      setTotalPrice: (price) => set({ totalPrice: price }),

      routeDetails: {} as RouteDetails,
      setRouteDetails: (route) => set({ routeDetails: route }),

      towns: [],
      fetchTowns: async () => {
        const fetchedTowns = await getTowns();
        console.log("fetched towns", fetchedTowns);
        set({ towns: fetchedTowns });
      },
    }),
    {
      name: "smartbus-booking-storage", // Key used in localStorage
    }
  )
);


const URL = "https://smartbus-5a355-default-rtdb.firebaseio.com/towns.json";

export const getTowns = async (): Promise<string[]> => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      } 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch towns, try again later");
    }
    const data = await response.json();
    console.log(data);

    const townsArray: string[] = Object.values(data);
    const flat = townsArray.flat();
    console.log("first array ", flat);
    return flat;
  } catch(error) {
    console.error("Error fetching towns:", error);
    throw error
  }
};

export default useBuses;
