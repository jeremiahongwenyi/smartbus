import {create} from "zustand"
export interface BusData {
  id: string,
    name: string,
    company: string,
    departureTime: string,
    arrivalTime: string,
    duration: string,
    price: number,
    availableSeats:number,
    totalSeats:number,
    amenities: string[],
    rating:number,
    busType: string
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
    busType: "Luxury"
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
    busType: "Standard"
  },
  {
    id: "3",
    name: "Dreamline",
    company: "Dreamline Coaches",
    departureTime: "22:00",
    arrivalTime: "04:30",
    duration: "6h 30m",
    price: 1400,
    availableSeats: 20,
    totalSeats: 42,
    amenities: ["WiFi", "Refreshments", "AC", "Reclining Seats"],
    rating: 4.6,
    busType: "Executive"
  },

   {
    id: "4",
    name: "Ena Coach",
    company: "Ena Coaches",
    departureTime: "22:00",
    arrivalTime: "04:30",
    duration: "6h 30m",
    price: 1400,
    availableSeats: 20,
    totalSeats: 42,
    amenities: ["WiFi", "Refreshments", "AC", "Reclining Seats"],
    rating: 4.6,
    busType: "Executive"
  }
];

interface BusStore {
  buses: BusData[];
  selectedBus:BusData ;
  getBuses: () => void;
  setBuses: (buses: BusData[]) => void;
  getSelectedBus: ()=> BusData;
  setSelectedBus: (bus:BusData) => void
}


const  useBuses = create<BusStore> ((set,get)=>({
  buses: mockBuses,
  selectedBus: {} as BusData,
  getBuses: () => get().buses,
  setBuses: (buses) => set({ buses }),
  getSelectedBus: ()=> get().selectedBus,
  setSelectedBus: (bus)=> set(()=> {
    console.log('am setting the selected bus');
    return {selectedBus:bus} 
  })
}))

export default useBuses