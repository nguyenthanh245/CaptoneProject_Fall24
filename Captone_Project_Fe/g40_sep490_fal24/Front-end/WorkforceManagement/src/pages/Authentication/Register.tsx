import RegisterForm from "../../components/Register/RegisterForm";
import RegisterImage from "../../assets/images/register.svg";

export default function Register() {
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex border border-gray-400 shadow-2xl">
          {/* left */}
          <div className="">
            <img className="w-[540px] h-[650px]" src={RegisterImage} alt="img" />
          </div>
          {/* right */}
          <div className="px-28 pt-20 bg-[#F8F8F8]">
            <div
              className="text-4xl font-semibold tracking-wide"
              style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)" }}
            >
              Create Account
            </div>
            <div className="text-[#636364] text-lg py-3">
              Please fill in the form to create your account.
            </div>
            <div>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
