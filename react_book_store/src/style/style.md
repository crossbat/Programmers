# style/
---
이미지의 공통된 스타일을 관리한다.

## Sanitize.css
---
일반적인 태그들이 가지고 있는 기본적인 padding, margin 값을 초기화해주는 역할을 한다.
그리고 그 값들이 모든 환경에서 동일하게 보이게끔 도와준다.
- global.ts에서 관리하고 있다.

## styled.d.ts
---
styled-component를 사용하면서 이에 대한 모듈을 만드는 곳이다.
수업에서는 theme파일에 만들어서 했지만, 그렇게 하니 오류가 생겨서
다른 곳에다가 만들어서 export 한 형태이다.

## theme.ts
---
styled.d.ts에서 정의한 값들을 기준으로 테마를 만든다.

