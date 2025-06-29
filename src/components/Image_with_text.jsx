import Button from "./Button";

const Image_with_text = ({
  imagePosition = "left", // Default to left if not specified
  title,
  paragraph,
  buttonName,
  to,
  imagseSrc,
}) => {
  return (
    <div className={`flex flex-col md:flex-row gap-8 lg:gap-12 xl:gap-16 items-center
                    ${imagePosition === "right" ? "md:flex-row-reverse" : ""}
                    py-10 py-14 lg:py-16 px-4 sm:px-6`}>
      {/* Image Section */}
      <div className="w-full md:w-1/2 lg:w-2/5">
        <img
          src={imagseSrc}
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]
                    object-cover rounded-lg shadow-md"
          alt="Products"
        />
      </div>

      {/* Text Content Section */}
      <div className="w-full md:w-1/2 lg:w-3/5 space-y-4 md:space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl
                      uppercase tracking-wider font-normal leading-tight">
          {title}
        </h1>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-[15px] lg:text-base">
          {paragraph}
        </p>
        <div className="w-full sm:w-1/2 md:w-2/5 lg:w-2/5">
          <Button
            to={to}
            name={buttonName}
            className="w-full text-center"
            bg="bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Image_with_text;