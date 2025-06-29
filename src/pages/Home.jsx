import { Link } from "react-router-dom";
import backgroundImg from "../assets/bg-img-3.jpg";
import Favourites from "./Favourites";
import Button from "../components/Button";
import MostPopular from "./MostPopular";
import OurStory from "./OurStory";
import Blog from "./Blog";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          minHeight: "calc(100vh - 80px)", // Adjust based on your navbar height
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-center md:text-left w-full max-w-4xl py-16 md:py-24">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              <span className="block">Organic Rice and</span>
              <span className="text-yellow-300">Maize</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 uppercase leading-tight">
              <span className="block">just like the</span>
              <span className="text-yellow-300">nature</span>
            </h2>

            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              INTENDED
            </h3>

            <div className="flex justify-center md:justify-start">
              <Button to="/products" name="Shop now" />
            </div>
          </div>
        </div>
      </section>

      {/* Sections with responsive padding */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <Favourites />
        <MostPopular title="Most Popular" sliceStartIndex={0} sliceEndIndex={3} />
        <OurStory />
        <Blog />
      </div>
    </div>
  );
};

export default Home;