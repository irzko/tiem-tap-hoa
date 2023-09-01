// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
// import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import clsx from "clsx";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Tiệm bách hoá";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, "bg-white dark:bg-gray-900")}>
        <Toaster />
        <Suspense fallback="Loading...">{/* <AuthStatus /> */}</Suspense>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
