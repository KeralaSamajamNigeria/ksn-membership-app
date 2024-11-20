import React, { useState } from "react";
import avatar from "../../assets/avatar.png";
import Popup from "../Popup/Popup";
import NotificationComponent from "../NotificationComponent/NotificationComponent";

type AvatarProps = {
  className: string;
  image?: string;
  handlShowPopup?: () => void;
  showMorePopUp?: boolean;
};
function Avatar({
  className,
  image,
  handlShowPopup,
  showMorePopUp,
}: AvatarProps) {
  const userImage = !image ? avatar : image;
  return (
    <>
      <div
        className={`${className} rounded-full cursor-pointer `}
        onClick={handlShowPopup}
      >
        <img
          src={userImage}
          alt="User picture"
          className={`${className} rounded-full`}
        />
        {showMorePopUp && (
          <div className=" relative  z-50 -top-1 right-24 mt-2 w-[136px]">
            <Popup handlShowPopup={handlShowPopup} />
          </div>
        )}
      </div>
    </>
  );
}

export default Avatar;
