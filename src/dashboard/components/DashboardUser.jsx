import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../config/AxiosInstance'
import Modal from './Modal'
import { useSelector } from 'react-redux'

const DashboardUser = () => {
      const[users,setUsers]= useState([])
      const[isModalOpen,setIsModalOpen] = useState(false)
      const {modalValue} = useSelector(state=>state.modal)
      const getAllUsers = async()=>{
            const {data} = await AxiosInstance.get("/dashboard/get-all-users")
            if(data.statusCode!==200)return
            setUsers(data.data)
            console.log(data)
      }
      useEffect(()=>{
            getAllUsers()
      },[])

      const handleRemove = (id)=>{
        setIsModalOpen(!isModalOpen)
        console.log(modalValue)
        if(modalValue)alert("true")
      }
      
  return (
    <div class="bg-white p-6 rounded-lg shadow-lg w-full">
      {
isModalOpen?
        <Modal  />
        :null
      }
    <div class="flex justify-between items-center mb-4"><div>
        <h2 class="text-xl font-semibold">Users</h2>
        <p class="text-sm text-gray-500">A list of all the users in your account including their name, title, email and role.</p>
      </div>
      <button class="bg-purple-600 text-white px-4 py-2 rounded-md">Add user</button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="border-b-2 border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left text-gray-600 font-medium">Name</th>
            <th class="px-4 py-3 text-left text-gray-600 font-medium">Profile</th>
            <th class="px-4 py-3 text-left text-gray-600 font-medium">Email</th>
            <th class="px-4 py-3 text-left text-gray-600 font-medium">Role</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((user,index)=>(
              <tr key={user._id} class="border-b font-light">
              <td class="px-4 capitalize py-3"><span className='p-2 font-semibold'>
                {index+1}
                </span>
                 {user.username}</td>
              <td class="px-4 py-3 text-gray-500">
                <img className='w-8 h-8 rounded-full object-cover' src={user.avatar} alt={user.username} />
                
                </td>
              <td class="px-4 py-3 text-gray-500">{user.email}</td>
              <td class="px-4 py-3 text-gray-500">{user.role}</td>
              <td class="px-4 py-3 text-right">
                <button onClick={()=>handleRemove(user._id)} class="text-red-600 font-semibold hover:text-purple-800">Remove</button>
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default DashboardUser
