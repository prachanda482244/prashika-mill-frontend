import { Link } from "react-router-dom";
import backgroundImg from "../assets/bg-img-3.jpg";
import Favourites from "./Favourites";
import Button from "../components/Button";
import MostPopular from "./MostPopular";
import OurStory from "./OurStory";
import Blog from "./Blog";
const Home = () => {
  return (
    <div>
      <div
        className="flex justify-between py-4 bg-cover bg-center h-96 w-full "
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "cover",
          height: 600,
          width: "full",
          opacity: 0.8,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="flex w-full gap-2 flex-col font-semibold text-white items-center justify-center "
          style={{ textShadow: "2px 2px 5px purple" }}
        >
          <div className=" p-3 flex flex-col">
            <p className="text-4xl w-full">
              Organic Rice and
              <span className="text-black">Maize</span>
            </p>
            <p className="uppercase text-6xl text-wrap  w-full text-right break-all">
              just like the
              <span className="text-black">nature</span>
            </p>
            <p className="text-6xl">INTENDED</p>
          </div>
          <div className="flex justify-start">
            <Button to="/products" name="Shop now" />
          </div>
        </div>
      </div>
      <Favourites />
      <MostPopular title="Most Popular" sliceStartIndex={0} sliceEndIndex={3} />
      <OurStory />
      <Blog />
    </div>
  );
};

export default Home;
