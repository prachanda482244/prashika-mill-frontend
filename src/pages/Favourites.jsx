import Image_with_text from "../components/Image_with_text";
import rice_image from "../assets/Component_image/component_bg_1.jpg";
import maize_image from "../assets/Component_image/component_bg_2.jpg";

const Favourites = () => {
  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-wide font-medium text-gray-800">
          Shop our favourites
        </h1>
      </div>

      <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
        <Image_with_text
          buttonName="Shop Maize"
          to="/products"
          paragraph="At our mill, we pride ourselves on producing top-quality maize products. Every kernel is meticulously processed at our state-of-the-art facility to retain its natural goodness. Rich in essential nutrients, our maize is sourced from trusted farmers who practice sustainable agriculture, ensuring freshness and purity."
          title="Premium Maize Products Quality Guaranteed"
          imagePosition="left"
          imagseSrc={maize_image}
        />

        <Image_with_text
          buttonName="Shop Rice"
          to="/products"
          paragraph="At our mill, we are dedicated to crafting the finest rice products that exceed expectations. Every grain of rice undergoes meticulous processing at our advanced facility, preserving its inherent quality and nutritional value. Sourced from reputable farmers committed to sustainable farming practices."
          title="Quality Rice: Culinary Essential"
          imagePosition="right"
          imagseSrc={rice_image}
        />
      </div>
    </div>
  );
};

export default Favourites;