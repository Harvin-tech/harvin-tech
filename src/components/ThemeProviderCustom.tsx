"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <GlobalStyle /> */}
      <NextThemesProvider
        attribute="class"
        enableColorScheme
        defaultTheme="light"
        themes={["light", "dark"]}
      >
        {children}
      </NextThemesProvider>
    </>
  );
};

export default ThemeProviderCustom;
