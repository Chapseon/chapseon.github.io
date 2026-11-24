import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} (Chapseon)`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.shareDescription,
  openGraph: {
    title: `${DATA.name} (Chapseon)`,
    description: DATA.shareDescription,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} (Chapseon)`,
    images: ["/og.png"],
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

// 디스코드 링크 미리보기 왼쪽 색 띠
export const viewport: Viewport = { themeColor: "#6366f1" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative overflow-x-clip",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
