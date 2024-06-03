import Image_with_text from "../components/Image_with_text"
import rice_image from "../assets/Component_image/component_bg_1.jpg"
import maize_image from "../assets/Component_image/component_bg_2.jpg"
const Favourites = () => {
  return (
    <div>
      <div className="flex py-20 tracking-widest  justify-center uppercase text-3xl font-medium text-black">
            <h1>Shop our favourites</h1>
      </div>
      <div>
      <Image_with_text 
            buttonName="Shop Maize"
             to="/products"
              paragraph="At our mill, we pride ourselves on producing top-quality maize products. Every kernel is meticulously processed at our state-of-the-art facility to retain its natural goodness. Rich in essential nutrients, our maize is sourced from trusted farmers who practice sustainable agriculture, ensuring freshness and purity. Whether you need maize flour for your favorite recipes or whole kernels for hearty meals, our products deliver exceptional quality and taste. Experience the rich, wholesome flavor of our maize and bring nature's bounty to your kitchen with every purchase." 
              title="Premium Maize Products Quality Guaranteed" 
              order="order-0"
              imagseSrc={maize_image}
              />

   <Image_with_text 
            buttonName="Shop Rice"
             to="/products"
              paragraph="At our mill, we are dedicated to crafting the finest rice products that exceed expectations. Every grain of rice undergoes meticulous processing at our advanced facility, preserving its inherent quality and nutritional value. Sourced from reputable farmers committed to sustainable farming practices, our rice is a testament to purity and freshness. Whether you're seeking the perfect texture for sushi, the aromatic essence of Basmati, or the versatility of Jasmine rice, our diverse selection caters to all culinary preferences. From fluffy grains to fragrant aroma, our rice products promise exceptional taste and satisfaction." 
              title="Quality Rice: Culinary Essential"
              order="order-1"
              imagseSrc={rice_image}
              />
      </div>
    </div>
  )
}

export default Favourites
