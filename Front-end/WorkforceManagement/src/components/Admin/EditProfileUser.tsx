import { useEffect, useState } from "react";
import PersonIcon from "../../assets/images/icons8-person-50.png";
import {
  getUserDetails,
  TFormUpdateUser,
  TResponseUsersInfo,
  updateUserInformation,
} from "../../services/admin-api";
import { toast } from "sonner";

type TProps = {
  setIsShowBoxEdit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEmail: string;
  refetch: () => void;
};

export default function EditProfileUser({
  setIsShowBoxEdit,
  selectedEmail,
  refetch
}: TProps) {
  const [userDetailsData, setUserDetailsData] = useState<TResponseUsersInfo>();
  const [dataUpdate, setDataUpdate] = useState<TFormUpdateUser>({
    fullName: "",
    roleValue: "",
    address: "",
    isLocked: false,
  });

  async function fetchUserDetails() {
    try {
      const response = await getUserDetails({ emailUser: selectedEmail });
      if (response) {
        setUserDetailsData(response.data);
        setDataUpdate({
          fullName: response.data.fullName,
          roleValue: response.data.roleValue,
          address: response.data.address,
          isLocked: response.data.isLocked,
        });
      }
    } catch (error) {}
  }

  function handleOnchangeDetails(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = e.target;

    // Cập nhật trạng thái `dataUpdate` (cập nhật giao diện)
    setUserDetailsData((prevData) => {
      if (!prevData) return prevData;
      return { ...prevData, [name]: value };
    });

    setDataUpdate((prevData) => ({
      ...prevData,
      [name]: name === "isLocked" ? value === "true" : value,
    }));
  }

  function handleOnclick() {
    setUserDetailsData((prevData) =>
      prevData ? { ...prevData, isLocked: !prevData.isLocked } : prevData
    );
    setDataUpdate((prevData) => ({
      ...prevData,
      isLocked: !prevData.isLocked,
    }));
  }

  async function handleUpdateProfileUser() {
    try {
      await updateUserInformation({ selectedEmail, dataUpdate });
      toast.success("Update user success")
      setIsShowBoxEdit(false);
      refetch();
    } catch (error) {}
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <div
        id="crud-modal"
        className="flex justify-center items-center fixed inset-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Information
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
                onClick={() => setIsShowBoxEdit(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {userDetailsData && (
              <div className="p-4 md:p-5">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex w-full items-center gap-3">
                    <img
                      className="w-14 h-14 rounded-full bg-slate-300 overflow-hidden"
                      src={PersonIcon}
                      alt="avatar user"
                    />
                    <div className="text-start">
                      <div className="font-bold text-xl text-gray-900">
                        {userDetailsData.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {userDetailsData.fullName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label
                      htmlFor="toggle-switch"
                      className="text-gray-900 font-medium"
                    >
                      {userDetailsData.isLocked ? "Locked" : "Unlock"}
                    </label>
                    <button
                      id="toggle-switch"
                      type="button"
                      role="switch"
                      aria-checked={userDetailsData.isLocked}
                      onClick={handleOnclick}
                      className={`group flex w-14 h-8 p-1 ml-4 rounded-full transition-colors duration-300 ease-in-out overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                        userDetailsData.isLocked ? "bg-red-500" : "bg-slate-600"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                          userDetailsData.isLocked
                            ? "translate-x-6"
                            : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-start">
                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="id"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      id="id"
                      className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                      value={userDetailsData.id}
                      disabled
                    />
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      value={userDetailsData.fullName}
                      onChange={handleOnchangeDetails}
                    />
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                      value={userDetailsData.email}
                      disabled
                    />
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                      value={userDetailsData.password || "************"}
                      onChange={handleOnchangeDetails}
                      disabled
                    />
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="typeAuthentication"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Authentication Type
                    </label>
                    <input
                      type="text"
                      name="typeAuthentication"
                      id="typeAuthentication"
                      className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                      value={userDetailsData.typeAuthentication || ""}
                      disabled
                    />
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Role
                    </label>
                    <select
                      name="roleValue"
                      id="role"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      value={userDetailsData.roleValue}
                      onChange={handleOnchangeDetails}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="CUSTOMER">CUSTOMER</option>
                      <option value="LEADER">LEADER</option>
                      <option value="PENTESTER">PENTESTER</option>
                      <option value="SOCMANAGER">SOCMANAGER</option>
                    </select>
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="createAt"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Created At
                    </label>
                    <input
                      type="text"
                      name="createAt"
                      id="createAt"
                      className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5"
                      value={userDetailsData.createAt}
                      disabled
                    />
                  </div>

                  <div className="flex-1 min-w-[45%]">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address
                    </label>
                    <input
                      name="address"
                      id="address"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Write address here"
                      value={userDetailsData.address || ""}
                      onChange={handleOnchangeDetails}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleUpdateProfileUser}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
