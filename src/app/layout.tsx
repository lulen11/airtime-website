import React, { useState, useEffect } from "react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";
import styles from "./layout.module.scss";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClass = "globalBodyClass";

  return (
    <>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon@2x.ico" />
          <link rel="stylesheet" href="https://use.typekit.net/uzq0asd.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,500;1,500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={`${styles.pageBody} ${bodyClass}`}>
          <Header />
          <LoadingWrapper>{children}</LoadingWrapper>
          <PrismicPreview repositoryName={repositoryName} />
        </body>
      </html>
    </>
  );
}
