/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { PixelSky } from "@/components/pixel-sky";
import { ChevronDown } from "lucide-react";
import { DATA } from "@/data/resume";
import ContactSection from "@/components/section/contact-section";
import GamesSection from "@/components/section/games-section";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section
        id="hero"
        className="relative -mt-12 sm:-mt-24 ml-[calc(50%-50vw)] w-screen h-[100svh] min-h-[520px] overflow-hidden bg-[#0b0c24]"
      >
        {DATA.banner ? (
          <img
            src={(process.env.NEXT_PUBLIC_BASE_PATH || "") + DATA.banner}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <PixelSky className="absolute inset-0 h-full w-full" />
        )}
        <div className="absolute inset-0 bg-[#0b0c24]/25" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 text-center -translate-y-[6%]">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-4xl sm:text-7xl font-bold tracking-tight text-white break-keep drop-shadow-[0_4px_0_rgba(0,0,0,0.35)]"
            yOffset={8}
            text={DATA.heroTitle}
          />
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="h-0.5 w-20 rounded-full bg-indigo-400" />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-sm sm:text-base font-medium tracking-[0.2em] text-indigo-200">{DATA.heroSub}</p>
          </BlurFade>
        </div>
        <a
          href="#games"
          aria-label="아래로"
          className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown className="size-7" />
        </a>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-background" />
      </section>
      <section id="games">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <GamesSection />
        </BlurFade>
      </section>
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
