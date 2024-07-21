import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  const { avatar, email, username, createdAt } = userData;

  return (
    <div>
      <div className="w-10/12  gap-2 mx-auto">
        <div className="flex flex-col gap-1 p-2">
          <h2 className="text-xl font-light border-b-[1px] pb-2">
            Your details
          </h2>
          <div className="flex justify-between py-2 border-b items-start gap-2">
            <div>
              <p>Profile:</p>
              <img
                src={avatar}
                className="h-10 w-10 object-cover  object-top rounded-sm"
                alt={username}
              />
            </div>

            <div>
              <p>Name:</p>
              <p className="capitalize text-sm text-gray-500">{username}</p>
            </div>
            <div>
              <p>Email:</p>
              <p className="capitalize text-sm text-gray-500">{email}</p>
            </div>
            <div>
              <p>Member since:</p>
              <p className="capitalize text-sm text-gray-500">
                {new Date(createdAt.substring(0, 10)).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
            <div>
              <p>Actions</p>
              <Link to="/profile/settings" className=" text-teal-500">
                Settings
              </Link>
            </div>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <h2 className="text-xl font-light border-b-[1px] pb-2">
            Your order details
          </h2>
          <div>No order</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
