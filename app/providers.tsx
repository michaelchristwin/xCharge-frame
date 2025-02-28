"use client";

import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/components/providers/AppContextProvider";
import dynamic from "next/dynamic";

const WagmiProvider = dynamic(
  () => import("@/components/providers/WagmiProvider"),
  {
    ssr: false,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <AppContextProvider>
        <Navbar />
        {children}
      </AppContextProvider>
    </WagmiProvider>
  );
}
