import { useAppContext } from "@/components/providers/AppContextProvider";
import { CircleHelp } from "lucide-react";
function Footer() {
  const { setSlideOpen } = useAppContext();
  const openSlideshow = () => {
    setSlideOpen(true);
    // Optional: prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
  };
  return (
    <footer className={`w-full`}>
      <p
        className={`text-neutral-600 text-center fixed bottom-0 right-0 w-full underline hover:cursor-pointer flex items-center space-x-1 justify-center`}
        onClick={openSlideshow}
      >
        <span> not sure what this is</span>
        <CircleHelp className="w-4 h-4" />
      </p>
    </footer>
  );
}

export default Footer;
