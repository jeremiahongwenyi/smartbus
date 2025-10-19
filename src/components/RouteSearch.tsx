import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowLeftRight, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, formatISO } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import useBuses from "@/store/busStore";

function RouteSearch() {
  const { setRouteDetails, towns, fetchTowns } = useBuses();
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  useEffect(() => {
    callFetch();
  }, []);

  const callFetch = async () => {
    console.log(await fetchTowns());
  };
  const swapRoutes = () => {
    console.log("i have been clicked");

    setTo(from);
    setFrom(to);
  };

  const searchBuses = () => {
    setRouteDetails({
      from: from,
      to: to,
      departureDate: departureDate ? formatISO(departureDate) : null,
      returnDate: returnDate ? formatISO(returnDate) : null,
    });
    const query = new URLSearchParams({
      from,
      to,
      departureDate: departureDate ? format(departureDate, "PPP") : "",
    });

    navigate(`/buses?${query.toString()}`);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <Label className="block">Trip Type</Label>
        <RadioGroup
          value={tripType}
          className="flex gap-6"
          onValueChange={(value) =>
            setTripType(value as "one-way" | "round-trip")
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way">One Way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" />
            <Label htmlFor="round-trip">Round Trip</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Route Selection */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="from" className="flex gap-2 items-center">
            <MapPin className="h-4 w-4" />
            From
          </Label>

          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger id="to" className="pl-4 w-full">
              <SelectValue placeholder="Select departure town" />
            </SelectTrigger>
            <SelectContent>
              {towns
                .filter((town) => town !== to)
                .map((town) => (
                  <SelectItem key={town} value={town}>
                    {town}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            disabled={!to || !from}
            onClick={swapRoutes}
          >
            <ArrowLeftRight className="h-4 w-4"></ArrowLeftRight>
          </Button>
        </div>

        {/* TO Input - Takes 2 columns */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="to" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            To
          </Label>

          <Select value={to} onValueChange={setTo}>
            <SelectTrigger id="to" className="pl-4 w-full">
              <SelectValue placeholder="Select destination town" />
            </SelectTrigger>
            <SelectContent>
              {towns
                .filter((town) => town !== from)
                .map((town) => (
                  <SelectItem key={town} value={town}>
                    {town}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ========== SECTION 3: DATE SELECTION ========== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DEPARTURE DATE */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Departure Date
          </Label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !departureDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                disabled={(date) => date < today || date > maxDate}
                autoFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* RETURN DATE - Only shows for round-trip */}
        {tripType === "round-trip" && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Return Date
            </Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {returnDate
                    ? format(returnDate, "PPP")
                    : "Select return date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  disabled={(date) =>
                    date < (departureDate || today) || date > maxDate
                  }
                  autoFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Search Button */}
      <Button
        className="w-full bg-gradient-hero text-primary-foreground shadow-button hover:shadow-elevated transition-all duration-300"
        size="lg"
        disabled={
          !to ||
          !from ||
          !departureDate ||
          (tripType === "round-trip" && !returnDate)
        }
        onClick={searchBuses}
      >
        <Search className="h-4 w-4"></Search>
        Search Buses
      </Button>
    </Card>
  );
}

export default RouteSearch;
