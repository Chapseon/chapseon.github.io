import { withContentCollections } from "@content-collections/next";

// GitHub Pages 배포용 정적 빌드 설정
// 저장소 이름이 <아이디>.github.io 가 아니면 BASE_PATH=/저장소이름 으로 빌드하세요.
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
