import { orderStatus } from "@/components/dashboard/order/order-status";

const getAllOrder = async () => {
  return await fetch(`${process.env.API_URL}/api/orders`, {
    cache: "no-store",
  }).then((res) => res.json());
};

export default async function Page() {
  const orders: IOrder[] = await getAllOrder();
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="divide-y">
        {orders.map((order) => {
          return (
            <div
              key={order.orderId}
              className="px-6 py-3 w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-2 dark:border-gray-700"
            >
              <div className="flex flex-col">
                {order.orderDetails.map((orderDetail) => {
                  return (
                    <p key={orderDetail.orderDetailId} className="line-clamp-2">
                      {orderDetail.product.productName}
                    </p>
                  );
                })}
              </div>
              <div className="md:col-span-3 grid md:grid-cols-3 w-full">
                <p>{order.totalAmount.toLocaleString("vi-VN")}</p>
                <p>{order.orderStatus.status}</p>
                <p>Xác nhận</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
