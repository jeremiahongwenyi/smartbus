import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Users,
  Wifi,
  Coffee,
  Soup,
  RockingChair,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BusData } from "@/store/busStore";

function BusCard({ bus }: { bus: BusData }) {
  const navigate = useNavigate();
  const onSelectSeats = (id: string) => {
    console.log("seat selected");
    navigate("/");
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "refreshments":
        return <Soup className="h-4 w-4"></Soup>;
      case "meals":
        return <Coffee className="h-4 w-4" />;
      case "reclining seats":
        return <RockingChair className="h-4 w-4" />;
      default:
        null;
    }
  };

  const seatAvailability = (bus.availableSeats / bus.totalSeats) * 100;
  const getAvailabilityColor = () => {
    if (seatAvailability > 50) {
      return "text-available";
    } else if (seatAvailability > 20) {
      return "text-accent";
    }
    return "text-destructive";
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 bg-gradient-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Bus Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {bus.name}
                </h3>
                <p className="text-muted-foreground">{bus.company}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{bus.busType}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{bus.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {bus.departureTime}
                </p>
                <p className="text-sm text-muted-foreground">Departure</p>
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div className="h-px bg-border flex-1"></div>
                <div className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {bus.duration}
                  </span>
                </div>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {bus.arrivalTime}
                </p>
                <p className="text-sm text-muted-foreground">Arrival</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-3">
              {bus.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-1 text-muted-foreground"
                >
                  {getAmenityIcon(amenity)}
                  <span className="text-sm capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price and Booking */}
          <div className="lg:text-right space-y-4">
            <div>
              <p className="text-3xl font-bold text-primary">Kes {bus.price}</p>
              <p className="text-sm text-muted-foreground">per person</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 lg:justify-end">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span
                  className={`text-sm font-medium ${getAvailabilityColor()}`}
                >
                  {bus.availableSeats} of {bus.totalSeats} seats available
                </span>
              </div>

              <Button
                // onClick={() => onSelectSeats(bus.id)}
                onClick={() => onSelectSeats(bus.id)}
                className="w-full lg:w-auto bg-gradient-hero text-primary-foreground shadow-button hover:shadow-elevated transition-all duration-300"
                disabled={bus.availableSeats === 0}
              >
                {bus.availableSeats === 0 ? "Fully Booked" : "Select Seats"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BusCard;
