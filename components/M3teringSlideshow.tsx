import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Meters from "@/public/image0.png";
import Flywheel from "@/public/flywheel.jpg";
import Hardware from "@/public/hardware.png";
import Payment from "@/public/payment.png";
// import Onchain from "@/public/onchain.jpeg";
// import Design from "@/public/design.png";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type SlidesStruct = {
  title: string;
  description: string;

  more: {
    url: string;
    linkText: string;
  };
  image: {
    imageData: StaticImageData;
    alt: string;
  };
};
const slidesData: SlidesStruct[] = [
  {
    title: "What are M3ters?",
    description: `M3ters are blockchain-enabled smart meters that securely
                  record energy usage in real time. They form the backbone of a
                  decentralized infrastructure protocol known as the M3tering
                  Protocol.`,

    more: {
      url: "https://m3tering.whynotswitch.com/",
      linkText: "Learn more",
    },
    image: {
      imageData: Meters,
      alt: "M3ters NFT",
    },
  },
  {
    title: "What is the M3tering Protocol?",
    description: `The m3tering protocol unifies smart metering, on-hain
                  tokenization, and digital payments. It paves the way for a
                  resilient, and transparent, and user-empowered energy network.`,
    more: {
      url: "https://m3tering.whynotswitch.com/token-economics/m3ter-nfts",
      linkText: "Expore more",
    },
    image: {
      imageData: Flywheel,
      alt: "Flywheel effect",
    },
  },
  {
    title: "Our hardware",
    description: `Our hardware devices capture precise, real-time energy data
                  for accurate billing. They bridge traditional energy metering
                  with digital, on-chain capabilities.`,
    more: {
      url: "https://m3tering.whynotswitch.com/token-economics/m3ter-nfts",
      linkText: "Further reading",
    },
    image: {
      imageData: Hardware,
      alt: "Maxwell v1 in operation",
    },
  },
  {
    title: "Billing",
    description: `Each m3ter has a unique ID used to initiate fast, transparent
                  payments with stablecoins. This streamlined process ensures
                  seamless transactions with energy providers.`,
    more: {
      url: "https://m3tering.whynotswitch.com/",
      linkText: "Payment guide",
    },
    image: {
      imageData: Payment,
      alt: "Ecosystem diagram",
    },
  },
];
function M3teringSlideshow() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[80%] h-[80%] rounded-lg">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          // autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper w-full h-[100%] rounded-lg"
        >
          {slidesData.map((slide, i) => (
            <SwiperSlide
              className={`!flex justify-center items-center`}
              key={i}
            >
              <Card className={`w-[400px]`}>
                <CardHeader>
                  <CardTitle>{slide.title}</CardTitle>
                </CardHeader>
                <CardContent className={`space-y-2 block`}>
                  <div
                    className={`lg:w-[350px] lg:h-[350px] w-[300px] h-[300px] mx-auto block relative object-contain`}
                  >
                    <Image
                      src={slide.image.imageData}
                      alt={slide.image.alt}
                      fill
                      className="shadow-lg"
                      priority
                    />
                  </div>
                  <p className={`text-[15px]`}>{slide.description}</p>
                  <Link
                    href={slide.more.url}
                    className="text-blue-600 hover:text-blue-800 font-medium underline inline-block mx-auto"
                  >
                    {slide.more.linkText}
                  </Link>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default M3teringSlideshow;
