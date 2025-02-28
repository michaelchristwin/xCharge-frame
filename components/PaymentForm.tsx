import { useState, useEffect, useCallback } from "react";
import { ChevronRight, Plus, Loader2, Send } from "lucide-react";
import { encodeFunctionData } from "viem";
import { contractConfig } from "./providers/WagmiProvider";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import sdk from "@farcaster/frame-sdk";

const ENERGY_PRICE_PER_KWH = 0.06;
const PRESET_AMOUNTS = [1, 2, 5, 10, 20, 50, 100];

const PaymentForm = () => {
  const [step, setStep] = useState(1);
  const [tokenId, setTokenId] = useState("");
  const [selectedAmounts, setSelectedAmounts] = useState<number[]>([]);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const { data: hash, sendTransaction } = useSendTransaction();
  const [avatarTransitioned, setAvatarTransitioned] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("lastTokenId");
    if (cached) {
      setTokenId(cached);
      setStep(2);
      setAvatarTransitioned(true);
    }
  }, []);

  useEffect(() => {
    if (tokenId) localStorage.setItem("lastTokenId", tokenId);
  }, [tokenId]);

  const totalAmount =
    selectedAmounts.reduce((sum, amount) => sum + amount, 0) +
    (customAmount ? parseFloat(customAmount) : 0);

  const kwhValue = totalAmount / ENERGY_PRICE_PER_KWH;

  const handleTokenIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setTokenId(value);
  };

  const handleNextStep = () => {
    setAvatarTransitioned(true);
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
    setAvatarTransitioned(false);
  };

  const handleAmountToggle = (amount: number) => {
    if (selectedAmounts.includes(amount)) {
      setSelectedAmounts(selectedAmounts.filter((a) => a !== amount));
    } else {
      setSelectedAmounts([...selectedAmounts, amount]);
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow decimals with up to 2 decimal places
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      //alert(`Submit clicked, tokenId:", ${tokenId}, "amount:", ${totalAmount}`);
      const data = encodeFunctionData({
        abi: contractConfig.abi,
        functionName: "pay",
        args: [BigInt(tokenId), BigInt(totalAmount)],
      });

      sendTransaction({
        to: contractConfig.address,
        data: data,
      });
    },
    [sendTransaction]
  );

  const { isLoading: isConfirming, isSuccess: _isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }
  // alert(`isConnected ${isConnected ? "True" : "False"}`);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-200 to-blue-500 p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Title */}
      <h1
        className="text-center text-5xl font-bold text-white mb-12 mt-16"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Pay with Base
      </h1>

      {/* Clickable Avatar */}
      {tokenId && avatarTransitioned && (
        <button
          onClick={handlePreviousStep}
          className="fixed top-8 right-8 transition-all duration-500 ease-in-out hover:scale-110"
        >
          <img
            src={`https://m3ters.ichristwin.com/api/m3ter-head/${tokenId}`}
            alt="M3ter"
            className="w-12 h-12 rounded-full ring-2 ring-white/50"
          />
        </button>
      )}

      <div className="max-w-xl mx-auto relative">
        {/* Avatar next to input */}
        {tokenId && !avatarTransitioned && (
          <div className="absolute -right-20 top-0 transition-all duration-500 ease-in-out">
            <img
              src={`https://m3ters.ichristwin.com/api/m3ter-head/${tokenId}`}
              alt="M3ter"
              className="w-16 h-16 rounded-full ring-2 ring-white/50"
            />
          </div>
        )}

        <div className="space-y-6">
          <div
            className={`transition-all duration-500 ${
              step === 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10 absolute"
            }`}
          >
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-lg">
              <input
                type="text"
                value={tokenId}
                onChange={handleTokenIdChange}
                placeholder="Enter M3ter ID"
                className="w-full text-lg bg-transparent border-b border-blue-300 focus:border-blue-600 outline-none px-0 py-2 mb-4"
              />
              <button
                onClick={handleNextStep}
                disabled={!tokenId}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className={`transition-all duration-500 ${
              step === 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 absolute"
            }`}
          >
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-4 gap-3 mb-4">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountToggle(amount)}
                    className={`p-4 text-center rounded-lg transition-all ${
                      selectedAmounts.includes(amount)
                        ? "bg-blue-200/80 text-blue-800"
                        : "bg-white/70 hover:bg-white/90"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
                <button
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="p-4 text-center rounded-lg bg-white/70 hover:bg-white/90"
                >
                  <Plus className="mx-auto h-6 w-6" />
                </button>
              </div>

              {showCustomInput && (
                <input
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  placeholder="Enter amount"
                  className="w-full text-lg bg-transparent border-b border-blue-300 focus:border-blue-600 outline-none px-0 py-2 mb-4"
                />
              )}

              {totalAmount > 0 && (
                <div className="text-sm text-gray-600 mb-4 border-t border-blue-200 pt-2">
                  <div className="flex justify-between">
                    <span>${totalAmount.toFixed(2)}</span>
                    <span>{kwhValue.toFixed(2)} kWh</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                type="button"
                disabled={isConfirming || totalAmount <= 0}
                className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isConfirming ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Pay
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
