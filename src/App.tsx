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

  const frame = {
    version: "next",
    imageUrl: `https://watt-a-frame.vercel.app/watt-a-frame.webp`,
    button: {
      title: "Launch Frame",
      action: {
        type: "launch_frame",
        name: "Watt-A-Frame",
        url: "https://watt-a-frame.vercel.app",
        splashImageUrl: `https://watt-a-frame.vercel.app/lightbulb.png`,
        splashBackgroundColor: "#f7f7f7",
      },
    },
  };

  if (!isSDKLoaded) {
    return (
      <div className="w-full h-full flex justify-center items-center text-white text-[17px]">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <meta name="fc:miniapp" content={JSON.stringify(frame)} />
      <AnimatePresence
        mode="popLayout"
        initial={false}
        custom={direction.value}
      >
        {step.value === 0 && <InterfaceOne key="step-1" next={nextInterface} />}
        {step.value === 1 && <InterfaceTwo key="step-2" />}
      </AnimatePresence>
    </div>
  );
};

export default App;
