import * as React from "react";
import type { ReactElement, ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../components/sys/Theme";
import Fonts from "../components/sys/Fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AuthSessionProvider } from "../components/sys/providers/SessionProvider";
import ProtectedRoute from "../components/sys/providers/ProtectedRouteProvider";
import { BottomMenu } from "../components/sys/bottomMenu";
import { initializeGoogleTagManager } from "../components/sys/GoogleTagManager";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  React.useEffect(() => {
    initializeGoogleTagManager("GTM-TWTZP4P3");
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <AuthSessionProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Fonts />
            <ProtectedRoute router={router}>
              {getLayout ? (
                getLayout(<Component {...pageProps} />)
              ) : (
                <Component {...pageProps} fontFamily="Source Sans Pro" />
              )}
            </ProtectedRoute>
          </ChakraProvider>
        </QueryClientProvider>
      </AuthSessionProvider>
    </>
  );
}

export default MyApp;
