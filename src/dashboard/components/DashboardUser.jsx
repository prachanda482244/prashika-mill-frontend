import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useSelector((state) => state.search);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get("/dashboard/get-all-users");
      if (data.statusCode !== 200) return;
      setUsers(data.data);
      setFilteredUser(data?.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [refresh]);

  const filteredUserItem = filteredUser.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUser(users);
    } else {
      setFilteredUser(filteredUserItem);
    }
  }, [search]);

  const handleRemove = async (id, user) => {
    const deleteUser = confirm("Are you sure you want to delete this user?");

    if (!deleteUser) return;

    if (user.role === "admin") {
      toast.error("You can't remove admin");
      return;
    }

    try {
      const { data } = await AxiosInstance.delete(`/dashboard/delete-user/${id}`);
      if (data?.statusCode !== 200) return;
      toast.success(data?.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500 mt-1">
            A list of all users including their name, email, and role.
          </p>
        </div>

      </div>

      {filteredUser.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p className="text-lg">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Profile
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Role
                </th>
                <th className="px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUser?.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-2">
                        {index + 1}.
                      </span>
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {user.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar || "https://via.placeholder.com/40"}
                        alt={user.username}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRemove(user._id, user)}
                      className="text-red-600 hover:text-red-900 mr-3 disabled:opacity-50"
                      disabled={user.role === "admin"}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardUser;