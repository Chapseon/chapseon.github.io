/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import { MonitorIcon } from "lucide-react";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

// 오른쪽으로 갈수록 선명해지는 배경
const fade = "linear-gradient(to right, transparent 0%, rgba(0,0,0,.5) 30%, black 65%)";

export default function GamesSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">자주 하는 게임</h2>
        <div className="h-0.5 w-8 rounded-full bg-indigo-500" />
      </div>
      <div className="flex flex-col gap-4">
        {DATA.games.map((game) => {
          const image: string = game.image;
          return (
            <div
              key={game.name}
              className="group relative min-h-[120px] overflow-hidden rounded-xl border border-border bg-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* 오른쪽 대표 이미지 */}
              <div
                className="absolute inset-y-0 right-0 w-[70%] opacity-80 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-60 dark:group-hover:opacity-80"
                style={{ maskImage: fade, WebkitMaskImage: fade }}
              >
                {image ? (
                  <img
                    src={base + image}
                    alt=""
                    className="h-full w-full object-cover object-right transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundColor: game.color,
                      backgroundImage: [
                        "radial-gradient(circle at 80% 30%, rgba(255,255,255,.35), transparent 40%)",
                        "radial-gradient(circle at 55% 110%, rgba(0,0,0,.35), transparent 45%)",
                        "repeating-linear-gradient(115deg, rgba(255,255,255,.08) 0 14px, transparent 14px 28px)",
                      ].join(","),
                    }}
                  />
                )}
              </div>
              {/* 글자 쪽을 덮는 막 */}
              <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 via-55% sm:via-background/80 sm:via-40% to-transparent" />
              <div className="relative flex h-full min-h-[120px] flex-col justify-center gap-2 px-6 py-4 max-w-[70%]">
                <span className="text-lg font-bold leading-none">{game.name}</span>
                <div className="border-l-2 pl-3" style={{ borderColor: game.color }}>
                  <p className="text-sm font-medium leading-snug break-keep">“{game.quote}”</p>
                  {game.by ? <p className="text-xs text-muted-foreground mt-0.5">{game.by}</p> : null}
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-border px-6 py-4 text-muted-foreground">
          <MonitorIcon className="size-5" aria-hidden />
          <span>{DATA.gamesMore}</span>
        </div>
      </div>
    </div>
  );
}
