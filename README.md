# 찹선 소개 페이지

[Magic UI Portfolio](https://github.com/dillionverma/portfolio) (MIT, © Dillion Verma) 템플릿을 바탕으로 만든 개인 소개 사이트입니다.

## 내용 고치기
- 모든 글, 기술, 프로젝트, 게임 목록: `src/data/resume.tsx`
- 프로젝트 썸네일: `public/projects/*.svg` (게임 GIF·스크린샷으로 바꾸면 더 좋아요)
- 게임 카드 배경: `public/games/`에 직접 찍은 스크린샷을 넣고 `games`의 `image`에 `"/games/파일명.jpg"`
- 프로필 사진: `public/me.png`를 넣고 `avatarUrl: "/me.png"`
- 디스코드 아이디: `src/data/resume.tsx`의 `discord`

## 실행
```
npm install
npm run dev
```

## GitHub Pages 배포 (chapseon.github.io)
1. GitHub에서 조직(Organization)을 `chapseon` 이름으로 만듭니다. (무료 플랜)
2. 그 조직 안에 **`chapseon.github.io`** 이름으로 Public 저장소를 만듭니다.
3. 이 폴더 전체(숨김 폴더 `.github` 포함)를 저장소에 올립니다.
4. 저장소 Settings → Pages → Source를 **GitHub Actions**로 바꿉니다.
5. Actions 탭에 초록 체크가 뜨면 `https://chapseon.github.io` 에서 열립니다.

조직 이름을 다르게 정했다면 저장소 이름도 `<조직이름>.github.io`로 맞추고,
`src/data/resume.tsx`의 `url`도 같이 바꿔주세요.

아이콘: [Simple Icons](https://simpleicons.org) (CC0) · 글꼴: [Pretendard](https://github.com/orioncactus/pretendard) (OFL)
