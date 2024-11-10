import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Todo List",
  description: "Manage your daily tasks efficiently",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
