import { useNavigate, useSearchParams } from "react-router-dom";
import EmailImage from "../../assets/images/email-letter.svg";
import VerifyUserIcon from "../../assets/images/verified-user-icon.png";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { activeAccountApi } from "../../services/auth-api";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { isPending, mutateAsync } = useMutation({
    // https://github.com/TanStack/query/discussions/6297
    mutationKey: ["verify-email"],
    mutationFn: async (tokenValue: string) => {
      const response = await activeAccountApi({ data: tokenValue });
      return response;
    },
    onSuccess: (response) => {
      console.log(response.message);
    },
    onError: () => {
      navigate("/login");
    },
  });

  function handleLoginRedirect() {
    navigate("/login");
  }

  useEffect(() => {
    const tokenValue = params.get("tokenValue");
    if (tokenValue) {
      toast.promise(mutateAsync(tokenValue), {
        loading: "Wait a second .....",
        success: "Done verify",

      })
    } else {
      navigate("/login");
    }
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#F3F6F8] text-center">
      <img className="w-1/5 mr-14" src={EmailImage} alt="" />
      <div className="text-3xl font-bold text-green-600">
        Your email has been verified successfully!
      </div>
      <div className="flex flex-col justify-center items-center text-lg font-medium pt-8 text-gray-700">
        <p>
          Your email address has been verified. You're all set to make some
          motion
        </p>
        <div className="flex items-center gap-2">
          <p className="text-blue-500 font-semibold">
            magic with the SOC system
          </p>
          <span className="block">
            <img className="w-1/3" src={VerifyUserIcon} alt="user-icon" />
          </span>
        </div>
      </div>
      <div className="py-6 mr-3">
        <button
          className="bg-[#009D91] p-4 text-white font-bold rounded-2xl hover:bg-[#7d8080]"
          onClick={handleLoginRedirect}
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
}
