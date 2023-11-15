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
  User,
  Pagination,
  Selection,
  SortDescriptor,
  Link as NextLink,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import useSWR, { Fetcher, mutate } from "swr";

const columns = [
  { name: "MÃ", uid: "orderId", sortable: true },
  { name: "TÊN SẢN PHẨM", uid: "productName" },
  { name: "TỔNG CỘNG", uid: "totalAmount", sortable: true },
  { name: "ĐỊA CHỈ", uid: "shippingAddress", sortable: true },
  // { name: "TỒN KHO", uid: "stockQuantity", sortable: true },
  { name: "THAO TÁC", uid: "actions" },
];

const fetcher: Fetcher<IOrder[], string> = (url) =>
  fetch(url).then((res) => res.json());

const INITIAL_VISIBLE_COLUMNS = [
  "productName",
  "totalAmount",
  "stockQuantity",
  "actions",
];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function CancelModal({ orderId, userId }: { orderId: string; userId: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [reason, setReason] = useState("");
  const handleCancel = () => {
    fetch(`/api/orders/toship?action=cancel`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, userId, description: reason }),
    }).then((res) => {
      if (res.ok) {
        mutate("/api/orders/toship");
        onClose();
      }
    });
  };

  return (
    <>
      <Button onPress={onOpen}>Hủy đơn hàng</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Xác nhận hủy
              </ModalHeader>
              <ModalBody>
                <Textarea
                  label="Lý do hủy đơn hàng"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  labelPlacement="outside"
                  isRequired
                  placeholder="Nhập lý do hủy đơn hàng"
                ></Textarea>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Không
                </Button>
                <Button color="danger" onPress={handleCancel}>
                  Hủy đơn hàng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Page() {
  const { data: orders, isLoading } = useSWR("/api/orders/toship", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: session } = useSession();
  const loadingState = isLoading || orders?.length === 0 ? "loading" : "idle";

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
    let filteredOrders = orders as IOrder[];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((order) =>
        // order.orderName.toLowerCase().includes(filterValue.toLowerCase())
        toLowerCaseNonAccentVietnamese(order.orderId).includes(
          toLowerCaseNonAccentVietnamese(filterValue)
        )
      );
    }

    return filteredOrders;
  }, [filterValue, hasSearchFilter, orders]);

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
    return [...items].sort((a: IOrder, b: IOrder) => {
      const first = a[sortDescriptor.column as keyof IOrder] as number;
      const second = b[sortDescriptor.column as keyof IOrder] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (order: IOrder, columnKey: Key) => {
      const cellValue = order[columnKey as keyof IOrder];

      switch (columnKey) {
        case "productName":
          return (
            <div className="flex flex-col items-start gap-2">
              {order.orderDetails.map((orderDetail) => {
                return (
                  <User
                    key={orderDetail.orderDetailId}
                    avatarProps={{
                      radius: "lg",
                      src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${orderDetail.product.images[0]}`,
                    }}
                    // description={order.orderName}
                    name={orderDetail.product.productName}
                  >
                    {orderDetail.product.productName}
                  </User>
                );
              })}
            </div>
          );
        case "totalAmount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {cellValue as string}
              </p>
            </div>
          );

        case "shippingAddress":
          return (
            <div className="flex flex-col">
              <p className="text-small capitalize">{cellValue as string}</p>
            </div>
          );

        case "actions":
          return (
            <CancelModal
              orderId={order.orderId}
              userId={session?.user.userId!}
            />
          );

        default:
          return cellValue;
      }
    },
    [session?.user.userId]
  );

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
            placeholder="Nhập mã đơn hàng"
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
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Có {orders?.length} sản phẩm
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
    orders?.length,
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
            isLoading ? "Đang tải..." : "Không tìm thấy sản phẩm nào"
          }
          items={sortedItems ?? []}
          // loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.orderId}>
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
