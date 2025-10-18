import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import useBuses from "@/store/busStore";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

interface Seat {
  id: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
  type: "window" | "aisle" | "middle";
}

function SeatSelection() {
  const navigate = useNavigate();
  const { selectedBus, setTotalPrice, setSelectedSeats } = useBuses();
  console.log("selected bus", selectedBus);

  const [seats, setSeats] = useState<Seat[]>(() => {
    const seatLayout: Seat[] = [];
    const totalRows = Math.ceil(selectedBus.totalSeats / 4);

    for (let row = 1; row <= totalRows; row++) {
      // Left side seats (A, B)
      seatLayout.push({
        id: `${row}A`,
        number: `${row}A`,
        isAvailable: Math.random() > 0.3, // 70% availability for seats
        isSelected: false,
        type: "window",
      });
      seatLayout.push({
        id: `${row}B`,
        number: `${row}B`,
        isAvailable: Math.random() > 0.3,
        isSelected: false,
        type: "aisle",
      });

      // Right side seats (C, D)
      seatLayout.push({
        id: `${row}C`,
        number: `${row}C`,
        isAvailable: Math.random() > 0.3,
        isSelected: false,
        type: "aisle",
      });
      seatLayout.push({
        id: `${row}D`,
        number: `${row}D`,
        isAvailable: Math.random() > 0.3,
        isSelected: false,
        type: "window",
      });
    }
    console.log(seatLayout);
    return seatLayout;
  });

  const selectedSeats = seats.filter((seat) => seat.isSelected);
  console.log("selected seats", selectedSeats);

  const totalPrice = selectedSeats.length * selectedBus.price;
  console.log("total price", totalPrice);

  useEffect(() => {
    setSelectedSeats(selectedSeats)
    setTotalPrice(totalPrice)
  }, [seats]);

  const seatRows: Seat[][] = [];
  for (let i = 0; i < seats.length; i += 4) {
    seatRows.push(seats.slice(i, i + 4));
  }
  console.log("seatRows", seatRows);

  const goBack = (route: string) => {
    console.log(route);
    navigate(`${route}`);
  };

  const toggleSeat = (seatId: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id === seatId) {
          if (!seat.isAvailable) {
            return seat;
          }
          return { ...seat, isSelected: !seat.isSelected };
        }
        return seat;
      })
    );
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.isSelected) return "bg-primary text-primary-foreground";
    if (!seat.isAvailable)
      return "bg-booked text-booked-foreground cursor-not-allowed";
    return "bg-available text-available-foreground hover:bg-available/80 cursor-pointer";
  };

  const handleContinue = () => {
    navigate("/customer-details");
  };

  return (
    <div className="m-10 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => goBack("/buses")}>
          <ArrowLeft className="h-4 w-4 " />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Select Your Seats</h1>
          <p className="text-muted-foreground">
            {selectedBus.name} - {selectedBus.company}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-card">
            <div className="space-y-4">
              {/* Legend */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-available rounded-md"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-booked rounded-md"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-md"></div>
                  <span>Selected</span>
                </div>
              </div>

              {/* Driver Section */}
              <div className="flex justify-end mb-6">
                <div className="bg-muted rounded-lg px-4 py-2 text-sm font-medium">
                  Driver
                </div>
              </div>

              {/* Seat Grid */}
              <div className="space-y-3">
                {seatRows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center gap-3 justify-center"
                  >
                    {/* Left side seats */}
                    <div className="flex gap-2">
                      {row.slice(0, 2).map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => toggleSeat(seat.id)}
                          className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-200 ${getSeatColor(
                            seat
                          )}`}
                          disabled={!seat.isAvailable}
                        >
                          {seat.isSelected && <Check className="h-4 w-4" />}
                          {!seat.isSelected && seat.number}
                        </button>
                      ))}
                    </div>

                    {/* Aisle */}
                    <div className="w-8 flex justify-center">
                      <div className="text-xs text-muted-foreground">
                        {rowIndex + 1}
                      </div>
                    </div>

                    {/* Right side seats */}
                    <div className="flex gap-2">
                      {row.slice(2, 4).map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => toggleSeat(seat.id)}
                          className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-200 ${getSeatColor(
                            seat
                          )}`}
                          disabled={!seat.isAvailable}
                        >
                          {seat.isSelected && <Check className="h-4 w-4" />}
                          {!seat.isSelected && seat.number}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="p-6 shadow-card bg-gradient-card sticky top-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Booking Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Route</span>
                  <span>{selectedBus.company}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Departure</span>
                  <span>{selectedBus.departureTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per seat</span>
                  <span>Kes {selectedBus.price}</span>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-medium">Selected Seats</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seat) => (
                      <Badge
                        key={seat.id}
                        variant="default"
                        className="bg-primary"
                      >
                        {seat.number}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>
                      Total ({selectedSeats.length} seat
                      {selectedSeats.length > 1 ? "s" : ""})
                    </span>
                    <span className="text-primary">
                      Kes {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-hero text-primary-foreground shadow-button hover:shadow-elevated"
                disabled={selectedSeats.length === 0}
              >
                Continue to Passenger Details
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
