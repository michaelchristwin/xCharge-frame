import sdk from "@farcaster/frame-sdk";
import { FormEvent, useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { formatUnits, parseEther } from "viem";
//@ts-ignore
import { M3terHead, m3terAlias } from "m3ters";
import { contractConfig } from "./providers/WagmiProvider";

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [formState, setFormState] = useState({
    amount: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { data: hash, writeContract } = useWriteContract();

  const { data: tarrif } = useReadContract({
    ...contractConfig,
    functionName: "tariffOf",
    args: [BigInt(formState.id)],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      writeContract({
        ...contractConfig,
        functionName: "pay",
        value: parseEther(formState.amount),
        args: [BigInt(formState.id)],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      // setFormState({
      //   tokenId: "",
      //   amount: 0,
      // });
    }
  };

  const handleKeyDown = (e: any) => {
    if (
      !/[0-9.]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight"
    ) {
      e.preventDefault();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const { isLoading: _isConfirming, isSuccess: isConfirmed } =
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
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/gnosis3.png')",
      }}
      className={`min-h-screen bg-contain bg-center bg-[#121212] bg-no-repeat flex items-center justify-center p-4`}
    >
      <Card className="w-full max-w-md border border-green-500/20 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
        <CardHeader className="space-y-1 border-b border-green-500/20">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-white">
            <img
              src="https://docs.gnosischain.com/img/tokens/xdai.png"
              alt="xDAI logo"
              className={`w-[25px] h-[25px]`}
            />
            Charge
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`w-full flex flex-col h-fit items-center`}>
              {formState.id ? (
                <>
                  <M3terHead seed={formState.id} size={100} />
                  <p className="text-[13px] font-bold text-green-400 gap-2">
                    {m3terAlias(formState.id)}
                  </p>
                </>
              ) : (
                <>
                  <Skeleton
                    className={`bg-gray-900 w-[100px] h-[100px] rounded-[10px]`}
                  />
                </>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="text"
                  name="id"
                  inputMode={`numeric`}
                  onKeyDown={handleKeyDown}
                  placeholder="M3ter ID"
                  value={formState.id}
                  onChange={handleChange}
                  className="h-[50px] bg-gray-800 border-green-500/20 text-[17px] placeholder:text-[15px] text-white placeholder:text-gray-500 pl-[60px]"
                />
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  🆔
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  name="amount"
                  type="text"
                  inputMode={`decimal`}
                  placeholder="Amount"
                  value={formState.amount}
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                  className="h-[50px] bg-gray-800 border-green-500/20 text-white placeholder:text-gray-500 pl-16 focus:outline-none"
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 font-mono">
                  <img
                    src="https://docs.gnosischain.com/img/tokens/xdai.png"
                    alt="xDAI logo"
                    className={`w-[25px] h-[25px]`}
                  />
                </span>
              </div>
            </div>
            <div className="rounded-lg bg-green-500/10 p-3 border border-green-500/20">
              <div className="text-xs text-gray-400 flex items-center justify-between">
                <span>Gets you:</span>
                <span className="font-mono">
                  {(tarrif as string) &&
                    formState.amount &&
                    `${
                      Math.floor(
                        (Number(formState.amount) /
                          Number(formatUnits(BigInt(tarrif as string), 18))) *
                          100
                      ) / 100
                    } kWh⚡`}
                </span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-green-600 hover:bg-green-700 transition-all duration-200"
              disabled={isLoading || !formState.id || !formState.amount}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Confirming Transaction...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Pay
                  <SendHorizontal className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-xs text-gray-500 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <img
              src={"/built-on-ethereum2.png"}
              className={`h-[50px] w-[160px]`}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
