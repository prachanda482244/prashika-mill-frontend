import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  const links = [
    {
      id: 1,
      name: "post",
    },
    {
      id: 2,
      name: "about",
    },
    {
      id: 3,
      name: "friend",
    },
    {
      id: 4,
      name: "photos",
    },
  ];
  return (
    <div className="flex flex-col gap-3 bg-slate-700 min-h-screen p-5  ">
      <div className="flex items-center max-h-52 gap-10">
        <div>
          <img
            src={userData?.avatar}
            alt="avatar"
            className="h-[200px] object-cover w-[200px] rounded-full"
          />
        </div>
        <div className="text-4xl capitalize font-semibold text-slate-200">
          {userData.username}
        </div>
        <div>
          <button className="bg-slate-500 font-semibold px-5 py-3 rounded-md text-slate-300">
            Edit profile
          </button>
        </div>
      </div>
      <div className="flex gap-10 text-slate-300 items-center">
        {links?.map((link) => (
          <div>{link.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
