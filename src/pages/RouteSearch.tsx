import { useState } from "react";
import { MapPin, ArrowLeftRight, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function RouteSearch() {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);

  const options = [
    { value: "One Way", label: "One Way" },
    { value: "Round Trip", label: "Round Trip" },
  ];

  const swapRoutes = () => {
    console.log('i have been clicked');
    
    setTo(from);
    setFrom(to);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <Label className="block">Trip Type</Label>
        <RadioGroup value={tripType} className="flex gap-6"
        onValueChange={(value)=> setTripType(value as 'one-way'| 'round-trip')}>
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end ">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="from" className="flex gap-2 items-center">
            <MapPin className="h-4 w-4 "></MapPin>
            From
          </Label>
          <Input
            id="from"
            list="cities-from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onFocus={() => setFrom("")}
            placeholder="Select destination city"
            className="pl-4"
          />
          <datalist id="cities-from">
            <option value="Kisumu"></option>
            <option value="Bondo"></option>
            <option value="Nairobi"></option>
            <option value="Kisii"></option>
          </datalist>
        </div>

        <div className="flex justify-center" >
          <Button className="rounded-full" variant="outline" size="icon"
          disabled= {!to || !from}
          onClick={swapRoutes}>
            <ArrowLeftRight className="h-4 w-4"></ArrowLeftRight>
          </Button>
        </div>

        {/* TO Input - Takes 2 columns */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="to" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            To
          </Label>

          <div className="relative">
            <Input
              id="to"
              placeholder="Select destination city"
              list="cities-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onFocus={() => setTo("")}
              className="pl-4"
            />

            <datalist id="cities-to">
              <option value="Kitale"></option>
              <option value="Mombasa"></option>
            </datalist>
          </div>
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
        disabled = {!to || !from || !departureDate}
      >
        <Search className="h-4 w-4"></Search>
        Search Buses
      </Button>
    </Card>
  );
}

export default RouteSearch;
