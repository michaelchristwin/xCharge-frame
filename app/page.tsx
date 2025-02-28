"use client";

import dynamic from "next/dynamic";

const PaymentForm = dynamic(() => import("@/components/PaymentForm"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <PaymentForm />
    </main>
  );
}
