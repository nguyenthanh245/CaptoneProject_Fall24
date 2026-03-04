import { DatePicker } from "antd";
import VulStatusByDateChart from "./VulStatusByDateChart";
import { useState } from "react";
import {
  getTasksByDate,
  TTasksByDateData,
} from "../../services/soc-manager-api";

export default function DashboardByDate() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dataTasksByDate, setDataTasksByDate] = useState<
    TTasksByDateData[] | null
  >();

  const handleDateChange = async (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      const formattedDateForUI = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
      setSelectedDate(formattedDateForUI);
      try {
        const formattedDate = date.toLocaleDateString("en-VN");
        const response = await getTasksByDate({ selectedDate: formattedDate });
        if (response.data) {
          setDataTasksByDate(response.data);
        } else {
          setDataTasksByDate(null);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="flex flex-col py-2 rounded-lg space-y-4 relative">
      <div className="absolute top-10 left-10">
        <h1 className="text-3xl font font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#a4c6b8] to-[#5e435d]">
          Work Progress for{" "}
          <span className="underline">
            {selectedDate || "*(Select a date)"}
          </span>
        </h1>
      </div>

      <div className="flex items-center space-x-10">
        <div className="flex w-2/3 rounded-lg shadow-lg pl-3">
          <div className="flex flex-col items-center mr-3">
            <DatePicker
              aria-label="Basic date picker"
              placement="bottomLeft"
              size="large"
              style={{ height: "40px" }}
              onChange={handleDateChange}
            />
          </div>
          <div className="h-auto border-l border-gray-300"></div>
          <div className="bg-white p-4 w-full space-y-4 max-h-[250px] min-h-[250px] overflow-y-auto rounded-lg shadow-md">
            {dataTasksByDate && dataTasksByDate.length > 0 ? (
              dataTasksByDate.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-sm"
                    src={`http://localhost:5173${item.user.profileImage}`}
                    alt="User Avatar"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg";
                    }}
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="text-md font-semibold text-gray-800">
                        {item.user.fullName}
                      </h2>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                        {item.statusName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 text-left">
                      {item.taskName}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No tasks to handle on this day
              </div>
            )}
          </div>
        </div>
        <VulStatusByDateChart />
      </div>
    </div>
  );
}
