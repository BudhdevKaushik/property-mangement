"use client";
import React from "react";
import "./globals.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import QueryProvider from "@/utils/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Provider store={store()}>
          <QueryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
