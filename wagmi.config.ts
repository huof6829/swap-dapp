import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createConfig, http, type Config } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

/**
 * 总开关：仅当值为字符串 "true" 时，才注册钱包连接器（含浏览器钱包 + WalletConnect 等 RainbowKit 默认集）。
 * 非 "true"：connectors 为空，不会拉起 MetaMask / injected / WalletConnect。
 * 开启后请在 .env 配置 NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID，并在 Reown 配置 Allowlist。
 */
export const walletsInteractionEnabled =
  process.env.NEXT_PUBLIC_ENABLE_WALLETCONNECT === "true";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim() ?? "";

export const config: Config = walletsInteractionEnabled
  ? getDefaultConfig({
      appName: "CoinPlate",
      projectId: projectId || "00000000000000000000000000000000",
      chains: [mainnet, sepolia],
      ssr: true,
    })
  : createConfig({
      chains: [mainnet, sepolia],
      connectors: [],
      transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
      },
      ssr: true,
    });
