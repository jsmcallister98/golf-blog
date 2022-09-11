// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { GlobalStyles } from "@styles/index";
import { TGlobalThemeObject } from "types";
import NavBar from "@components/NavBar";

type TThemeObjectInitial = Pick<TGlobalThemeObject, "theme">;
const initTheme = {
  theme: undefined,
};

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [themeObject, setThemeObject] =
    useState<TThemeObjectInitial>(initTheme);

  function getCSSVarValue(variable: string) {
    if (typeof window !== "undefined")
      return getComputedStyle(document.body).getPropertyValue(variable);
    return undefined;
  }
  const changeThemeVariant: TGlobalThemeObject["changeThemeVariant"] = (
    theme
  ) => {
    setThemeObject({ theme });
  };
  const themeForContext: TGlobalThemeObject = {
    ...themeObject,
    getCSSVarValue,
    changeThemeVariant,
  };

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={themeForContext}>
        <GlobalStyles />
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return ""; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      // url,
      links,
      transformer: superjson,
      /**
       * headers enables access to cookies
       */
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr:": "1",
          };
        }
        return {};
      },
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
