"use client";

import { Metadata } from "next";
import dynamic from "next/dynamic";

const PaymentForm = dynamic(() => import("@/components/PaymentForm"), {
  ssr: false,
});
const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `https://watt-a-frame.vercel.app/watt-a-frame.webp`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "Watt-A-Frame",
      url: appUrl,
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
  return (
    <main className="min-h-screen flex flex-col">
      <PaymentForm />
    </main>
  );
}
