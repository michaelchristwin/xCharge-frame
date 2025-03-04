import PaymentForm from "@/components/PaymentForm";
import { Metadata } from "next";

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

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Watt-A-Frame",
    openGraph: {
      title: "Watt-A-Frame",
      description: "A farcaster frames for recharging M3ters with USDC.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <PaymentForm />;
}
