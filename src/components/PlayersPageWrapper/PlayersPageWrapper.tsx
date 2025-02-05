"use client";

import React from "react";
import { PageProvider } from "@/context/PageContext";

export default function PlayersPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageProvider isPlayersPage={true}>{children}</PageProvider>;
}
