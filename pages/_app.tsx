import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GlobalState } from "utils/state";

interface MyAppProps extends AppProps {
  clashData: any[];
  setClashData: Dispatch<SetStateAction<any[]>>;
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          breakpoints: {
            xs: 500,
            sm: 796,
            md: 1015,
            lg: 1200,
            xl: 1400,
          },
        }}
      >
        <GlobalState>
          <Component {...pageProps} />
        </GlobalState>
      </MantineProvider>
    </>
  );
}

export default MyApp;
