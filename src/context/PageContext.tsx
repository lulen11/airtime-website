"use client";

import React, { createContext, useContext } from "react";

export const PageContext = createContext<{ isPlayersPage: boolean }>({
  isPlayersPage: false,
});

export function PageProvider({
  isPlayersPage,
  children,
}: {
  isPlayersPage: boolean;
  children: React.ReactNode;
}) {
  return (
    <PageContext.Provider value={{ isPlayersPage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
