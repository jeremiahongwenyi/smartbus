import RadioGroup from "./RadioGroup";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

function RouteSearch() {
  const [tripType, setTripType] = useState("One Way");

  const options = [
    { value: "One Way", label: "One Way" },
    { value: "Round Trip", label: "Round Trip" },
  ];
  return (
    <>
      <div className="p-5 bg-gradient-card shadow-card md:max-w-4xl md:px-auto">
        <div className="space-y-3">
          <label htmlFor="" className=" block">
            Trip Type
          </label>
          <RadioGroup
            options={options}
            name="tripType"
            value={tripType}
            onChange={setTripType}
          ></RadioGroup>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <label htmlFor="" className="flex gap-2 items-center">
              <MapPin className="h-4 w-4"></MapPin>
              From
            </label>
            <div>
              <input type="text" />
              <Button>Click Me</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RouteSearch;
