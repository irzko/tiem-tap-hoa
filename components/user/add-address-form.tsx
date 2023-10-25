"use client";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
  cn,
} from "@nextui-org/react";
import useSWR from "swr";
import { addAddress } from "@/libs/actions";

const ProvinceSelect = ({
  selectedProvince,
  setSelectedProvince,
}: {
  selectedProvince: [ICity, IDistrict, IWard];
  setSelectedProvince: React.Dispatch<
    React.SetStateAction<[ICity, IDistrict, IWard]>
  >;
}) => {
  const [currentTab, setCurrentTab] = useState("city");

  const [districts, setDistricts] = useState<IDistrict[] | undefined>();
  const [wards, setWards] = useState<IWard[] | undefined>();
  const [toggleProvince, setToggleProvince] = useState(false);

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
    setSelectedProvince((prev) => [city, prev[1], prev[2]]);
    fetch(`/api/districts/${city.cityId}`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
      });
    setCurrentTab("district");
  };

  const handleSelectDistrict = (district: IDistrict) => {
    setSelectedProvince((prev) => [prev[0], district, prev[2]]);
    fetch(`/api/wards/${district.districtId}`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data);
      });
    setCurrentTab("ward");
  };

  const handleSelectWard = (ward: IWard) => {
    setSelectedProvince((prev) => [prev[0], prev[1], ward]);
    setToggleProvince(false);
  };
  return (
    <>
      <Input
        isReadOnly
        // variant=""
        onChange={() => {}}
        value={
          selectedProvince[2].name
            ? selectedProvince.map((item) => item.name).join(", ")
            : ""
        }
        label="Địa chỉ"
        placeholder="Chọn địa chỉ"
        onClick={() => setToggleProvince((prev) => !prev)}
      />
      {toggleProvince && (
        <Tabs
          fullWidth
          aria-label="Options"
          selectedKey={currentTab}
          onSelectionChange={(key) => setCurrentTab(key.toString())}
        >
          <Tab key="city" title="Tỉnh / Thành Phố">
            <RadioGroup
              value={selectedProvince[0].cityId}
              className="h-64 overflow-auto"
            >
              {cities?.map((city) => (
                <Radio
                  onChange={() => handleSelectCity(city)}
                  key={city.cityId}
                  value={city.cityId}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  {city.name}
                </Radio>
              ))}
            </RadioGroup>
          </Tab>
          <Tab key="district" title="Quận / Huyện">
            <RadioGroup
              className="h-64 overflow-auto"
              value={selectedProvince[1].districtId}
            >
              {districts?.map((district) => (
                <Radio
                  onChange={() => handleSelectDistrict(district)}
                  key={district.districtId}
                  value={district.districtId}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  {district.name}
                </Radio>
              ))}
            </RadioGroup>
          </Tab>
          <Tab key="ward" title="Phường / Xã">
            <RadioGroup
              className="h-64 overflow-auto"
              value={selectedProvince[2].wardId}
            >
              {wards?.map((ward) => (
                <Radio
                  key={ward.wardId}
                  onChange={() => handleSelectWard(ward)}
                  value={ward.wardId}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  {ward.name}
                </Radio>
              ))}
            </RadioGroup>
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default function AddAddressForm({
  redirectPath,
}: {
  redirectPath: string;
}) {
  const [selectedProvince, setSelectedProvince] = useState<
    [ICity, IDistrict, IWard]
  >([{} as ICity, {} as IDistrict, {} as IWard]);
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" variant="flat" onPress={onOpen}>
        Thêm địa chỉ
      </Button>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) => {
                  formData.append("userId", session?.user?.userId as string);
                  formData.append("cityId", selectedProvince[0].cityId);
                  formData.append("districtId", selectedProvince[1].districtId);
                  formData.append("wardId", selectedProvince[2].wardId);
                  addAddress(formData, redirectPath);
                }}
                className="flex flex-col space-y-4"
              >
                <ModalHeader className="flex flex-col gap-1">
                  Thêm địa chỉ mới
                </ModalHeader>
                <ModalBody>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input id="fullName" name="fullName" label="Họ và tên" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Số điện thoại"
                    />
                  </div>
                  <ProvinceSelect
                    selectedProvince={selectedProvince}
                    setSelectedProvince={setSelectedProvince}
                  />

                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    label="Địa chỉ cụ thể"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Hủy
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Thêm
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
