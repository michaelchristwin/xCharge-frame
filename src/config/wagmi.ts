import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { farcasterMiniApp as miniAppConnector } from "@farcaster/miniapp-wagmi-connector";
import abi from "../ABI/abi.json";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [miniAppConnector()],
});

export const contractConfig = {
  address: "0x16008fD81f1FFf5B5Fb52A279778d187d69276fd",
  abi: abi,
} as const;

export const contextContractConfig = {
  address: "",
  chainId: 1,
} as const;
