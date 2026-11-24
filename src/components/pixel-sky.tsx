"use client";

import { useEffect, useRef } from "react";

/**
 * 코드로 그리는 픽셀아트 밤 풍경 (원본 그림).
 * 낮은 해상도 캔버스에 그린 뒤 CSS로 늘려서 픽셀 느낌을 냅니다.
 * 별 반짝임, 구름 흐름, 모닥불 일렁임, 물결이 천천히 움직입니다.
 */


// 시드 고정 난수
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// 1차원 값 노이즈로 산 능선 만들기
function ridge(width: number, seed: number, scale: number, oct = 4) {
  const r = rng(seed);
  const pts = Array.from({ length: Math.ceil(width / 8) + 4 }, () => r());
  const at = (x: number, step: number) => {
    const i = Math.floor(x / step);
    const t = (x % step) / step;
    const a = pts[i % pts.length];
    const b = pts[(i + 1) % pts.length];
    const u = t * t * (3 - 2 * t);
    return a + (b - a) * u;
  };
  const out: number[] = [];
  for (let x = 0; x < width; x++) {
    let v = 0;
    let amp = 1;
    let step = scale;
    let norm = 0;
    for (let o = 0; o < oct; o++) {
      v += at(x + o * 37, Math.max(2, step)) * amp;
      norm += amp;
      amp *= 0.5;
      step /= 2;
    }
    out.push(v / norm);
  }
  return out;
}

const SKY = ["#0b0c24", "#10123a", "#161947", "#1d2056", "#252866", "#2e3175"];

