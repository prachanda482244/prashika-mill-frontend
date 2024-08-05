import Button from "./Button";
const Image_with_text = ({
  order,
  title,
  paragraph,
  buttonName,
  to,
  imagseSrc,
}) => {
  return (
    <div className="container border-2 flex-col md:flex-row  py-20 flex gap-4 justify-center mx-auto md:px-24 px-10">
      <div
        className={`flex gap-5 md:gap-16 order-2 md:order-1 w-full md:w-2/5 ${
          order ? order : ""
        }  flex-col`}
      >
        <h1 className="md:text-3xl whitespace-pre-line leading-relaxed tracking-wider break-words uppercase font-normal">
          {title}
        </h1>
        <p className="font-normal md:leading-7 md:tracking-wide">{paragraph}</p>
        <div className="md:w-1/2 ">
          <Button to={to} name={buttonName} bg="bg-transparent" />
        </div>
      </div>
      <div className="md:order-2 order-1">
        <img
          src={imagseSrc}
          className="md:h-[700px] h-[450px]  rounded-lg w-full md:w-[450px] object-cover"
          alt="Products"
        />
      </div>
    </div>
  );
};

export default Image_with_text;
