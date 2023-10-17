import OrderTabs from "@/components/dashboard/order/order-tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <OrderTabs baseURL="/user/purchase" />

      <div>{children}</div>
    </div>
  );
}
