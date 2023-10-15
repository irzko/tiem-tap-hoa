import NavTabOrder from "@/components/dashboard/order/nav-tab-order";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavTabOrder />

      <div>{children}</div>
    </div>
  );
}
