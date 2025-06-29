import Button from "../components/Button";
import backgroundUser from '../assets/user/user-bg.jpg';
import userImg from '../assets/user/user-img.jpg';

const OurStory = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 xl:gap-16">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 xl:w-2/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-[2.7rem] lg:text-5xl font-light tracking-wide uppercase mb-6">
              Naturally Simple
            </h1>
            <p className="text-base md:text-lg lg:text-[1.1rem] text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              I'm Prakash Rana, an agricultural expert dedicated to bringing you the purest, most natural products. Our mill specializes in premium quality maize, wheat, and rice, sourced directly from sustainable farms.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button to="/our-story" name="Our story" bg="white" />
            </div>
          </div>

          {/* Image Content - Right Side */}
          <div className="lg:w-1/2 xl:w-3/5 relative mt-8 lg:mt-0">
            {/* Background Image - Now with controlled size */}
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-xl shadow-lg">
              <img
                src={backgroundUser}
                className="w-full h-full object-cover"
                alt="Mill background"
              />
            </div>

            {/* Overlay Image - Better proportional sizing */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6
                          md:-bottom-8 md:-right-8 lg:-bottom-10 lg:-right-10
                          w-[45%] sm:w-[40%] md:w-[38%] lg:w-[35%]">
              <img
                src={userImg}
                className="w-full h-auto object-cover rounded-lg shadow-md border-4 border-white
                          transform hover:scale-[1.03] transition-transform duration-300"
                alt="Prakash Rana"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;