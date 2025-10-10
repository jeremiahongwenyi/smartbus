import heroImage from "../assets/bus-hero.jpg";

function HomePage() {
  return (
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
  );
}

export default HomePage;
