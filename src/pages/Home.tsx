import { MapPin, Users, Star } from "lucide-react";
import heroImage from "../assets/bus-hero.jpg";
import RouteSearch from "../components/RouteSearch";


function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
          <div 
            className="h-96 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-primary/60"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
              <div className="max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Your Journey Starts Here
                </h1>
                <p className="text-xl md:text-2xl opacity-90">
                  Book your bus tickets online with SmartBus - Fast, Easy, Reliable
                </p>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-4xl mx-auto -mt-24 relative z-20 mb-16 py-8 px-4">
        <RouteSearch></RouteSearch>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SmartBus?</h2>
            <p className="text-lg text-muted-foreground">
              Experience the best in online bus booking with our premium
              features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {/* Feature 1 */}
            <div className="p-6 text-center shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Easy Route Selection
              </h3>
              <p className="text-muted-foreground">
                Search and select from hundreds of routes across Kenya with
                our intuitive interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 text-center shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Real-time Seat Selection
              </h3>
              <p className="text-muted-foreground">
                Choose your preferred seats with our visual seat map showing
                real-time availability.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 text-center shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-muted-foreground">
                Enjoy luxury buses with modern amenities and top-rated service
                providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
