# ☀️ FE README

## 👥 팀원 
| Frontend | Frontend | Fronted |
| :-----: | :-----: | :------: |
| <img src="https://avatars.githubusercontent.com/u/109705781?v=4" width=200px alt="강민경"/> | <img src="https://avatars.githubusercontent.com/u/86221268?v=4" width=200px alt="김성윤"/> | <img src="https://avatars.githubusercontent.com/u/86095931?v=4" width=200px alt="김태진"/> |
| [강민경](https://github.com/mingyeong0210)|[김성윤](https://github.com/tjddbs531)|[김태진](https://github.com/crossbat)|
| 상품 검색, 등록, 조회, 수정 | 메인, 로그인, 회원가입 | 유저 프로필, 마이페이지 |

<br>

## 🎯 프로젝트 목표  
- 사용자 중심 중고거래 플랫폼 개발  
- 로그인/회원 관리부터 상품 등록/조회, 마이페이지 기능까지 구현  
- 실시간 거래 메시지 및 좋아요 기반 추천 UX 구축

<br>

## 🛠️ 사용 기술 및 도구  

| 항목 | 사용 도구 |
|------|-----------|
| 코드 에디터 | Visual Studio Code |
| 라이브러리 | React |
| 빌드툴 | Vite |
| 언어 | JavaScript |
| 패키지 관리 | npm |
| 디자인 툴 | Figma |
| 협업 도구 | Notion, Slack |

<br>

## 📁 Git 컨벤션

### 브랜치 네이밍 규칙  
(수정옵션)/기능설명
ex) feat/login-api

<br>

### 커밋 규칙  

**Body**는 Header에서 표현할 수 없는 **상세한 내용**을 적는다.

Header에서 충분히 표현할 수 있다면 **생략 가능**하다.

**Footer**는 바닥글로 어떤 이슈에서 왔는지 같은 **참조 정보들을 추가**하는 용도로 사용한다.

예를 들어 특정 이슈를 참조하려면 Issues #1234 와 같이 작성하면 된다.

Footer는 **생략 가능**하다.

<br>

### 메세지 구조
```
// Header, Body, Footer는 빈 행으로 구분한다.
타입(스코프): 주제(제목) // Header(헤더)
본문 // Body(바디)
바닥글 // Footer

//예시
git commit -m "fix: Safari에서 모달을 띄웠을 때 스크롤 이슈 수정
모바일 사파리에서 Carousel 모달을 띄웠을 때,
모달 밖의 상하 스크롤이 움직이는 이슈 수정.
resolves: #1137
```

<br>

### 커밋 타입 목록

| 타입  | 설명                              |
|-------|-----------------------------------|
| feat  | 새로운 기능에 대한 커밋           |
| fix   | 버그 수정에 대한 커밋             |
| build | 빌드 관련 파일 수정/모듈 설치, 삭제 |
| chore | 기타 자잘한 수정                  |
| ci    | CI 설정 수정                      |
| docs  | 문서 수정                         |
| style | 코드 스타일/포맷 수정             |
| test  | 테스트 코드 수정                  |
| perf  | 성능 개선에 대한 커밋             |