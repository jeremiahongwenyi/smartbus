import { Button } from "@/components/ui/button";
import { Check, Users, MapPin, Download, Printer, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useBuses from "@/store/busStore";
import { format } from "date-fns";
import { useCustomers } from "@/store/customerStore";

function Confirmation() {
  const { selectedBus, selectedSeats, totalPrice, routeDetails } =
    useBuses();
      const {customerData} =useCustomers()
  const bookingDate = format(new Date(), "PPP");

  const navigate = useNavigate();

  const onNewBooking = () => {
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-success rounded-full mb-4">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Booking Confirmed!
        </h1>
        <p className="text-lg text-muted-foreground">
          Your seat has been successfully reserved. Below are your booking
          details.
        </p>
      </div>

      {/* Receipt Card */}
      <Card className="p-8 shadow-elevated bg-gradient-card print:shadow-none">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-primary">SmartBus</h2>
              <p className="text-muted-foreground">Bus Booking Receipt</p>
            </div>
            <div className="text-right">
              <Badge
                variant="default"
                className="bg-primary text-primary-foreground"
              >
                CONFIRMED
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Booking Date: {bookingDate}
              </p>
            </div>
          </div>

          {/* Booking Reference */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Booking Reference
                </p>
                <p className="text-2xl font-bold text-primary">KUUYRYVJHF</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">
                  Kes {totalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Passenger Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{customerData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{customerData.age} years old</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Contact Number
                  </p>
                  <p className="font-medium">{customerData.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ID Number</p>
                  <p className="font-medium">{customerData.idNumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Trip Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Route</p>
                  <p className="font-medium">
                    {routeDetails.from} → {routeDetails.to}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Travel Date</p>
                  <p className="font-medium">
                    {routeDetails.departureDate
                      ? format(routeDetails.departureDate, "dd/MM/yyy")
                      : ""}
                  </p>
                </div>
                {routeDetails.returnDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Return Date</p>
                    <p className="font-medium">
                      {routeDetails.returnDate
                        ? format(routeDetails.returnDate, "dd/MM/yyyy")
                        : ""}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">
                    Departure Time
                  </p>
                  <p className="font-medium">{selectedBus.departureTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bus</p>
                  <p className="font-medium">{selectedBus.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{selectedBus.company}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Seat Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Seat Assignment</h3>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <Badge
                  key={seat.id}
                  variant="outline"
                  className="text-base px-3 py-1"
                >
                  Seat {seat.id}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Important Notes */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Important Information</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                • Please arrive at the terminal at least 30 minutes before
                departure
              </li>
              <li>• Bring a valid ID that matches your booking details</li>
              <li>• This receipt serves as your boarding pass</li>
              <li>
                • Contact customer service for any changes or cancellations
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
        <Button variant="outline" className="flex-1 sm:flex-initial">
          <Download className="mr-2 h-4 w-4" />
        </Button>

        <Button variant="outline" className="flex-1 sm:flex-initial">
          <Printer className="mr-2 h-4 w-4" />
          Print Receipt
        </Button>

        <Button variant="outline" className="flex-1 sm:flex-initial">
          <Share2 className="mr-2 h-4 w-4" />
        </Button>

        <Button
          onClick={onNewBooking}
          className="bg-gradient-hero text-primary-foreground shadow-button hover:shadow-elevated flex-1 sm:flex-initial"
        >
          Book Another Trip
        </Button>
      </div>
    </div>
  );
}

export default Confirmation;
