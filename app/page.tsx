"use client";

import dynamic from "next/dynamic";
import Head from "next/head";

const PaymentForm = dynamic(() => import("@/components/PaymentForm"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="fc:frame"
          content={`{
            "version": "next",
            "imageUrl": "https://watt-a-frame.vercel.app/watt-a-frame.webp",
            "button": {
              "title": "Launch Frame",
              "action": {
                "type": "launch_frame",
                "name": "Watt-A-Frame",
                "url": "https://watt-a-frame.vercel.app",
                "splashImageUrl": "https://watt-a-frame.vercel.app/lightbulb.png",
                "splashBackgroundColor": "#ffffff"
              }
            }
          }`}
        />
      </Head>
      <main className="min-h-screen flex flex-col">
        <PaymentForm />
      </main>
    </>
  );
}
