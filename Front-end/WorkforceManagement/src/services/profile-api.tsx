import { update } from "./axios-config";

// type TBaseResponse<T> = {
//   code: number;
//   message: string;
//   data: T;
// };

// type TUpdateUserProfileResponse = TBaseResponse<TUpdateUserProfileData>;

// type TUpdateUserProfileData = {
//   fullName: string;
//   email: string;
//   address: string;
//   taxCode: string;
//   profileImage: string;
// };

export async function updateUserImage(formData: FormData) {
  return await update({
    url: "/Information/UpdateUserProfile",
    data: formData,
    config: {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt header chính xác
      },
    },
  });
}

export async function updateUserProfile(formData: FormData) {
    return await update({
    url: "/Information/UpdateUserProfile",
    data: formData,
    config: {
      headers: {
        "Content-Type": "multipart/form-data", // Đặt header chính xác
      },
    },
  });
}
