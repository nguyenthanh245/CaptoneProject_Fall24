import SearchIcon from "../../assets/images/icons8-search.svg";
import SettingIcon from "../../assets/images/icons8-setting.svg";
import NotificationIcon from "../../assets/images/icons8-notification.svg";
import ProfileIcon from "../../assets/images/icons8-user-50.png";
import HelpIcon from "../../assets/images/icons8-help-50.png";
import LogoutIcon from "../../assets/images/icons8-logout-50.png";
import { useState } from "react";
import { useUserStore } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function HeaderLayout() {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const handleLogout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center h-[72px] w-full p-3 bg-[#FFFFFF] shadow gap-3 z-50">
      <div className="relative w-[40%] mr-96">
        <input
          type="text"
          placeholder="Search here"
          className="flex items-center text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700 p-2 pl-10 w-full"
        />
        <img
          src={SearchIcon}
          alt=""
          className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        />
      </div>
      <div className="flex justify-center items-center gap-7">
        <img src={SettingIcon} alt="" className="w-6" />
        <img src={NotificationIcon} alt="" className="w-6" />
        <div className="relative">
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <div className="w-12 h-12 flex justify-center rounded-full bg-slate-300 overflow-hidden">
              {user?.imageProfile ? (
                <img
                  src={`http://localhost:5173${user?.imageProfile}`}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg";
                  }}
                />
              ) : (
                <img
                  src="https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover mx-auto"
                />
              )}
            </div>
            <p className="text-base font-medium px-2">{user?.email}</p>
          </div>
          <div className={isShow ? "block" : "hidden"}>
            <div className="absolute bg-white w-44 shadow-md rounded-lg px-4 py-4 flex flex-col items-start gap-5 top-[58px] -right-1 ">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <img src={ProfileIcon} alt="" className="w-6 h-6" />
                <span className="text-sm leading-none">Profile</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={SettingIcon} alt="" className="w-6 h-6" />
                <span className="text-sm leading-none">Setting</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("contact")}
              >
                <img src={HelpIcon} alt="" className="w-6 h-6" />
                <span className="text-sm leading-none">Help</span>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleLogout}
              >
                <img src={LogoutIcon} alt="" className="w-6 h-6" />
                <span className="text-sm leading-none">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
