"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "@/app/layout.module.scss";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPlayersPage = pathname === "/players";
  const isSinglePlayerPage = pathname.startsWith("/players/") && !isPlayersPage;
  return (
    <body
      className={`${styles.pageBody} globalBodyClass ${isPlayersPage ? styles.playersPageBody : ""}
        ${isSinglePlayerPage ? styles.singlePlayerPageBody : ""}`}
    >
      {children}
    </body>
  );
}
