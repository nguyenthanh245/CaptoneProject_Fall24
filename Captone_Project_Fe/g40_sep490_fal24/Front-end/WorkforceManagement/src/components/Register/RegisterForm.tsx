import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerApi } from "../../services/auth-api";
import { toast } from "sonner";
import { useState } from "react";
import LoadingInButton from "../LoadingInButton";

const schema = z.object({
  fullName: z.string().min(4, "Full name at least 4 characters"),
  email: z
    .string()
    .min(4, "Email at least 4 characters")
    .email("Must is email example@example.com"),
  password: z.string().min(3, "Password at least 3 characters"),
});

export type RegisterFormType = z.infer<typeof schema>;

export default function RegisterForm() {
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterFormType) => {
      setIsLoadingRegister(true);
      const response = await registerApi({ data });
      return response;
    },
    onSuccess: () => {
      toast.success("Register success! Check your mail to active");
      navigate("/login");
    },
    onError: (error) => {
      toast.error("Register fail !! " + error);
      setIsLoadingRegister(false)
    },
  });

  const onSubmitHandle = (data: RegisterFormType) => {
    mutate(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div className="pt-5 flex flex-col">
          <label className="block font-medium pb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="w-full p-2 pl-4 border border-[#b5abab] rounded-xl"
            type="text"
            placeholder="Enter your full name"
            id="fullName"
            {...register("fullName")}
          />
          <span className="text-red-700">{errors.fullName?.message}</span>
        </div>
        <div className="pt-4 flex flex-col">
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
        <div className="w-full py-5">
          <button
            className="bg-[#EA454C] w-full py-3 text-white font-medium rounded-3xl transition-all duration-300 hover:bg-[#d93a40] hover:shadow-md"
            disabled={isLoadingRegister}
          >
            <span>{isLoadingRegister ? <LoadingInButton /> : "Sign Up"}</span>
          </button>
        </div>
        <div className="w-full"></div>
        <div>
          <p className="text-[#595959] font-medium text-sm text-center pt-1">
            Already have an account?
            <span className="text-[#EA454C]">
              <a href="/login"> Sign in here!</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
