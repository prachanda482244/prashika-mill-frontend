import backgroundImg from '../assets/bg-img-3.jpg'
const Home = () => {
  
  return (
    <div
    className='flex justify-between py-4'
     style={{backgroundImage:`url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'cover',
      height: 600,
      width: "full",
      opacity:.8,
      backgroundRepeat:"no-repeat",
    }}>
<div className='flex w-full gap-2 flex-col font-semibold text-white items-center justify-center '>
  <div className=' p-3 flex flex-col'>
  <p className='text-4xl w-full'>Organic Rice and 
  <span className="text-black">
  Maize
  </span>
  </p>
  <p className='uppercase text-6xl text-wrap  w-full text-right break-all'>just like the 
  <span className="text-black">
  nature
  </span>
  </p>
  <p className='text-6xl'>INTENDED</p>
  </div>
  <div className='flex justify-start'>
  <button className=' py-2 bg-gray-500 font-normal px-10 text-center'>Shop Now</button>
  </div>

</div>
      </div> 
  );
};

export default Home;
