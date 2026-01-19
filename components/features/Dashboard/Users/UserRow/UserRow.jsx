import React from "react";
import { Link } from "react-router-dom";
import userImg from "../../../../assets/Images/userDefault.jpg";
import DeleteUser from "./DeleteUser/DeleteUser.jsx";

//
const UserRow = ({ user, refetch, index }) => {
  const {
    _id,
    propileImageUrl,
    courseTimes,
    group,
    email,
    name,
    phone,
    city,
    logInAttempt,
    status,
    role,
    paymentStatus,
    deviceLogin,
    createdAt,
    pin,
    courseDuration,
  } = user;

  return (
    <tr className="hover">
      <td className="text-orange-600">{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={propileImageUrl || userImg}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold ">{name}</div>
            {email && (
              <a href={`mailto:${email}`} className="text-sm opacity-50 block">
                {email}
              </a>
            )}
            <a href={`tel:${phone}`} className="text-sm opacity-50">
              {phone}
            </a>
            {role !== "Admin" ? (
              <div className="flex gap-2">
                <span
                  className={`badge ${
                    paymentStatus === "paid" ? "badge-success" : "badge-primary"
                  } badge-sm`}>
                  {paymentStatus}
                </span>
                <span
                  className={`badge badge-outline ${
                    status === "Active"
                      ? "badge-secondary"
                      : status === "Block"
                      ? "badge-error"
                      : status === "Disabled"
                      ? "badge-neutral"
                      : ""
                  } badge-sm`}>
                  {status}
                </span>
              </div>
            ) : (
              <span className={`badge block badge-success badge-md`}>
                {role}
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="text-orange-600">{group}</td>
      <td className="text-orange-600">
        {(deviceLogin.length > 0 && deviceLogin.length) || 0}
      </td>
      <td className="text-orange-600">{logInAttempt || 0}</td>
      <td>
        {city}
        <br />
      </td>
      <td>
        {role !== "Admin" ? (
          <DeleteUser id={_id} refetch={refetch} name={name} />
        ) : (
          <span>{name}</span>
        )}
      </td>
      <th>
        <Link to={`/propile/${_id}`} className="btn btn-ghost btn-xs">
          details
        </Link>
      </th>
    </tr>
  );
};

export default UserRow;
