> # 👑취준생을 위한 시간 관리 플랫폼, 랭플👑

랭플은 열심히 미래를 준비하고 있음에도 불구하고, **항상 불안해하는 취준생**들을 대상으로

**불안감을 해소시키고, 동기 부여를 해줄 목적**으로 만들어진 서비스입니다.

이러한 문제들을 아래의 solution으로 해결하고자 했습니다.

1. 공부 시간을 체크할 수 있는 **타이머**
2. 다른 사람들은 얼마나 공부하는지 확인하며 경쟁할 수 있는 **랭킹 시스템**
3. 성취감과 자신을 돌이켜 볼 수 있는 **스터디로그**

<br/>

> 서비스 링크 👉: https://ranking-planner.com
>
> 팀 노션 👉: https://c11.kr/161cx

<br/>

> ## 🖥️기능

- **메인 페이지**
  - 타임 타이머
  - 스톱워치
  - 랜덤 명언
  - 설정 디데이
  - todo 리스트
  - 현재 공부 중인 사람 수
- **마이 페이지**
  - 프로필 수정
  - 디데이 설정
  - 스터디로그 그래프 (월별, 주별)
  - 날짜별 todo 리스트
- **랭킹 페이지**
  - 전체, 20대, 30대 랭킹
  - 일간, 주간, 월간 랭킹

<br/>

> ### PWA

<div align="center">
<img width="71%" src="https://user-images.githubusercontent.com/95389265/193484343-7949dba6-3304-4d3f-9276-8102f1bfa603.png">
</div>
<div align="center">
모바일 및 데스크탑에서 쉽게 접근할 수 있도록 PWA를 이용한 웹앱 구현
</div>

<br/>

> ### 반응형 웹사이트

<div align="center">
<img src="https://user-images.githubusercontent.com/95389265/193482461-93c7f758-bbf6-4bfa-ab61-e134be56e372.gif">
</div>
<div align="center">
대부분의 디바이스에서 알맞은 화면을 출력할 수 있도록 반응형 웹 적용
</div>

<br/>

> ### 메인페이지

<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459516-9644d202-3cbb-4292-b51c-8e7727eac006.png" title="Green"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459581-ca4fd92e-a3fd-4e74-8ead-5d8ce6a91b57.png" title="Blue"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459584-4cdf119d-6c63-4e1d-8c4f-48f68ce0a15a.png" title="Red"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193460731-a4a2a4ea-da32-45ef-9a0f-f3ba89f59b80.png" title="Todo"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193459626-239bcf78-4a8f-4532-976f-4f9f89956339.png" title="Info"/>
</div>

- **타임 타이머( or Circle Timer )**

  - 공부를 시작했을 때 <span style="color:green">**Green** </span>
  - 휴식 중일 때 <span style="color:blue">**Blue**</span>
  - 목표를 달성했을 때 <span style="color:red">**Red**</span>
  - 시간은 매일 밤 **12시**에 초기화됨

- **스톱워치[Timer]**

  - 우측 상단에 간단한 시간체크를 할 수 있는 스톱워치로 서버가 아닌 로컬에 시간을 저장하여 사용

- **투두 리스트**
  - 오늘 할 일을 잊어버리지 않도록 메모할 수 있는 투두리스트
  - 오늘 완료한 todo 개수 / 오늘의 전체 todo 개수로 표현
  - 클릭 or 터치 시 수정 및 삭제 가능
- **현재 공부 중인 인원 수**

- **마이페이지에서 내가 설정한 **D-day** 슬라이드로 표시**

- **info modal**
  - 회원 가입 후 최초 접속 시에 자동으로 띄우고, 그 이후 접속 시에는 왼쪽 상단의 info 버튼으로 접근

<br/>

> ### 랭킹페이지

<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193480912-39f60e18-22bf-498f-bc87-0425edd14415.png" title="ranking"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193480952-e8574ba4-a40b-42ad-a10f-2611f78ee88c.png" title="bottom sheet"/>
</div>

