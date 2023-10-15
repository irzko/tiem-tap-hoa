import ButtonConfirm from "@/components/dashboard/order/unpaid/button-confirm";
import Button from "@/components/ui/button";

const getUnpaidOrder = async () => {
  return await fetch(`${process.env.BASE_URL}/api/orders/unpaid`, {
    cache: "no-store",
  }).then((res) => res.json());
};

export default async function Page() {
  const orders: IOrder[] = await getUnpaidOrder();
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="divide-y">
        {orders.map((order) => {
          return (
            <div
              key={order.orderId}
              className="bg-white px-6 py-3 items-center w-full text-sm text-left text-gray-500 dark:text-gray-400 grid md:grid-cols-4 gap-2 dark:bg-gray-800 dark:border-gray-700"
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
              <p>{order.totalAmount.toLocaleString("vi-VN")}</p>
              <p>{order.orderStatus.status}</p>
              <div className="flex flex-wrap gap-2">
                {/* <ButtonConfirm orderId={order.orderId} /> */}
                <Button color="light" className="w-full">Hủy</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
