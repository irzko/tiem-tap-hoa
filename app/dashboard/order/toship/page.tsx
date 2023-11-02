import ButtonConfirm from "@/components/dashboard/order/toship/button-confirm";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const getToShipOrder = async () => {
  return await fetch(`${process.env.API_URL}/api/orders/toship`, {
    next: {
      tags: ["order"],
    },
  }).then((res) => res.json());
};

export default async function Page() {
  const orders: IOrder[] = await getToShipOrder();
  return (
    <Card className="max-w-screen-2xl mx-auto">
      <CardHeader>Đơn hàng chờ xác nhận</CardHeader>
      <Divider />
      <CardBody className="divide-y">
        {orders.length > 0 ? (
          orders.map((order) => {
            return (
              <div
                key={order.orderId}
                className="px-6 py-3 w-full text-sm text-left text-gray-500 dark:text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-2 dark:border-gray-700"
              >
                <div className="flex flex-col">
                  {order.orderDetails.map((orderDetail) => {
                    return (
                      <p
                        key={orderDetail.orderDetailId}
                        className="line-clamp-2"
                      >
                        {orderDetail.product.productName}
                      </p>
                    );
                  })}
                </div>
                <div className="md:col-span-3 grid md:grid-cols-3 w-full">
                  <p>{order.totalAmount.toLocaleString("vi-VN")}</p>
                  <p>{order.orderStatus.status}</p>
                  <ButtonConfirm orderId={order.orderId} />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Không có đơn hàng chờ xác nhận
          </p>
        )}
      </CardBody>
    </Card>
  );
}
