import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import {
  UnityIcon,
  DotnetIcon,
  CIcon,
  CppIcon,
  JavascriptIcon,
  HtmlIcon,
  CssIcon,
  GitIcon,
  GithubIcon,
  DiscordIcon,
  ClaudeIcon,
} from "@/components/ui/svgs/brand";

// 사이트 내용은 전부 이 파일에서 수정하면 됩니다.
export const DATA = {
  name: "찹선",
  firstName: "찹선",
  initials: "찹",
  // 맨 위 큰 글씨(좋아하는 게임 대사)와 그 아래 작은 글씨
  heroTitle: "마침내 행복하기를",
  heroSub: "Chapseon / 찹선",
  // 디스코드·카톡에 링크를 붙였을 때 미리보기에 나오는 문구
  shareDescription: "마침내 행복하기를 · 림버스 컴퍼니, 이터널 리턴, 레인보우 식스 시즈 같이 할 사람 구해요",
  url: "https://chapseon.github.io",
  description:
    "Unity 클라이언트 프로그래머를 준비하는 응용소프트웨어공학과 학생입니다. 게임을 만들고, 게임을 하고, 그 사이에 필요한 도구를 직접 만듭니다.",
  summary:
    "동의대학교 응용소프트웨어공학과에서 공부하고 있고, 팀 Nofect에서 덱빌딩 로그라이크 [코덱시아](#projects)의 프로그래밍을 맡아 G-STAR 2026에 선보였어요. 인디 게임팀에서는 UI와 비주얼 디렉션, 영상을 맡고 있고, 팀 프로젝트 「봉인된 서고」로 BIC 2026 루키 부문과 GIGDC 2026에 출품했어요. 게임 밖에서는 이터널 리턴 커스텀 게임용 Discord 봇과 AI 웹앱을 만들고, 림버스 컴퍼니 YouTube Shorts 채널을 운영합니다.",
  avatarUrl: "",

  // 할 줄 아는 것: 묶음별로 보여줍니다.
  skillGroups: [
    {
      title: "게임 개발",
      skills: [
        { name: "Unity", icon: UnityIcon },
        { name: "C#", icon: DotnetIcon },
        { name: "MCP for Unity", icon: ClaudeIcon },
      ],
      done: "덱빌딩 로그라이크 코덱시아 프로그래밍 (Team Nofect), 2D 액션 RPG 신기루의 무기 5종 전투 시스템 프로토타이핑",
    },
    {
      title: "프로그래밍 기초",
      skills: [
        { name: "C", icon: CIcon },
        { name: "C++", icon: CppIcon },
      ],
      done: "C로 BFS/DFS, 정수론, 큰 수 연산, 스택·큐 문제 풀이, C++ 객체지향 프로그래밍, C 과목 튜터링 참여",
    },
    {
      title: "웹",
      skills: [
        { name: "JavaScript", icon: JavascriptIcon },
        { name: "HTML", icon: HtmlIcon },
        { name: "CSS", icon: CssIcon },
      ],
      done: "HTML · CSS · JavaScript로 웹 페이지 제작",
    },
    {
      title: "봇 · 서버",
      skills: [
        { name: "Discord Bot", icon: DiscordIcon },
        { name: "GitHub", icon: GithubIcon },
        { name: "Git", icon: GitIcon },
      ],
      done: "나쟈봇 개발과 Cafe24 호스팅, NeoForge 모드 마인크래프트 서버 직접 운영",
    },
    {
      title: "UI · 도구",
      skills: [
        { name: "UI 디자인" },
        { name: "Claude Code", icon: ClaudeIcon },
      ],
      done: "인디 게임팀 UI · 비주얼 디렉션 담당, Claude Code로 개발 작업 자동화",
    },
  ],

  navbar: [{ href: "/", icon: HomeIcon, label: "홈" }],

  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Kimminjae-32",
        icon: Icons.github,
        navbar: true,
      },
      // YouTube 채널 주소를 넣고 navbar를 true로 바꾸면 아래 독에 아이콘이 생깁니다.
      Youtube: {
        name: "YouTube",
        url: "",
        icon: Icons.youtube,
        navbar: false,
      },
    },
  },

  // 활동 (원래 템플릿의 Work Experience 자리)
  work: [
    {
      company: "wheelseonstudio",
      title: "「봉인된 서고」 기획 · 스토리",
      start: "2026",
      end: "",
      description:
        "확률 기반 코인 합 카드 전투 게임의 기획과 스토리를 쓰고, 개발 인계 문서와 공모전 발표 자료를 만들었어요. BIC 2026 루키 부문과 GIGDC 2026에 출품했습니다.",
    },
    {
      company: "YouTube Shorts 채널",
      title: "운영 · 영상 제작",
      start: "",
      end: "",
      description: "림버스 컴퍼니 콘텐츠를 Shorts로 만들어 올리고 있어요.",
    },
  ],

  projects: [
    {
      title: "코덱시아 (Codexia)",
      href: "",
      dates: "Team Nofect · 프로그래밍 · G-STAR 2026",
      active: true,
      description:
        "**카드를 모으고 덜어내며, 신이 되는 덱을 완성하라.** 매 순간 쓸 수 있는 카드는 조금씩 달라집니다. 다양한 능력이 있는 카드를 모으고, 제거와 강화로 덱을 다듬어 나만의 전략을 완성하세요. 신이 되는 미궁을 내려가는 덱빌딩 로그라이크입니다.",
      technologies: ["덱빌딩 로그라이크", "PC", "데모", "Unity", "C#"],
      links: [],
      image: "/projects/codexia.jpg",
      video: "",
    },
    {
      title: "나쟈봇",
      href: "https://github.com/Kimminjae-32/nadja-bot",
      dates: "개인 개발 · 운영 중",
      active: true,
      description:
        "이터널 리턴 커스텀 게임을 굴리기 위한 Discord 봇. 팀 드래프트와 경매, 캐릭터 밴, 티어 입력을 지원하고 Cafe24에서 호스팅합니다.",
      technologies: ["Discord", "Cafe24", "Claude Code"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Kimminjae-32/nadja-bot",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/nadja.svg",
      video: "",
    },
  ],

  // 맨 위 배경. 비워두면 코드로 그린 픽셀아트 밤 풍경이 나오고,
  // public/banner.jpg 처럼 이미지를 넣고 경로를 적으면 그 이미지로 바뀝니다.
  banner: "",

  // 자주 하는 게임
  // image: public/games/ 폴더에 대표 이미지를 넣고 "/games/파일명.jpg" 로 적으면 카드 오른쪽에 깔립니다.
  //        비워두면 color 색으로 된 기본 배경이 나와요.
  games: [
    {
      name: "림버스 컴퍼니",
      quote: "FACE THE SIN, SAVE THE E.G.O",
      by: "죄악에 직면하여, 자아를 구원하라",
      color: "#8a1c2b",
      image: "/games/limbus.jpg",
    },
    {
      name: "이터널 리턴",
      quote: "절망의 끝에선 폰에게 모든 영광을",
      by: "",
      color: "#2d5d8a",
      image: "/games/eternal-return.jpg",
    },
    {
      name: "레인보우 식스 시즈",
      quote: "Negotiation is over.",
      by: "협상은 끝났다.",
      color: "#3d4450",
      image: "/games/r6-siege.jpg",
    },
  ],
  // 디스코드 아이디를 넣으면 맨 아래 연락 칸에 표시됩니다.
  discord: "",
  gamesMore: "그 밖의 다른 게임들",
} as const;
