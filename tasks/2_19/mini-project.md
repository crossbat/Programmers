# 미니 프로젝트 개요

---

1. 회원관리

- 로그인(post, path : /login)
  - request : body(id, pwd)
  - response : '~님 환영합니다.' => 이후 고도화 시 메인페이지로 이동
- 회원가입(post, path : /join)
  - request : body(id, pwd, name)
  - response : '~님 환영합니다.' => 이후 고도화 시 로그인 페이지로 이동
- 회원조회(get, path : /users/:id)
  - request : id(req.params)
  - response : userId, userPwd
- 회원탈퇴(delete, path : /users/:id)
  - request : id(req.params)
  - response : '~님 다음에 또 뵙겠습니다.' or main page

2. 채널관리

- 채널생성
- 채널수정
- 채널삭제
