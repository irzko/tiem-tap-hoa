import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/providers/NextAuthProvider";

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
    <html lang="vi">
      <body className={`${inter.variable} bg-white dark:bg-gray-900`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