export function PixelSky({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 320;
    let H = 180;
    let k = 1; // 세로 길이 비율 (기준 180픽셀)
    let horizon = 133;
    let stars: { x: number; y: number; c: string; tw: number }[] = [];
    let far: number[] = [];
    let mid: number[] = [];
    let near: number[] = [];
    let clouds: { x: number; y: number; w: number; s: number }[] = [];
    let trees: { x: number; h: number }[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      // 픽셀 한 칸 크기: 휴대폰은 3px, 큰 화면은 세로 180칸 기준
      const P = rect.width < 640 ? 3 : Math.max(4, rect.height / 180);
      W = Math.max(60, Math.ceil(rect.width / P));
      H = Math.max(60, Math.ceil(rect.height / P));
      k = H / 180;
      horizon = Math.round(H * 0.74);
      canvas.width = W;
      canvas.height = H;
      const r = rng(7);
      stars = Array.from({ length: Math.round((W * H) / 260) }, () => ({
        x: Math.floor(r() * W),
        y: Math.floor(r() * horizon * 0.8),
        c: r() > 0.85 ? "#c9cbff" : "#ffffff",
        tw: r(),
      }));
      far = ridge(W, 11, 64, 5);
      mid = ridge(W, 23, 44, 4);
      near = ridge(W, 41, 30, 3);
      const rc = rng(99);
      clouds = Array.from({ length: Math.max(3, Math.round(W / 90)) }, () => ({
        x: rc() * W,
        y: (14 + rc() * 50) * k,
        w: 18 + rc() * 40,
        s: 0.02 + rc() * 0.04,
      }));
      const rt = rng(5);
      trees = [];
      for (let x = 2; x < W; x += 3 + Math.floor(rt() * 4)) {
        if (x > W * 0.34 && x < W * 0.62) continue; // 가운데는 비워 둠
        trees.push({ x, h: 4 + Math.floor(rt() * 6) });
      }
    };

    const px = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.round(x), Math.round(y), w, h);
    };

    const draw = (t: number) => {
      // 하늘: 띠 + 경계 디더링
      const band = Math.ceil(horizon / SKY.length);
      SKY.forEach((c, i) => px(0, i * band, W, band, c));
      for (let i = 1; i < SKY.length; i++) {
        const y0 = i * band - 2;
        ctx.fillStyle = SKY[i];
        for (let y = y0; y < y0 + 2; y++)
          for (let x = (y % 2); x < W; x += 2) ctx.fillRect(x, y, 1, 1);
      }

      // 별
      for (const s of stars) {
        const on = Math.sin(t / 700 + s.tw * 40) > -0.6;
        if (!on) continue;
        ctx.globalAlpha = 0.45 + 0.55 * Math.abs(Math.sin(t / 900 + s.tw * 20));
        px(s.x, s.y, 1, 1, s.c);
        if (s.tw > 0.97) {
          px(s.x - 1, s.y, 1, 1, s.c);
          px(s.x + 1, s.y, 1, 1, s.c);
          px(s.x, s.y - 1, 1, 1, s.c);
          px(s.x, s.y + 1, 1, 1, s.c);
        }
      }
      ctx.globalAlpha = 1;

      // 달 (초승달)
      const mx = Math.round(W * 0.76);
      const my = Math.round(34 * k);
      ctx.globalAlpha = 0.12;
      for (let r = 20; r > 13; r -= 3) {
        ctx.beginPath();
        ctx.fillStyle = "#c9cbff";
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      for (let y = -11; y <= 11; y++)
        for (let x = -11; x <= 11; x++) {
          if (x * x + y * y > 121) continue;
          if ((x - 5) ** 2 + (y + 3) ** 2 < 90) continue; // 깎아서 초승달
          px(mx + x, my + y, 1, 1, x + y < -4 ? "#f4f1d8" : "#d9d5b8");
        }

      // 구름
      for (const c of clouds) {
        const x = ((c.x + t * c.s * 0.06) % (W + c.w)) - c.w;
        ctx.globalAlpha = 0.55;
        px(x, c.y, c.w, 2, "#3b3f8c");
        px(x + 4, c.y - 2, c.w * 0.6, 2, "#3b3f8c");
        px(x + c.w * 0.3, c.y + 2, c.w * 0.5, 1, "#2f3279");
        ctx.globalAlpha = 1;
      }

      // 산 3겹
      const layer = (h: number[], base: number, amp: number, c: string, snow?: string) => {
        for (let x = 0; x < W; x++) {
          const top = Math.round(base - h[x] * amp);
          px(x, top, 1, horizon - top + 1, c);
          if (snow && h[x] > 0.62) {
            const depth = Math.round((h[x] - 0.62) * 22);
            px(x, top, 1, depth, snow);
          }
        }
      };
      layer(far, horizon - 18 * k, 96 * k, "#2a2c6c", "#5a5da8");
      layer(mid, horizon - 6 * k, 62 * k, "#202259");
      layer(near, horizon + 2, 34 * k, "#171844");

      // 나무 실루엣
      for (const tr of trees) {
        const base = horizon + 1;
        for (let i = 0; i < tr.h; i++) {
          const w = Math.max(1, Math.round((tr.h - i) / 2));
          px(tr.x - Math.floor(w / 2), base - i, w, 1, "#0f1033");
        }
      }

      // 호수
      px(0, horizon + 1, W, H - horizon, "#121339");
      for (let y = horizon + 3; y < H; y += 3) {
        const off = Math.floor((t / 120 + y * 7) % 9);
        ctx.fillStyle = "#1b1d4d";
        for (let x = off; x < W; x += 9 + (y % 5)) ctx.fillRect(x, y, 4, 1);
      }
      // 달빛 반사
      for (let y = horizon + 2; y < H; y += 2) {
        const w = 3 + Math.round(Math.sin(t / 300 + y) * 2) + Math.floor((y - horizon) / 6);
        ctx.globalAlpha = 0.35 + 0.25 * Math.sin(t / 250 + y * 1.7);
        px(mx - w / 2, y, w, 1, "#d9d5b8");
      }
      ctx.globalAlpha = 1;

      // 물가의 텐트와 모닥불
      const fx = Math.max(22, Math.round(W * 0.2));
      const fy = horizon;
      // 텐트
      for (let i = 0; i < 9; i++) px(fx - 18 + i, fy - i, 18 - i * 2, 1, i < 2 ? "#3a2d5c" : "#4b3b75");
      px(fx - 10, fy - 4, 2, 4, "#1a1436");
      // 장작
      px(fx - 3, fy, 7, 1, "#4a2e22");
      // 불꽃
      const f = Math.floor(t / 140) % 3;
      ctx.fillStyle = "#ffb347";
      for (let r = 9 + f; r > 3; r -= 3) {
        ctx.globalAlpha = 0.07;
        ctx.beginPath();
        ctx.arc(fx, fy - 3, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      px(fx - 2, fy - 2, 5, 2, "#ff7a2f");
      px(fx - 1, fy - 4 - f, 3, 2 + f, "#ffb347");
      px(fx, fy - 6 - f, 1, 2, "#ffe08a");
      // 앉아 있는 두 사람
      px(fx + 6, fy - 4, 2, 4, "#0d0e2a");
      px(fx + 6, fy - 6, 2, 2, "#0d0e2a");
      px(fx - 9 + 18, fy - 3, 2, 3, "#0d0e2a");
      px(fx + 9, fy - 5, 2, 2, "#0d0e2a");
      // 불빛 반사
      ctx.globalAlpha = 0.35;
      px(fx - 2, fy + 2, 5, 1, "#ff9a4a");
      px(fx - 1, fy + 4, 3, 1, "#ff9a4a");
      ctx.globalAlpha = 1;
    };

    build();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 110) return; // 약 9fps: 픽셀 느낌 + 가벼움
      last = t;
      draw(t);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
