

# 원티드 **프리온보딩 프론트엔드 인턴십 1주차 과제**

> Wanted에서 진행하는 프리온보딩 프론트엔드 인턴십 1주차 과제

진행 기간: 2023-04-25 ~ 2023-04-28

--- 
## 👨‍👨‍👧‍👦 TEAM **보람삼조**
> 인턴십 기간동안 보람찬 3조가 되자!

---

## 목차

* [🖥️ 화면](#🖥️-화면)
* [🕹️ 프로젝트 실행 방법](#🕹️-프로젝트-실행-방법)
* [🎯 과제 수행 방향](#🎯-과제-수행-방향)
  + [👑 Best Practice](#👑-best-practice)
  + [수행 방향](#수행-방향)
  + [구현 사항](#구현-사항)
  + [고민했던 사항들](#고민했던-사항들)
* [📌 컨벤션](#📌-컨벤션)
  + [type vs interface](#type-vs-interface)
  + [Commit convention](#commit-convention)
  + [Branch protection rule 설정](#branch-protection-rule-설정)
* [📚 사용한 라이브러리](#📚-사용한-라이브러리)
* [📂 프로젝트 구조](#📂-프로젝트-구조)
* [👨‍👩‍👧‍👧 팀 멤버](#👨‍👩‍👧‍👧-팀-멤버)
* [🧾 API](#🧾-api)

---

## 🖥️ 화면

---

## 🕹️ 프로젝트 실행 방법

레파지토리 클론

```bash
$ git clone https://github.com/WANTED-TEAM03/pre-onboarding-10th-1-3.git
```

패키지 설치

```bash
$ npm install
```

애플리케이션 실행

```bash
$ npm start
```

---

## 🎯 과제 수행 방향

### 👑 Best Practice

best practice 선정 기준

- **`코드의 가독성 및 재사용성`**
    - 가독성이 좋은 코드는 협업 프로젝트에 있어서 중요한 요소 중 하나.
- **`성능 최적화`**
    - 성능 최적화를 통해 사용자 경험을 높힐 수 있고 프론트엔드 개발자에게 경쟁력을 갖추게 할 수 있는 요소이다.
- **`유저 편의성`**
    - 프론트엔드는 유저와 가장 가까이 있는 포지션이기 때문에 사용자 경험을 잘 고려하는 것이 중요하다

> assignment 단위로 B.P 선정 기준에 따른  B.P 선정

팀원 과제와 본인 과제를 비교하여 어필할 수 있는 부분 체크

### 수행 방향

- 리뷰한 의견을 중점으로 개인이 특별히 잘했던 부분이나 맡아서 적용해보고 싶은 assignment를 맡아 진행합니다.
- 각 assignment단위로 이슈를 생성하여 브랜치를 생성 후 진행합니다.
- 완전히 새로 만드는 것이 아닌 Best Practice에 가까운 팀원 분들의 사전과제 코드를 가져온 뒤, 회의에서 적용해야 한다고 나온 부분을 추가 및 수정합니다.
- 완료된 작업은 커밋 후 PR을 올려 팀원들의 리뷰를 받습니다.
- 작업은 assignments 1-4 / 6-10 으로 나눠서 진행합니다.
- 코드의 가독성을 위해 함수/변수 네이밍을 명시적으로 한다.

| Assignment No. | 이름 |
| --- | --- |
| 1 | 황수현 |
| 2 | 이준호 |
| 3 | 박수현 |
| 4 | 이상민 |
| 5 | 유동혁 |
| 6 | 강명주 |
| 7 | 박겸영 |
| 8 | 고영욱 |
| 9 | 정정수 |
| 10 | 추헌재 |

### 구현 사항
- **`코드의 가독성 및 재사용성`**
    - input state의 관리와 validate를 옵션으로 할 수 있는 useInput 커스텀훅을 사용
        - useInput hook은 initValue와 validator를 전달받아 input의 value, setValue, onChange를 다루는 객체와, validation의 Result를 배열로 반환
    - 상수화
        - route path, URL, 유효성 검사 정규표현식, 에러 메세지 등 정적 데이터는 상수화하여 가독성과 유지보수를 용이하게 하였습니다.
    - 회원가입과 로그인 페이지는 UI와 로직이 비슷하기 때문에 코드의 반복을 줄이기 위해 서로 다른 formType props를 AuthForm component에 전달하여 사용하였습니다.
    - axios interceptor를 사용하여 request가 발생하는 시점에서 헤더에 토큰을 담아 보내주도록 설정하여 코드의 반복을 줄였습니다.
    - 라우팅 및 로그인 여부에 따른 리다이렉트 처리
        - useRoutes를 사용하여 모든 페이지들을 “/”경로의 중첩라우팅으로 설정하여 GlobalLayout을 설정할 수 있도록 코드를 분리
        - useCheckAuth 커스텀 훅을 사용하여 location.pathname이 변할 때 토큰 유무를 확인하여 로그인 여부를 판단하도록 함.
        - 로그인 여부를 outlet의 context로 전달해 페이지 컴포넌트에서 useOutletContext훅을 사용하여 로그인 여부를 판단하고 리다이렉트 처리

- **`성능 최적화`**
    - lazy suspense를 사용하여 코드 스플리팅을 통해 초기 페이지 렌더링 속도 단축
    - useMemo와 useCallback을 사용하여 불필요한 재렌더링을 방지해 성능을 최적화

- **`사용자 경험`**
    - 모바일, 데스크톱, 태블릿 사이즈에 맞는 반응형 UI 구현
    - input에서 엔터를 입력하여도 Submit이 일어나도록 구현
    - 투두 리스트가 추가될 때 리스트를 auto scroll하도록 구현
    - 에러 케이스 별로 alert하여 사용자가 원인을 쉽게 파악할 수 있도록 구현
    - 수정 버튼 클릭 시 input에 auto focus하도록 구현
    - error message 렌더링시 Layout shift가 일어나지 않도록 구현
    - 투두 체크박스 클릭 시 취소선을 표시하여 완료된 투두임을 사용자에게 명시적으로 알림
    - 투두 삭제 및 변경 시 사용자에게 재확인하는 알림을 구현하여 실수를 방지할 수 있도록 함.
    - 페이지를 쉽게 이동하고 로그아웃을 할 수 있도록 Navbar 구현

### 고민했던 사항들

- **로컬스토리지를 다루기 위한 커스텀훅과 유틸함수 사용에 대해**
    - 커스텀훅을 사용 시 네트워크 요청이 일어나는 service단에서 훅을 사용하여 관리할 수 없음
    - 유틸함수로 만들어 사용하는 방식은 코드 분리의 의미가 크게 없음
    - `커스텀훅과 유틸함수를 사용하지 않고 로컬스토리지 로직이 필요한 부분에서 localStorage 객체를 직접 참조하여 사용하는 방식으로 결정`
- **Todo의 CRUD 비즈니스 로직을 util함수로 분리할 지 컴포넌트단에서 만들어 사용할 지에 관하여**
    - CRUD로직을 util함수로 분리하면 비즈니스 로직을 분리하여 컴포넌트 코드의 양을 줄일 수 있고 유지보수가 쉬워지며 단일 책임의 원칙을 지킬 수 있음.
    - 컴포넌트단에 CRUD 로직을 구현하면 코드의 해당 state의 Setstate가 일어나는 과정을 한 눈에 볼 수 있어 코드의 가독성이 좋아 이해하기 쉬워진다.
    - `과제 특성 상 Depth가 깊지 않고 가독성 측면을 고려하여 컴포넌트단에서 투두의 CRUD 비즈니스 로직을 구현하도록 결정`

---

 ## 📌 컨벤션

### type vs interface

💭 확장성 면에서는 `interface`가 좋으나 여러 타입을 정의하는데는 `type` 이 좋다.

💭 `interface`의 변수명 맨 앞에 ‘`I`’를 붙여서 무엇을 위한 변수인지 인지하기 좋다.

💭  ‘`I`’를 붙이는 관행이 사라지는 추세다.

> 결론: `type`을 사용

### Commit convention

```markup
# <타입> : <제목> 형식으로 작성하며 제목은 최대 50글자 정도로만 입력
# 제목을 아랫줄에 작성, 제목 끝에 마침표 금지, 무엇을 했는지 명확하게 작성

################
# 본문(추가 설명)을 아랫줄에 작성

################
# 꼬릿말(footer)을 아랫줄에 작성 (관련된 이슈 번호 등 추가)

################
# [FEAT] : 새로운 기능 추가
# [FIX] : 버그 수정
# [DOCS] : 문서 수정
# [TEST] : 테스트 코드 추가
# [REFACTOR] : 코드 리팩토링
# [STYLE] : 코드 의미에 영향을 주지 않는 변경사항
# [CHORE] : 빌드 부분 혹은 패키지 매니저 수정사항
################
```

**처음 git clone을 한 뒤 다음 CLI 명령어를 입력해주세요.**

```powershell
git config --global commit.template ./.gitmessage.txt
```

### Branch protection rule 설정

main 브랜치와 develop 브랜치에 `branch protection rule`을 설정하여 브랜치에 직접 push하는 것을 방지하고 코드 리뷰와 approve를 통해 merge되도록 설정하였다.

- **Require approvals**
- **Require review from Code Owners**
- **Require conversation resolution before merging**


---


## 📚 사용한 라이브러리

<div align =center>

|     Area     |                                                                                                                                                                                                                                                                          Tech Stack                                                                                                                                                                                                                                                                          |
| :----------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **Frontend** | <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React Router-CA4245.svg?&style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?&style=for-the-badge&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/ESLINT-4B32C3?&style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/PRETTIER-F7B93E?&style=for-the-badge&logo=Prettier&logoColor=white">|

</div>

- `craco`
- `husky`
- `react-icons`
- `lint-staged`

---

## 📂 프로젝트 구조

```
📦src
 ┣ 📂assets
 ┃ ┗ 📜todo_background.png
 ┣ 📂components
 ┃ ┣ 📂AddTodoInput
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.module.scss
 ┃ ┣ 📂AuthForm
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.module.scss
 ┃ ┣ 📂Navbar
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.module.scss
 ┃ ┗ 📂TodoItem
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.module.scss
 ┣ 📂constants
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜config.ts
 ┣ 📂hooks
 ┃ ┣ 📜useCheckAuth.ts
 ┃ ┗ 📜useInput.ts
 ┣ 📂pages
 ┃ ┣ 📂SignIn
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂SignUp
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Todo
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.module.scss
 ┃ ┗ 📂Welcome
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜styles.module.scss
 ┣ 📂routes
 ┃ ┣ 📜Routes.tsx
 ┃ ┗ 📜_globalLayout.tsx
 ┣ 📂services
 ┃ ┣ 📜apiClient.ts
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂styles
 ┃ ┣ 📜media.scss
 ┃ ┗ 📜reset.scss
 ┣ 📂types
 ┃ ┣ 📜authForm.ts
 ┃ ┗ 📜todo.d.ts
 ┣ 📂utils
 ┃ ┣ 📜authValidator.ts
 ┃ ┗ 📜onKeydown.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```

---

## 👨‍👩‍👧‍👧 팀 멤버

| Name    | <center>황수현</center>|<center>이준호</center> |<center>박수현</center> |<center>이상민</center> |<center>유동혁</center> |
| ------- | --------------------------------------------- | ------------------------------------ | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | 
| Profile | <center> <img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/107838130?v=4" /> </center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/86146780?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/55135881?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/83197138?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/95751232?v=4" /></center>|
| GitHub | <center>[@rjsej12](https://github.com/rjsej12)</center> | <center>[@wujuno](https://github.com/wujuno) </center>| <center>[@pySoo](https://github.com/pySoo) </center>|<center>[@sangminlee98](https://github.com/sangminlee98)</center> |<center>[@robin14dev](https://github.com/robin14dev)</center> |


| Name    | <center>강명주</center>|<center>박겸영</center> |<center>정정수</center> |<center>고영욱</center> |<center>추헌재</center> |
| ------- | --------------------------------------------- | ------------------------------------ | --------------------------------------------- | --------------------------------------------- | --------------------------------------------- | 
| Profile | <center> <img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/96197310?v=4" /> </center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/91963656?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/19286161?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/47565280?v=4" /></center>|<center><img width="110px" height="110px" src="https://avatars.githubusercontent.com/u/67093357?v=4" /></center>|
| GitHub | <center>[@myungju030](https://github.com/myungju030)</center> | <center>[@seoltang](https://github.com/seoltang) </center>| <center>[@wjdwjdtn92](https://github.com/wjdwjdtn92) </center>|<center>[@free-ko](https://github.com/free-ko)</center> |<center>[@Chuhj](https://github.com/Chuhj)</center> |

---

## 🧾 API

[https://github.com/walking-sunset/selection-task#api](https://github.com/walking-sunset/selection-task#api)
