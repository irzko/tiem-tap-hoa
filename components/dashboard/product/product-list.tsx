"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import DeleteProductModal from "./delete-product-modal";

export default function ProductList({ products }: { products: IProduct[] }) {
  return (
    <Table aria-label="Example table with custom cells" isStriped>
      <TableHeader>
        <TableColumn key="productName" align="start">
          Tên sản phẩm
        </TableColumn>
        <TableColumn key="category" align="start">
          Danh mục
        </TableColumn>
        <TableColumn key="stockQuantity" align="start">
          Kho hàng
        </TableColumn>
        <TableColumn key="price" align="start">
          Giá
        </TableColumn>
        <TableColumn key="actions" align="center">
          Thao tác
        </TableColumn>
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item.categoryId}>
            <TableCell>{item.productName}</TableCell>
            <TableCell>{item.category.categoryName}</TableCell>
            <TableCell>{item.stockQuantity}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell align="center">
              <div className="relative flex items-center gap-2">
                <Tooltip content="Chi tiết">
                  <Link
                    href={`/p/${item.productId}`}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <svg
                      aria-hidden="true"
                      fill="none"
                      focusable="false"
                      height="1em"
                      role="presentation"
                      viewBox="0 0 20 20"
                      width="1em"
                    >
                      <path
                        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      />
                      <path
                        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      />
                    </svg>
                  </Link>
                </Tooltip>
                <Tooltip content="Chỉnh sửa sản phẩm">
                  <Link
                    href={`/dashboard/products/edit/${item.productId}`}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <svg
                      aria-hidden="true"
                      fill="none"
                      focusable="false"
                      height="1em"
                      role="presentation"
                      viewBox="0 0 20 20"
                      width="1em"
                    >
                      <path
                        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                      />
                      <path
                        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                      />
                      <path
                        d="M2.5 18.3333H17.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={1.5}
                      />
                    </svg>
                  </Link>
                </Tooltip>
                <Tooltip color="danger" content="Xóa sản phẩm">
                  <DeleteProductModal
                    productId={item.productId}
                    productName={item.productName}
                  />
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
