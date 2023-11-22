"use client";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { toLowerCaseNonAccentVietnamese } from "@/lib/nonAccentVietnamese";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import moment from "moment";
import { useSession } from "next-auth/react";
import {
  ChangeEvent,
  FormEvent,
  Key,
  useCallback,
  useMemo,
  useState,
} from "react";
import useSWR, { Fetcher, mutate } from "swr";

const columns = [
  { name: "MÃ", uid: "couponCode", sortable: true },
  { name: "GIẢM GIÁ", uid: "discount", sortable: true },
  { name: "SỐ LƯỢNG", uid: "quantity", sortable: true },
  { name: "MÔ TẢ", uid: "description", sortable: true },
  {
    name: "HẠN SỬ DỤNG",
    uid: "expiredDate",
    sortable: true,
  },
  { name: "THAO TÁC", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "couponCode",
  "discount",
  "quantity",
  "expiredDate",
  "actions",
];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function AddCouponModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("/api/coupon", {
      method: "POST",
      body: JSON.stringify({
        couponCode: event.currentTarget.couponCode.value,
        description: event.currentTarget.description.value,
        discount: event.currentTarget.discount.value,
        quantity: event.currentTarget.quantity.value,
        expiredDate: event.currentTarget.expiredDate.value,
      }),
    }).then((res) => {
      if (res.ok) {
        mutate("/api/coupon");
        onClose();
      }
    });
  };

  return (
    <>
      <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
        Thêm mã giảm giá
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm mã giảm giá
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="couponCode"
                    label="Mã giảm giá"
                    placeholder="Nhập mã giảm giá"
                  />
                  <Input
                    name="description"
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                  />
                  <Input
                    name="discount"
                    label="Giảm giá"
                    placeholder="Nhập giảm giá"
                  />
                  <Input
                    name="quantity"
                    label="Số lượng"
                    placeholder="Nhập số lượng"
                  />
                  <Input
                    name="expiredDate"
                    type="date"
                    label="Hạn sử dụng"
                    placeholder="Nhập hạn sử dụng"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Hủy
                  </Button>
                  <Button color="primary" type="submit">
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

const fetcher: Fetcher<ICoupon[], string> = (url) =>
  fetch(url).then((res) => res.json());

export default function Page() {
  const { data: coupons, isLoading } = useSWR("/api/coupon", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: session } = useSession();
  const loadingState = isLoading || coupons?.length === 0 ? "loading" : "idle";
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredCoupons = coupons as ICoupon[];

    if (hasSearchFilter) {
      filteredCoupons = filteredCoupons.filter((coupon) =>
        toLowerCaseNonAccentVietnamese(coupon.couponCode).includes(
          toLowerCaseNonAccentVietnamese(filterValue)
        )
      );
    }

    return filteredCoupons;
  }, [filterValue, hasSearchFilter, coupons]);

  const pages = filteredItems
    ? Math.ceil(filteredItems.length / rowsPerPage)
    : 0;

  const items = useMemo(() => {
    if (filteredItems) {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice(start, end);
    } else {
      return undefined;
    }
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    if (!items) return undefined;
    return [...items].sort((a: ICoupon, b: ICoupon) => {
      const first = a[
        sortDescriptor.column as keyof ICoupon
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof ICoupon
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((coupon: ICoupon, columnKey: Key) => {
    const cellValue = coupon[columnKey as keyof ICoupon];

    switch (columnKey) {
      case "couponCode":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {cellValue as string}
            </p>
          </div>
        );
      case "discount":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">
              {cellValue.toLocaleString("vi-VN")}
            </p>
          </div>
        );

      case "quantity":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">{cellValue as string}</p>
          </div>
        );

      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">{cellValue as string}</p>
          </div>
        );

      case "expiredDate":
        return (
          <div className="flex flex-col">
            <p className="text-small capitalize">
              {moment(cellValue).format("HH:mm DD/MM/YY")}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Button variant="light" isIconOnly>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
            </Button>

            {/* <DeleteModal couponId={coupon.couponId} /> */}
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            labelPlacement="outside"
            className="w-full sm:max-w-[44%]"
            placeholder="Nhập mã giảm giá..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Cột
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddCouponModal />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Có {coupons?.length} mã giảm giá
          </span>
          <label className="flex items-center text-default-400 text-small">
            Dòng mỗi trang:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    coupons?.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Đã chọn tất cả"
            : `Đã chọn ${selectedKeys.size} trên ${
                filteredItems ? filteredItems.length : 0
              }`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-3">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Về trước
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    );
  }, [filteredItems, onNextPage, onPreviousPage, page, pages, selectedKeys]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? "Đang tải..." : "Không tìm thấy mã giảm giá nào"
          }
          items={sortedItems ?? []}
          // loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.couponCode}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as string}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
