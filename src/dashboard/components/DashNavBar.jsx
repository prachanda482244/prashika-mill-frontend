import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux';

const DashNavBar = () => {
  const {  userData } = useSelector((state) => state.user);
console.log(userData)
  return (
    <nav className='flex items-center justify-between py-3 px-10'>
      <div>
        <p className='text-2xl font-medium tracking-wider'>Prashika mel</p>
      </div>
      <div className='flex-grow  relative flex justify-center mx-10'>
        <input className=' py-3 w-full px-14 outline-none focus:border-purple-400 rounded-lg hover:border font-light capitalize h-[52px]' type="text" placeholder='search' />
      <CiSearch className='absolute left-4 top-3 text-2xl' />
        
      </div>
      <div className='flex items-center gap-2'>
        <img src={userData?.avatar} className='h-8 w-8 object-cover rounded-full' alt="User image" />
        <span className='font-light tracking-wider capitalize text-lg'>{userData.username} </span>
      </div>
    </nav>
  )
}

export default DashNavBar
