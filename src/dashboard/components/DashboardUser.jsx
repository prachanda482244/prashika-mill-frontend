import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../config/AxiosInstance'

const DashboardUser = () => {
      const[users,setUsers]= useState([])
      const getAllUsers = async()=>{
            const {data} = await AxiosInstance.get("/dashboard/get-all-users")
            if(data.statusCode!==200)return
            setUsers(data.data)
            console.log(data)
      }
      useEffect(()=>{
            getAllUsers()
      },[users])
  return (
    <div className='flex flex-col  items-center'>
      <div className='flex items-center justify-between border w-1/2 '>
       <div>sn</div>
       <div>name</div>
       <div>email</div>
      </div>
      {
            users?.map((user,index)=>(
                  <div className='flex border px-10 py-3 my-1 justify-between w-full  items-center' key={user._id}>
                        <div className=' flex border items-center gap-2 '>
                        <span className='w-5'>{index+1}</span>
                              
                              <img className='w-8 h-8 object-cover rounded-full' src={user.avatar} alt={user.username} />
                        <p>{user.username}</p>
                        </div>
                        <div>{user.email}</div>

                  </div>
            ))
      }

    </div>
  )
}

export default DashboardUser