- **랭킹**
  - 일간, 주간, 월간 랭킹 확인 가능
  - 각각 유저의 랭킹에서 유저의 직종 및 현재 접속 여부 확인 가능
  - 전체 랭킹 클릭 시 바텀시트로 나이대 별 랭킹 변경 가능

<br/>

> ### 마이페이지

<div align="center">
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481340-bd2aada6-9e0d-4159-9a73-b9a6b8b23390.png" title="Green"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481380-8c1a9dfd-0e36-427b-bd11-3aa0e177872b.png" title="Blue"/>
<img width="18%" src= "https://user-images.githubusercontent.com/95389265/193481379-6cdc9cb9-eac8-43a7-8c0f-151b703e02a3.png" title="Blue"/>
</div>

- **오늘 공부한 시간과 어플을 사용하면서 공부한 총 시간 확인 가능**

- **프로필 수정**

  - 닉네임, 연령대, 분야 바꾸기 가능
  - 닉네임 변경에 회원가입과 마찬가지로 디바운싱 적용해 UX개선

- **디데이 설정**

  - 캘린더 형식으로 날짜 선택 가능
  - 추가 시 D-day를 자동으로 계산해주며, 메인 화면에 슬라이드로 확인 가능

- **월간 스터디 로그**

  - <img width="100px" src="https://user-images.githubusercontent.com/95389265/193542942-b14bc36f-ebd3-43bc-905a-33e9ad8066fc.png">
  - 공부한 시간 날짜 별로 공부한 시간에 따라서 색 변경

- **날짜 별 투두 리스트**

  - 다른 날짜의 투두 리스트를 확인할 수 있음
  - **Done 수정 불가**

- **주간 스터디 로그**
  - 일주일 단위로 공부한 시간을 확인할 수 있는 차트
  - 월간 스터디 로그와 같은 색상으로 표현

<br/>

> ## 🛠️사용 기술 스택

<br/>

<div align="center">
<img height="40px" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/CSS Modules-000000?style=flat-square&logo=CSS Modules&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/styled components -DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

</div>
<div align="center">
<img height="40px" src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black&"/>
<img height="40px" src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img height="40px" src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=PWA&logoColor=white"/>
	
</div>

<br/>

> ## 🛍️파일 구조

```
ranking-planner-pwa
├─ .eslintrc
├─ .prettierrc
├─ public
└─ src
   ├─ app
   │  ├─ slice //슬라이스 관리
   │  └─ store.jsx
   |
   ├─ common //공통 파일 관리
   │  ├─ css //공통 css module 관리
   │  ├─ font
   │  └─ svg
   |
   ├─ components //조각기능 별 컴포넌트 폴더로 관리
   |
   ├─ hooks //커스텀 훅 관리
   |
   ├─ layout //레이아웃 컴포넌트 관리
   |
   ├─ pages //page 관리
   |
   ├─ shared //router 관리
   │  └─ Router.jsx
   |
   └─ utils //공통 함수 관리

```

<br/>

> ## 🦾팀원

| 이름   | 담당                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| 박종현 | 타임 타이머(서버 통신), 스톱워치, 메인페이지,Layout, 주간 스터디 로그, 타임피커, pwa, github actions, FCM     |
| 김수환 | D-day CRUD, D-day 캘린더 , todo list CRUD, 월간 스터디 로그, 마이페이지 날짜별 todo list                      |
| 한효승 | 타임 타이머(svg로 구현 및 기본 틀 완성),로그인, 회원가입/프로필 수정 및 디바운싱, 랭킹페이지, s3 + cloudFront |

<br/>

> ## 📝아키텍처

<div align="center">

![image](https://user-images.githubusercontent.com/95389265/193523843-42e565b0-e544-4cb5-b164-036b386b714a.png)

</div>

> ## 📝기술적 의사 결정 & 트러블 슈팅

<br/>

> 👉[기술적 의사 결정 보러가기](https://www.notion.so/Troubleshooting_FE-c931ee67e61a4e8a9df18d038e82fd64)
