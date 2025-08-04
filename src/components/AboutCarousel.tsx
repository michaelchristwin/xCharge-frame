import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";
import { Card, CardContent } from "./ui/card";

type SlidesStruct = {
  title: string;
  description: string;

  more: {
    url: string;
    linkText: string;
  };
  image: {
    src: string;
    alt: string;
  };
};
const slidesData: SlidesStruct[] = [
  {
    title: "What are M3ters?",
    description: `M3ters are NFTs that tokenize real world energy infrastructure such as solar & small hydro power plants on the m3tering protocol. They are the backbone of our decentralised physical infrastructure network (DePIN).`,

    more: {
      url: "https://m3tering.whynotswitch.com/",
      linkText: "Learn more",
    },
    image: {
      src: "/nft.png",
      alt: "M3ters NFT",
    },
  },

  {
    title: "Our hardware",
    description: `They are bound onchain to smart energy meters that measure power consumption and facilitate decentralized settlements. Each M3ter has a unique ID, linking it to energy consumption data and payments.`,
    more: {
      url: "https://m3tering.whynotswitch.com/token-economics/m3ter-nfts",
      linkText: "Further reading",
    },
    image: {
      src: "m3ter.png",
      alt: "Maxwell v1 in operation",
    },
  },
  {
    title: "What is the M3tering Protocol?",
    description: `Users pay energy providers directly by sending stablecoins to an M3ter ID,
     which is mapped to the provider’s onchain wallet. Smart contracts automate billing and enforce payments based on verified consumption data.`,
    more: {
      url: "https://m3tering.whynotswitch.com/token-economics/m3ter-nfts",
      linkText: "Expore more",
    },
    image: {
      src: "/onchain.jpeg",
      alt: "Flywheel effect",
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
      src: "/payment.png",
      alt: "Ecosystem diagram",
    },
  },
];

function AboutCarousel({ children }: { children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="bg-transparent border-0"
        onCloseAutoFocus={() => setSelectedIndex(0)}
      >
        <DialogHeader className="hidden">
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>This is the description</DialogDescription>
        </DialogHeader>
        <div className="embla overflow-hidden w-full" ref={emblaRef}>
          <div className="embla__container flex">
            {slidesData.map((slide, i) => (
              <div className="embla__slide flex-[0_0_100%]" key={i}>
                <Card className="lg:w-[400px] md:w-[400px] w-[300px] lg:h-[380px] md:h-[380px] h-[320px] mx-auto">
                  <CardContent className="space-y-2 block">
                    <div className="w-full flex justify-center">
                      <div className="relative w-full max-w-[350px] aspect-[16/9] overflow-hidden">
                        <img
                          src={slide.image.src}
                          alt={slide.image.alt}
                          className="w-full h-full object-contain shadow-lg rounded-lg"
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="lg:text-[13px] md:text-[13px] text-[11px] mt-[20px]">
                        {slide.description}
                      </p>
                      <a
                        href={slide.more.url}
                        className="text-blue-600 hover:text-blue-800 lg:text-[13px] md:text-[13px] text-[11px] underline inline-block mx-auto"
                      >
                        {slide.more.linkText}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={scrollPrev}
            disabled={selectedIndex === 0}
            className="bg-[#9b6dff] text-white px-4 py-2 rounded hover:bg-[#8559f2] transition disabled:hover:bg-[#9b6dff] disabled:opacity-50 disabled:!cursor-not-allowed"
          >
            <ArrowLeft className={`w-4 h-4`} />
          </button>
          <button
            onClick={scrollNext}
            disabled={selectedIndex + 1 === slidesData.length}
            className="bg-[#9b6dff] text-white px-4 py-2 rounded hover:bg-[#8559f2] transition disabled:hover:bg-[#9b6dff] disabled:opacity-50 disabled:!cursor-not-allowed"
          >
            <ArrowRight className={`w-4 h-4`} />
          </button>
        </div>

        <div className="flex justify-center space-x-2 mt-4">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (emblaApi) {
                  emblaApi.scrollTo(index);
                  setSelectedIndex(index);
                }
              }}
              className={`
              w-3 h-3 rounded-full 
              ${index === selectedIndex ? "bg-[#8559f2]" : "bg-gray-300"}
            `}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AboutCarousel;
