export const orderStatus: { type: OrderTabType; name: OrderStatusType }[] = [
  {
    type: "unpaid",
    name: "Chờ xác nhận",
  },
  {
    type: "toship",
    name: "Chờ lấy hàng",
  },
  {
    type: "shipping",
    name: "Đang giao",
  },
  {
    type: "completed",
    name: "Đã giao",
  },
  {
    type: "cancelled",
    name: "Đã hủy",
  },
  {
    type: "returnlist",
    name: "Trả hàng/Hoàn tiền",
  },
  {
    type: "failed_delivery",
    name: "Giao không thành công",
  },
];
