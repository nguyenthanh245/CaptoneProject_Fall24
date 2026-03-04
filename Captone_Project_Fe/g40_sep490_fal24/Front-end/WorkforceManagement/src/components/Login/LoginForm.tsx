import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getUserApi, loginApi, loginGoogleApi } from "../../services/auth-api";
import Cookies from "js-cookie";
// import { CustomGoogleButton } from "../../hooks/useGoogleLogin";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import LoadingInButton from "../LoadingInButton";

const schema = z.object({
  email: z
    .string()
    .min(4, "Email at least 4 characters")
    .email("Must is email example@example.com"),
  password: z.string().min(3, "Password at least 3 characters"),
});

export type LoginFormType = z.infer<typeof schema>;

export default function LoginForm() {
  const [isLoadingLoginByUsername, setIsLoadingLoginByUserName] =
    useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormType) => {
      setIsLoadingLoginByUserName(true);
      const response = await loginApi({ data });
      return response;
    },
    onSuccess: async (response) => {
      Cookies.set("accessToken", response.data);
      const data = await getUserApi();
      if (data) {
        setIsLoadingLoginByUserName(false);
        navigate("/get-started"); // Điều hướng chung đến /home
        toast.success("Login success!");
      }
    },
    onError: (error) => {
      console.log(error);
      setIsLoadingLoginByUserName(false)
      toast.error("Login fail !! " + error);
    },
  });

  async function handleGoogleLogin(googleToken: any) {
    try {
      const response = await loginGoogleApi({
        data: { googleToken: googleToken },
      });
      if (response) {
        Cookies.set("accessToken", response.data);
        const data = await getUserApi();
        if (data) {
          navigate("/get-started"); // Điều hướng chung đến /home
          toast.success("Login success!");
        }
      }
    } catch (error) {
      toast.error(error as String);
    }
  }

  const onSubmitHandle = (data: LoginFormType) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className="pt-5 flex flex-col">
          <label className="block font-medium pb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 pl-4 border border-[#b5abab] rounded-xl"
            type="text"
            placeholder="Enter your email"
            id="email"
            {...register("email")}
          />
          <span className="text-red-700">{errors.email?.message}</span>
        </div>
        <div className="pt-4 flex flex-col">
          <label className="block font-medium pb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 pl-4 border border-[#b5abab] rounded-xl"
            type="password"
            placeholder="**************"
            id="password"
            {...register("password")}
          />
          <span className="text-red-700">{errors.password?.message}</span>
        </div>
        <div className="flex justify-between items-center pt-5">
          <div className="flex items-center gap-2">
            <input
              className="w-4 h-4 opacity-75"
              type="checkbox"
              id="remember"
            />
            <label className="text-base font-medium" htmlFor="remember">
              Remember me
            </label>
          </div>
          <div>
            <div className="text-base font-medium">Forgot password</div>
          </div>
        </div>
        <div className="w-full py-4">
          <button
            className="bg-[#EA454C] w-full py-3 text-white font-medium rounded-3xl transition-all duration-300 hover:bg-[#d93a40] hover:shadow-md"
            disabled={isLoadingLoginByUsername}
          >
            <span>
              {isLoadingLoginByUsername ? <LoadingInButton /> : "Sign In"}
            </span>
          </button>
        </div>
      </form>
      <div className="w-full flex justify-center py-2">
        <div className="w-3/4">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            shape="square"
          />
        </div>
      </div>
      <div>
        <p className="text-[#595959] font-medium text-sm text-center pt-2">
          Don't have an account?
          <span className="text-[#EA454C]">
            <a href="/register"> Sign up to free!</a>
          </span>
        </p>
      </div>
    </div>
  );
}
