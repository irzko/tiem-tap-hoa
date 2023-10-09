"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/ui/button";
import useSWR from "swr";

export function SelectAddress({
  onClose,
  setAddress,
}: {
  onClose: () => void;
  setAddress: Dispatch<SetStateAction<[ICity, IDistrict, IWard] | undefined>>;
}) {
  const [districts, setDistricts] = useState<IDistrict[] | undefined>();
  const [wards, setWards] = useState<IWard[] | undefined>();
  const [selectedAddress, setSelectedAddress] = useState<
    [ICity, IDistrict, IWard]
  >([{} as ICity, {} as IDistrict, {} as IWard]);
  const [tab, setTab] = useState<"city" | "district" | "ward">("city");

  const { data: cities } = useSWR(
    "/api/provinces",
    (url: string): Promise<ICity[]> => fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleSelectCity = (city: ICity) => {
    setSelectedAddress((prev) => [city, prev[1], prev[2]]);
    fetch(`/api/districts/${city.cityId}`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
      });
    setTab("district");
  };

  const handleSelectDistrict = (district: IDistrict) => {
    setSelectedAddress((prev) => [prev[0], district, prev[2]]);
    fetch(`/api/wards/${district.districtId}`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data);
      });
    setTab("ward");
  };

  const handleSelectWard = (ward: IWard) => {
    setSelectedAddress((prev) => [prev[0], prev[1], ward]);
  };

  const handleSubmit = () => {
    setAddress(selectedAddress);
    onClose();
  };

  return (
    <div>
      <ul className="hidden mb-2 text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full">
          <button
            className={`inline-block rounded-l-lg w-full p-4 focus:outline-none ${
              tab === "city"
                ? "text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white"
                : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            onClick={() => setTab("city")}
          >
            Tỉnh / Thành Phố
          </button>
        </li>
        <li className="w-full">
          <button
            className={`inline-block w-full p-4 focus:outline-none ${
              tab === "district"
                ? "text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white"
                : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            disabled={districts ? false : true}
            onClick={() => setTab("district")}
          >
            Quận / Huyện
          </button>
        </li>
        <li className="w-full">
          <button
            className={`inline-block w-full rounded-r-lg p-4 focus:outline-none ${
              tab === "ward"
                ? "text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white"
                : "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            disabled={wards ? false : true}
            onClick={() => setTab("ward")}
          >
            Xã / Phường
          </button>
        </li>
      </ul>
      <div className="overflow-y-auto h-96 pr-4">
        {tab === "city" && (
          <ul className="flex flex-col w-full gap-2">
            {cities?.map((city) => (
              <li key={city.cityId}>
                <input
                  onChange={() => handleSelectCity(city)}
                  type="radio"
                  id={city.cityId}
                  name="city"
                  value={city.cityId}
                  className="hidden peer"
                  required
                  checked={selectedAddress[0].cityId === city.cityId}
                />
                <label
                  htmlFor={city.cityId}
                  className="inline-flex items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full">{city.name}</div>
                  </div>
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </label>
              </li>
            ))}
          </ul>
        )}
        {tab === "district" && (
          <ul className="flex flex-col w-full gap-2">
            {districts?.map((district) => (
              <li key={district.districtId}>
                <input
                  onChange={() => handleSelectDistrict(district)}
                  type="radio"
                  id={district.districtId}
                  name="district"
                  value={district.districtId}
                  className="hidden peer"
                  checked={
                    selectedAddress[1].districtId === district.districtId
                  }
                  required
                />
                <label
                  htmlFor={district.districtId}
                  className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full">{district.name}</div>
                  </div>
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </label>
              </li>
            ))}
          </ul>
        )}
        {tab === "ward" && (
          <ul className="flex flex-col w-full gap-2">
            {wards?.map((ward) => (
              <li key={ward.wardId}>
                <input
                  onChange={() => handleSelectWard(ward)}
                  type="radio"
                  id={ward.wardId}
                  name="ward"
                  value={ward.wardId}
                  className="hidden peer"
                  checked={selectedAddress[2].wardId === ward.wardId}
                  required
                />
                <label
                  htmlFor={ward.wardId}
                  className="inline-flex  items-center justify-between w-full p-2.5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full">{ward.name}</div>
                  </div>
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={handleSubmit}>Chọn</Button>
      </div>
    </div>
  );
}
