import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import Meters from "@/public/image0.png";
import Flywheel from "@/public/flywheel.jpg";
import Hardware from "@/public/hardware.png";
import Payment from "@/public/payment.avif";
import Onchain from "@/public/onchain.jpeg";
import Design from "@/public/design.png";

function M3teringSlideshow() {
  return (
    <div className="w-full h-full bg-white">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide className="w-full bg-white py-8">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6">
            <div className="text-xl md:text-2xl text-neutral-800 space-y-6 text-center mb-8">
              <p>
                M3ters are blockchain-enabled smart meters that securely record
                energy usage in real time. They form the backbone of a
                decentralized infrastructure protocol known as the M3tering
                Protocol.
              </p>
              <Link
                href="https://m3tering.whynotswitch.com/"
                className="text-blue-600 hover:text-blue-800 font-medium underline inline-block"
              >
                Learn More
              </Link>
            </div>
            <div className="relative w-full max-w-lg">
              <Image
                src={Meters}
                alt="M3ters NFT"
                width={500}
                height={500}
                className="mx-auto object-contain shadow-lg rounded-lg"
                priority
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="w-full bg-white py-8">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6">
            <div className="text-xl md:text-2xl text-neutral-800 space-y-6 text-center mb-8">
              <p>
                The m3tering protocol unifies smart metering, on-hain
                tokenization, and digital payments. It paves the way for a
                resilient, and transparent, and user-empowered energy network.
              </p>
              <Link
                href="https://m3tering.whynotswitch.com/token-economics/m3ter-nfts"
                className="text-blue-600 hover:text-blue-800 font-medium underline inline-block"
              >
                Explore more
              </Link>
            </div>
            <div className="relative w-full max-w-lg">
              <Image
                src={Flywheel}
                alt="Flywheel Effect Diagram"
                width={500}
                height={500}
                className="mx-auto object-contain shadow-lg rounded-lg"
                priority
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="w-full bg-white py-8">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6">
            <div className="text-xl md:text-2xl text-neutral-800 space-y-6 text-center mb-8">
              <p>
                Our hardware devices capture precise, real-time energy data for
                accurate billing. They bridge traditional energy metering with
                digital, on-chain capabilities.
              </p>
              <Link
                href="https://m3tering.whynotswitch.com/token-economics/m3ter-nfts"
                className="text-blue-600 hover:text-blue-800 font-medium underline inline-block"
              >
                Further reading
              </Link>
            </div>
            <div className="relative w-full max-w-lg">
              <Image
                src={Hardware}
                alt="M3ter hardware"
                width={400}
                height={400}
                className="mx-auto object-contain shadow-lg rounded-lg w-auto h-auto"
                priority
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="w-full bg-white py-8">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6">
            <div className="text-xl md:text-2xl text-neutral-800 space-y-6 text-center mb-8">
              <p>
                Each m3ter has a unique ID used to initiate fast, transparent
                payments with stablecoins. This streamlined process ensures
                seamless transactions with energy providers.
              </p>
              <Link
                href="https://m3tering.whynotswitch.com/token-economics/m3ter-nfts"
                className="text-blue-600 hover:text-blue-800 font-medium underline inline-block"
              >
                Payment guide
              </Link>
            </div>
            <div className="relative w-full max-w-lg">
              <Image
                src={Payment}
                alt="Payment system"
                width={500}
                height={500}
                className="mx-auto object-contain shadow-lg rounded-lg"
                priority
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full bg-white py-12">
          <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-800 mb-6">
              Advanced Hardware Design
            </h2>
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full max-w-5xl mb-6">
                <Image
                  src={Design}
                  alt="M3ters Hardware Design"
                  width={1200}
                  height={900}
                  className="mx-auto object-contain shadow-lg rounded-lg"
                  priority
                  quality={100}
                />
              </div>
              <p className="text-neutral-700 text-center text-xl max-w-3xl mt-4">
                Precision-engineered hardware components with modular
                architecture and enhanced reliability
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Second Slide */}
        <SwiperSlide className="w-full bg-white py-12">
          <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-800 mb-8">
              Decentralized Onchain Flow
            </h2>
            <div className="flex flex-col items-center w-full">
              <div className="relative w-full max-w-3xl mb-6">
                <Image
                  src={Onchain}
                  alt="M3ters Onchain Flow"
                  width={600}
                  height={500}
                  className="mx-auto object-contain shadow-lg rounded-lg"
                  priority
                />
              </div>
              <p className="text-neutral-700 text-center text-xl max-w-2xl mt-4">
                Secure blockchain verification ensures tamper-proof energy data
                recording with distributed validation
              </p>
              <div className="flex gap-3 mt-8">
                <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default M3teringSlideshow;
