import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { WagmiProvider } from "wagmi";
import { config } from "./config/wagmi.ts";
import { Lightbulb } from "lucide-react";
import { direction, step, tokenId } from "./signals/store.ts";
import { Toaster } from "@/components/ui/sonner";
// @ts-expect-error: No type declaration for the module
import { M3terHead } from "m3ters";
import { useSignals } from "@preact/signals-react/runtime";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  useSignals();
  const previousInterface = () => {
    direction.value = -1;
    step.value--;
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <header className="w-full h-[50px] flex justify-between items-center fixed top-0 left-0 bg-transparent p-4 z-10">
          <div className="flex items-center space-x-1">
            <Lightbulb className="text-yellow-500 md:w-6 md:h-6 w-5 h-5" />
            <div className={`w-fit flex items-center space-x-1.5`}>
              <span
                className={`lg:text-2xl md:text-2xl text-[16px] font-bold text-white`}
              >
                Watt-A-Frame
              </span>
              <Badge variant={"destructive"}>beta</Badge>
            </div>
          </div>
          {/* Clickable Avatar */}
          {tokenId && step.value > 0 && (
            <button
              onClick={previousInterface}
              className="transition-all duration-500 ease-in-out hover:scale-110"
            >
              <M3terHead seed={tokenId} size={60} />
            </button>
          )}
        </header>
        {children}
        <Toaster />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);
