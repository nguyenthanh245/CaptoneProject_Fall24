import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/user";
import { useEffect, useState } from "react";
import { updateUserImage, updateUserProfile } from "../services/profile-api";
import { toast } from "sonner";

type TUserProfile = {
  fullName: string;
  email: string;
  address: string;
  taxCode: string;
};

export default function Profile() {
  const [, setRole] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [, setProfileImage] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<TUserProfile>({
    // no image
    fullName: "",
    email: "",
    address: "",
    taxCode: "",
  });

  useEffect(() => {
    if (user) {
      if (user?.role) {
        setRole(user.role.toLowerCase());
      }
      setUserInfo({
        fullName: user.fullName || "",
        email: user.email || "",
        address: "123 Giap Bat, Ha Noi",
        taxCode: user.taxCode,
      });
    }
  }, [user]);

  function handleOnchangeProfile(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleUpdateProfile() {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("FullName", userInfo.fullName);
      formData.append("Address", userInfo.address);
      formData.append("TaxCode", userInfo.taxCode);
      await updateUserProfile(formData);
      toast.success("Update profile success !");
      setIsLoading(false);
    } catch (error) {
      toast.error(error as string);
      setIsLoading(false);
    }
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setProfileImage(file);
        const formData = new FormData();
        formData.append("profileImage", file);
        await updateUserImage(formData);
        window.location.reload();
        toast.success("Update image success");
      } catch (error) {
        toast.error(error as string);
      }
    }
  };

  const isFormValid = userInfo.fullName && userInfo.address && userInfo.taxCode;

  return (
    <div className="main-container p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="page-header mb-8">
          <div className="flex justify-between items-center">
            <h4 className="text-3xl font-bold text-gray-800">Profile</h4>
            <nav>
              <ol className="breadcrumb inline-flex space-x-2 text-sm">
                <li>
                  <div
                    className="text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/get-started`)}
                  >
                    Home
                  </div>
                </li>
                <li className="text-gray-500">/ Profile</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar (Profile Information) */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="profile-photo text-center mb-6">
              <div className="relative inline-block">
                {user?.imageProfile ? (
                  <img
                    src={`http://localhost:5173${user?.imageProfile}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto"
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
                    className="w-32 h-32 rounded-full mx-auto"
                  />
                )}
                <a
                  href="#"
                  className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <i className="fa fa-pencil"></i>
                </a>
              </div>
              <p
                className="underline text-blue-500 cursor-pointer"
                onClick={() => document.getElementById("imageInput")?.click()}
              >
                Change Image
              </p>
              {/* Input file hidden để chọn ảnh */}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <h5 className="text-xl font-semibold text-gray-800">
                {userInfo?.fullName}
              </h5>
              <p className="text-gray-500">ID Code: 12345678</p>
            </div>

            <div className="profile-info">
              <h5 className="text-lg font-semibold text-blue-500 mb-4">
                Contact Information
              </h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Gender:</strong> Male
                </li>
                <li>
                  <strong>Date of Birth:</strong> 01/01/1990
                </li>
                <li>
                  <strong className="read-only:">Email:</strong> {user?.email}
                </li>
                <li>
                  <strong>Phone:</strong> 123-456-7890
                </li>
                <li>
                  <strong>Address:</strong> {userInfo.address}
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section (Settings & Change Password) */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
            <div className="tabs">
              <div className="tab-content">
                {/* Settings Section */}
                <div id="settings" className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Edit Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="John Doe"
                        value={userInfo.fullName}
                        onChange={handleOnchangeProfile}
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-200"
                        defaultValue="johndoe@example.com"
                        value={userInfo.email}
                        onChange={handleOnchangeProfile}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700">
                        Tax Code *
                      </label>
                      <input
                        name="taxCode"
                        type="text"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={userInfo.taxCode}
                        onChange={handleOnchangeProfile}
                      />
                    </div>

                    <div className="form-group md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        defaultValue="123 Main St, City, Country"
                        value={userInfo.address}
                        onChange={handleOnchangeProfile}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      className={`bg-blue-500 text-white px-4 py-2 rounded font-semibold text-base ${
                        !isFormValid || isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-600"
                      }`}
                      onClick={handleUpdateProfile}
                      disabled={!isFormValid || isLoading}
                    >
                      Update Information
                    </button>
                  </div>
                </div>

                <div className="my-8 border-t border-gray-300"></div>

                {/* Change Password Section */}
                <div id="change-password" className="space-y-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Change Password
                  </h4>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700">
                        Old Password
                      </label>
                      <input
                        type="password"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Old password"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="New password"
                      />
                    </div>
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
