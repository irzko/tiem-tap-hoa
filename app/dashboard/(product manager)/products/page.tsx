"use client";
import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import { PlusIcon } from "@/components/icons/plus-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { VerticalDotsIcon } from "@/components/icons/vertical-dots-icon";
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
  Link,
} from "@nextui-org/react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import useSWR, { Fetcher } from "swr";

const columns = [
  { name: "ID", uid: "productId", sortable: true },
  { name: "TÊN SẢN PHẨM", uid: "productName", sortable: true },
  { name: "GIÁ", uid: "price", sortable: true },
  { name: "LOẠI", uid: "categoryName", sortable: true },
  { name: "TỒN KHO", uid: "stockQuantity", sortable: true },
  { name: "THAO TÁC", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "productName",
  "price",
  "stockQuantity",
  "actions",
];

const fetcher: Fetcher<IProduct[], string> = (url) =>
  fetch(url).then((res) => res.json());

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Page() {
  const { data: products, isLoading } = useSWR("/api/products", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const loadingState = isLoading || products?.length === 0 ? "loading" : "idle";

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
    let filteredProducts = products as IProduct[];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        // product.productName.toLowerCase().includes(filterValue.toLowerCase())
        toLowerCaseNonAccentVietnamese(product.productName).includes(
          toLowerCaseNonAccentVietnamese(filterValue)
        )
      );
    }

    return filteredProducts;
  }, [filterValue, hasSearchFilter, products]);

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
    return [...items].sort((a: IProduct, b: IProduct) => {
      const first = a[sortDescriptor.column as keyof IProduct] as number;
      const second = b[sortDescriptor.column as keyof IProduct] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((product: IProduct, columnKey: Key) => {
    const cellValue = product[columnKey as keyof IProduct];

    switch (columnKey) {
      case "productName":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${product.images[0]}`,
            }}
            // description={product.productName}
            name={cellValue as string}
          >
            {product.productName}
          </User>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {cellValue as string}
            </p>
            {/* <p className="text-bold text-tiny capitalize text-default-400">
              {product.price}
            </p> */}
          </div>
        );

      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Xem</DropdownItem>
                <DropdownItem>Chỉnh sửa</DropdownItem>
                <DropdownItem>Xóa</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      case "categoryName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {product.category.categoryName}
            </p>
            {/* <p className="text-bold text-tiny capitalize text-default-400"></p> */}
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
            placeholder="Tìm kiếm tên sản phẩm..."
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
            <Button
              color="primary"
              as={Link}
              href="/dashboard/products/create"
              endContent={<PlusIcon />}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Có {products?.length} sản phẩm
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
    products?.length,
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
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
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
            <TableRow key={item.categoryId}>
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
