import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function BusCard() {
  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 bg-gradient-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Bus Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Executive Express
                </h3>
                <p className="text-muted-foreground">SmartBus Premium</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">Luxury</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">08:00</p>
                <p className="text-sm text-muted-foreground">Departure</p>
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div className="h-px bg-border flex-1"></div>
                <div className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">6h 30m</span>
                </div>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">14:30</p>
                <p className="text-sm text-muted-foreground">Arrival</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-3">
              {/* {bus.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-1 text-muted-foreground">
                {getAmenityIcon(amenity)}
                <span className="text-sm capitalize">{amenity}</span>
              </div>
            ))} */}
              WiFi Refreshments AC
            </div>
          </div>

          {/* Price and Booking */}
          <div className="lg:text-right space-y-4">
            <div>
              <p className="text-3xl font-bold text-primary">Kes 6,500</p>
              <p className="text-sm text-muted-foreground">per person</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 lg:justify-end">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className={`text-sm font-medium`}>
                  {"12"} of {"45"} seats available
                </span>
              </div>

              <Button
                // onClick={() => onSelectSeats(bus.id)}
                className="w-full lg:w-auto bg-gradient-hero text-primary-foreground shadow-button hover:shadow-elevated transition-all duration-300"
                // disabled={bus.availableSeats === 0}
              >
                {/* {bus.availableSeats === 0 ? 'Fully Booked' : 'Select Seats'} */}
                Select Seat
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BusCard;
