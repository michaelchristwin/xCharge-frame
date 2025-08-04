import { motion, usePresenceData } from "motion/react";
import {
  useAccount,
  useConnect,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
// @ts-expect-error: No type declaration for the module
import { M3terHead, m3terAlias } from "m3ters";
import { tokenId } from "@/signals/store";
import { ChevronRight, Loader, SendHorizonal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PRESET_AMOUNTS, ENERGY_PRICE_PER_KWH } from "@/constants";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { encodeFunctionData } from "viem";
import { contractConfig } from "@/config/wagmi";
import { toast } from "sonner";
import { useSignals } from "@preact/signals-react/runtime";

export const InterfaceOne = ({ next }: { next: () => void }) => {
  const direction = usePresenceData();
  const { isConnected } = useAccount();
  useSignals();
  const { connect, connectors } = useConnect();

  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.1,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.4,
          stiffness: 200,
          damping: 25,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="backdrop-filter backdrop-blur-lg bg-opacity-10 bg-white/20 rounded-2xl p-6 shadow-lg lg:w-[400px] md:w-[350px] w-[300px] h-[320px] flex flex-col justify-around items-center"
    >
      <div className="w-full flex flex-col items-center justify-between h-[113px]">
        {tokenId.value ? (
          <>
            <M3terHead seed={tokenId} size={100} />
            <p className="text-[13px] font-bold text-white">
              {m3terAlias(tokenId)}
            </p>
          </>
        ) : (
          <Skeleton className="bg-white/20 w-[114px] h-[114px] rounded-full" />
        )}
      </div>
      <input
        type="text"
        inputMode="numeric"
        value={tokenId.value}
        onInput={(e) => (tokenId.value = e.currentTarget.value)}
        disabled={!isConnected}
        placeholder="Enter M3ter ID"
        className="w-full text-lg text-white bg-transparent placeholder:text-muted placeholder:italic border-b border-purple-300 focus:border-purple-600 outline-none px-0 py-2 mb-4 disabled:cursor-not-allowed"
      />

      {!isConnected ? (
        <button
          type="button"
          className="inline-flex items-center w-full justify-center h-[40px] rounded-lg text-white bg-[#9b6dff] hover:bg-[#8559f2] disabled:hover:bg-[#9b6dff] disabled:opacity-70 disabled:cursor-not-allowed font-bold"
          onClick={() => {
            connect({ connector: connectors[0] });
            // next();
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={next}
          disabled={!tokenId.value}
          className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-[#9b6dff] hover:bg-[#8559f2] disabled:hover:bg-[#9b6dff] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
};

export const InterfaceTwo = () => {
  const direction = usePresenceData();
  const [selected, setSelected] = useState<number[]>([]);
  const [custom, setCustom] = useState("");
  const [customToggle, setCustomToggle] = useState(false);
  const [amoutInput, setAmountInput] = useState("0");
  const kwh =
    (custom ? parseFloat(customToggle ? amoutInput : custom) : 0) /
    ENERGY_PRICE_PER_KWH;
  const { data: hash, sendTransaction } = useSendTransaction();

  const handleAmountToggle = (amount: number) => {
    if (customToggle) return;
    setSelected((prev) =>
      prev.includes(amount)
        ? prev.filter((a) => a !== amount)
        : [...prev, amount]
    );
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
      setCustom(val);
    }
  };

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(e.target.value);
  };

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const data = encodeFunctionData({
        abi: contractConfig.abi,
        functionName: "pay",
        args: [
          BigInt(tokenId.value),
          BigInt(customToggle ? amoutInput : custom),
        ],
      });

      sendTransaction({
        to: contractConfig.address,
        data: data,
      });
    },
    [sendTransaction, tokenId, custom, customToggle, amoutInput]
  );

  useEffect(() => {
    const b = selected.reduce((sum, amount) => sum + amount, 0);
    setCustom(String(b));
  }, [selected]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    let TO: NodeJS.Timeout;
    if (isConfirmed) {
      toast.success("Transaction Successful");
      TO = setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
    return () => {
      clearTimeout(TO);
    };
  }, [isConfirmed]);

  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.1,
          type: "spring",
          visualDuration: 0.3,
          bounce: 0.4,
          stiffness: 200,
          damping: 25,
        },
      }}
      exit={{ opacity: 0, x: direction * -50 }}
      className="backdrop-filter backdrop-blur-lg bg-opacity-10 bg-white/20 rounded-2xl p-6 shadow-lg lg:w-[400px] md:w-[350px] w-[300px] h-[320px] flex flex-col justify-around"
    >
      <div className="grid grid-cols-4 gap-3 mb-4">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => handleAmountToggle(amt)}
            className={`p-2 text-center rounded-lg transition-all ${
              selected.includes(amt) && !customToggle
                ? "bg-purple-200/80 text-purple-800"
                : "bg-white/70 hover:bg-white/90"
            }`}
          >
            ${amt}
          </button>
        ))}
      </div>
      <div className="w-full flex items-center justify-end">
        <div className="space-x-2 flex items-center">
          <Switch
            checked={customToggle}
            onCheckedChange={() => setCustomToggle(!customToggle)}
          />
          <p className="text-white text-[13px]">Custom input</p>
        </div>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          value={!customToggle ? custom : amoutInput}
          inputMode="decimal"
          onChange={!customToggle ? handleCustomChange : handleAmountInput}
          placeholder="Enter amount"
          disabled={!customToggle}
          className="w-full text-lg text-white bg-transparent placeholder:italic placeholder:text-gray-400 outline-none px-0 py-2"
        />
        {Number(customToggle ? amoutInput : custom) > 0 && (
          <span className="text-sm text-white pt-2 absolute bottom-[50%] translate-y-[50%] right-0">
            {kwh.toFixed(2)} kWh⚡
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isConfirming || !kwh}
        className="w-full py-3 rounded-lg text-white bg-[#9b6dff] hover:bg-[#8559f2] disabled:hover:bg-[#9b6dff] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isConfirming ? (
          <Loader className="animate-spin h-4 w-4" />
        ) : (
          <>
            <span>Pay</span>
            <SendHorizonal className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.div>
  );
};
