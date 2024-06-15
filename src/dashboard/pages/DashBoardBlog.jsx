import React, { useEffect, useState, useCallback } from 'react'
import AxiosInstance from '../../config/AxiosInstance'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const DashboardBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [refresh, setRefresh] = useState(false) 

  const fetchBlogs = useCallback(async () => {
    try {
      const { data } = await AxiosInstance.get("/blog")
      if (data.statusCode === 200) {
        setBlogs(data?.data)
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error)
    }
  }, [])

  const handleDelete = async (id) => {
    const deleteBlog = confirm("Are you sure you want to delete this blog?")
    if (deleteBlog) {
      try {
        const { data } = await AxiosInstance.delete(`/blog/delete-blog/${id}`)
        if (data.statusCode === 200) {
          toast.success(data.message)
          setRefresh(!refresh) 
        } else {
          toast.error("Failed to delete blog")
        }
      } catch (error) {
        console.error("Failed to delete blog", error)
        toast.error("Failed to delete blog")
      }
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs, refresh])

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl flex items-center justify-between font-semibold mb-4">
        My Blogs
        <button className='text-white rounded-lg bg-red-500 text-base px-4 py-2 tracking-wider'>Delete Products</button>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/blog/create" className="border-2 cursor-pointer border-dashed border-gray-300 flex items-center justify-center p-4 flex-col rounded-lg">
          <span className="text-gray-400">Create a Blog.</span>
          <span className="text-5xl">+</span>
        </Link>
        {blogs.map((blog) => (
          <div key={blog._id} className="relative border rounded-lg p-4 bg-white shadow">
            <input type="checkbox" className="absolute top-2 left-2" />
            <div className="flex gap-5 p-4 flex-col items-center">
              {blog.blogImage && (
                <img
                  src={blog.blogImage}
                  alt={blog.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
              )}
              <h2 className="text-lg font-semibold truncate">{blog.title}</h2>
              <p className="text-sm text-gray-500">{blog.description.slice(0,100)} <Link className='px-4 underline text-sm text-blue-400' to={`/dashboard/blogs/story/${blog._id}`}>{blog.description.length>100? ". . . See more":null}</Link></p>
              <p className="text-sm flex items-center justify-between w-full text-gray-500">
                <Link className='bg-blue-500 hover:bg-blue-700 py-2 px-5 text-white tracking-wide' to={`/dashboard/blog/edit/${blog._id}`}>Edit</Link>
                <button onClick={() => handleDelete(blog._id)} className='bg-red-500 py-2 px-5 hover:bg-red-800 text-white tracking-wide'>Delete</button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardBlog
