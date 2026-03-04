import LoginImage from "../../assets/images/login-img.png";
import LoginForm from "../../components/Login/LoginForm";
// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import { useUserStore } from "../../stores/user";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  // const user = useUserStore((state) => state.user);
  // console.log(user);
  
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (Cookies.get("accessToken")) {
  //     navigate(`/get-started`);
  //   }
  // }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex border border-gray-400 shadow-2xl">
        {/* left */}
        <div className="px-28 pt-20 bg-[#F8F8F8]">
          <div
            className="text-4xl font-semibold tracking-wide"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)" }}
          >
            WELCOME BACK
          </div>
          <div className="text-[#636364] text-lg py-3">
            Welcome back! Please enter your details.
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
        {/* right */}
        <div>
          <img className="w-full h-full" src={LoginImage} alt="img" />
        </div>
      </div>
    </div>
  );
}
