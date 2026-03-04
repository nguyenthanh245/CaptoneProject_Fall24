import { LoginFormType } from "../components/Login/LoginForm";
import { RegisterFormType } from "../components/Register/RegisterForm";
import { get, post } from "./axios-config";

export type TResponseAuth = {
  code: string;
  message: string;
  data: string;
};

export type TResponseAuthNoData = {
  code: string;
  message: string;
};

export type TResponseInfoUser = {
  email: string;
  fullName: string;
  id: number;
  isActive: boolean;
  role: string;
  typeAuthentication: string;
  imageProfile: string;
  taxCode: string;
};

export async function loginApi({ data }: { data: LoginFormType }) {
  return await post<TResponseAuth>({
    url: "/Auth/login",
    data,
  });
}

export async function registerApi({ data }: { data: RegisterFormType }) {
  return await post<TResponseAuth>({
    url: "/Auth/register",
    data,
  });
}

export async function getUserApi() {
  return await get<TResponseInfoUser>({
    url: "/Auth/user",
  });
}

export async function activeAccountApi({ data }: { data: string }) {
  return await post<TResponseAuthNoData>({
    url: `/Auth/active-account/${data}`,
  });
}

export async function loginGoogleApi({ data }: { data: { googleToken: string } }) {
  return await post<any>({
    url: "/Auth/login-google",
    data,
  });
}
