import { Lightbulb } from "lucide-react";
// @ts-expect-error: No type declaration for the module
import { M3terHead } from "m3ters";
import { useAppContext } from "./providers/AppContextProvider";

const Navbar = () => {
  const { avatarTransitioned, tokenId, setAvatarTransitioned, setStep } =
    useAppContext();
  const handlePreviousStep = () => {
    setStep(1);
    setAvatarTransitioned(false);
  };

  return (
    <nav className="w-full h-[60px] flex justify-between items-center fixed top-0 left-0 bg-transparent px-4">
      <div className="flex items-center space-x-1">
        <Lightbulb className="text-yellow-500" size={30} />
        <span className="lg:text-2xl md:text-2xl text-[20px] font-bold text-white">
          Watt-A-Frame{" "}
          <span className="text-sm font-normal text-red-400">beta</span>
        </span>
      </div>
      {/* Clickable Avatar */}
      {tokenId && avatarTransitioned && (
        <button
          onClick={handlePreviousStep}
          className="transition-all duration-500 ease-in-out hover:scale-110"
        >
          <M3terHead seed={tokenId} size={40} />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
