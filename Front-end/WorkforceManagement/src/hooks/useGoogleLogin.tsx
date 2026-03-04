// import { useGoogleLogin } from "@react-oauth/google";
// import GoogleImage from "../assets/images/google-img.png";
// import { loginGoogleApi } from "../services/auth-api";

// export const CustomGoogleButton = () => {
//   const login = useGoogleLogin({
//     onSuccess: handleGoogleLogin,
//     onError: () => {
//       console.log("Login Failed");
//     },
//   });

//   async function handleGoogleLogin(response: any) {
//     console.log(response);
//     const data = await loginGoogleApi({ GoogleToken: response.id_token });
//     console.log(data);
//   }

//   return (
//     <button
//       onClick={() => login()}
//       type="button"
//       className="flex justify-center items-center gap-3 bg-white w-full py-2 text-black font-medium rounded-3xl border border-[#b5abab] transition-all duration-300 hover:bg-[#f6f4f4] hover:shadow-md"
//     >
//       <img className="w-[28px]" src={GoogleImage} alt="Google icon" />
//       Sign in with Google
//     </button>
//   );
// };
