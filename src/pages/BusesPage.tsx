import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Bus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useBuses from "@/store/busStore";
import BusCard from "@/components/BusCard";

function BusesPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const availableBuses = useBuses((state) => state.buses);
  console.log(search);
  const params = new URLSearchParams(search);
  const from = params.get("from");
  const to = params.get("to");
  const departureDate = params.get("departureDate");
  console.log(from, to, departureDate);

  const goBack = (route: string = "/") => {
    console.log(route);

    navigate(`${route}`);
  };
  return (
    <div className="m-10 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => goBack()}>
          <ArrowRight className="h-4 w-4 rotate-180" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Available Buses</h1>
          <p className="text-muted-foreground">
            {from} → {to} • {departureDate}
          </p>
        </div>
      </div>

      {availableBuses.length > 0 ? (
        availableBuses.map((bus) => (
          <BusCard key={bus.id} bus= {bus}></BusCard>
        ))
      ) : (
        <Card className="p-12 text-center">
          <Bus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Buses Found</h3>
          <p className="text-muted-foreground mb-4">
            Sorry, no buses are available for your selected route and date.
          </p>
          <Button onClick={() => goBack()}>Try Different Search</Button>
        </Card>
      )}
    </div>
  );
}

export default BusesPage;
