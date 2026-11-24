"use client";
import { useState } from "react";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DiscordIcon } from "@/components/ui/svgs/brand";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const discord: string = DATA.discord;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(discord);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 복사가 막힌 환경이면 그냥 무시 */
    }
  };

  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl break-keep">
          같이 게임해요
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance break-keep">
          위에 있는 게임 중에 같이 할 게임이 있으면 편하게 디스코드로 연락 주세요.
        </p>
        {discord ? (
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-xl border bg-background px-5 h-11 font-medium hover:bg-muted transition-colors cursor-pointer"
          >
            <DiscordIcon className="size-5" />
            <span>{discord}</span>
            <span className="text-xs text-muted-foreground">{copied ? "복사됨" : "클릭해서 복사"}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
