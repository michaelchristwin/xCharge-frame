import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { frameConnector } from "@/lib/connector";
import abi from "@/ABIs/abi.json";

export const config = createConfig({
  chains: [baseSepolia, mainnet],
  transports: {
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
  },
  connectors: [frameConnector()],
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export const contractConfig = {
  address: "0x16008fD81f1FFf5B5Fb52A279778d187d69276fd",
  abi: abi,
} as const;

export const contextContractConfig = {
  address: "",
  chainId: 1,
} as const;
