import Button from "../components/Button"
import backgroundUser from '../assets/user/user-bg.jpg'
import userImg from '../assets/user/user-img.jpg'
const OurStory = () => {
  return (
    <div className="flex py-40  flex-col gap-10 items-center">
      <div className="flex flex-col gap-12 items-center ">
            <h1 className="text-5xl font-light tracking-wide uppercase">Naturally Simple</h1>
            <p className=" w-2/5 font-normal tracking-wide leading-loose ">write some descripition about myself im prakash rana and i have done agricultural related course mention by your own and currently im working on mill and i open it to serve good quality maize and wheat and rice and i provide home base facility as well now make this sweet and redabale </p>
            <Button to="/our-story" name="Our story" bg="white" />
      </div>
      <div className="relative py-20">
            <img src={backgroundUser} className="w-[1000px] object-cover object-right-top opacity-95 h-[500px]" alt="User" />
            <img src={userImg} className="h-[500px] absolute top-40 left-72 w-[450px] object-cover" alt="User image" />
      </div>
    </div>
  )
}

export default OurStory
