import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { AnimatePresence } from "motion/react";
import { useSignals } from "@preact/signals-react/runtime";
import { direction, step } from "./signals/store";
import { InterfaceOne, InterfaceTwo } from "@/components/Interfaces";

const App = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useSignals(); // Needed to re-render on signal change

  const nextInterface = () => {
    direction.value = 1;
    step.value++;
  };

  useEffect(() => {
    (async () => {
      if (sdk && !isSDKLoaded) {
        setIsSDKLoaded(true);
        await sdk.actions.ready();
      }
    })();
  }, []);

  if (!isSDKLoaded) {
    return (
      <div className="w-full h-[calc(100vh-40px)] flex justify-center items-center text-white text-[17px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-40px)] flex justify-center items-center relative">
      <AnimatePresence mode="wait" initial={false} custom={direction.value}>
        {step.value === 0 && <InterfaceOne key="step-1" next={nextInterface} />}
        {step.value === 1 && <InterfaceTwo key="step-2" />}
      </AnimatePresence>
    </div>
  );
};

export default App;
