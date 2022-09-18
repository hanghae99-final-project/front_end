## 1. 서론

2022.08.26 - 2022.10.07 동안 진행하는 **프로젝트의 소개**와 전체 프로젝트에서 딱 절반인 지금 

**현재 상황,** 그리고 이 기간동안 **직면했던 문제**에 관하여 글을 작성하고자 한다.

## 2. 취준생을 위한 시간 관리 플랫폼, 랭플

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/88014148-c980-4be1-a225-8068aa0be286/Untitled.png)

랭플은 열심히 미래를 준비하고 있음에도 불구하고, **항상 불안해하는 취준생**들을 대상으로

**불안감을 해소시키고, 동기를 부여해줄 목적**으로 만들어진 서비스입니다. 

이러한 문제들을 아래의 solution으로 해결하고자 했습니다.

1. 공부 시간을 체크할 수 있는 **타이머**
2. 다른 사람들은 얼마나 공부하는지 확인하며 경쟁할 수 있는 **랭킹 시스템**
3. 성취감과 자신을 돌이켜 볼 수 있는 **스터디로그**

### 페이지별 기능

- **메인 페이지**
    - 타임 타이머 ****
    - 스톱워치
    - 랜덤 명언
    - 설정 디데이
    - todo 리스트
    - 현재 공부 중인 사람 수
- **마이 페이지**
    - 프로필 수정
    - 디데이 설정
    - 스터디로그 그래프 (월별, 주별)
    - 날짜별 todo list
- **랭킹 페이지**
    - 전체, 20대, 30대 랭킹
    - 일간, 주간, 월간 랭킹

## 2-1. 로그인 페이지

![로그인 (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eb1e0ab1-2408-44bd-9a3f-b44377337d1c/%EB%A1%9C%EA%B7%B8%EC%9D%B8_(1).png)

로그인

![닉네임 입력-2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20d9292c-9585-4c96-b4ce-001b642e4ef7/%EB%8B%89%EB%84%A4%EC%9E%84_%EC%9E%85%EB%A0%A5-2.png)

닉네임

![연령대 선택-1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d13791a5-f4e8-49fd-a2dc-40d3a75d38a0/%EC%97%B0%EB%A0%B9%EB%8C%80_%EC%84%A0%ED%83%9D-1.png)

연령대

![전문 분야 선택-1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a90b0054-03c1-4bdb-b667-60cbf76a3f04/%EC%A0%84%EB%AC%B8_%EB%B6%84%EC%95%BC_%EC%84%A0%ED%83%9D-1.png)

전문분야 

![가입 축하.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01256bbd-4b70-41b0-afa9-664bd7d531c2/%EA%B0%80%EC%9E%85_%EC%B6%95%ED%95%98.png)

가입 완료

현재 랭플은 **카카오 소셜로그인으로만 로그인이 가능**하며, 

유저가 처음 서비스에 방문한다면 기본적인 정보를 입력하게 한 후에 가입이 완료됩니다.

## 2-2. 메인 페이지

![타임타이머 재생.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d4f03877-c9aa-4d0b-a3c7-baa895eb2064/%ED%83%80%EC%9E%84%ED%83%80%EC%9D%B4%EB%A8%B8_%EC%9E%AC%EC%83%9D.png)

공부 시작

![타임타이머 휴식시간.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a648b059-20f1-410d-a6f0-cbebf44e2a65/%ED%83%80%EC%9E%84%ED%83%80%EC%9D%B4%EB%A8%B8_%ED%9C%B4%EC%8B%9D%EC%8B%9C%EA%B0%84.png)

공부 중 휴식

![목표 달성 후 계속하기 화면.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2924c50-8576-4156-8083-55975d582c65/%EB%AA%A9%ED%91%9C_%EB%8B%AC%EC%84%B1_%ED%9B%84_%EA%B3%84%EC%86%8D%ED%95%98%EA%B8%B0_%ED%99%94%EB%A9%B4.png)

목표 달성

![추가된 모습.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8c4c2600-788c-4e64-a4b0-2ca9284f5b7a/%EC%B6%94%EA%B0%80%EB%90%9C_%EB%AA%A8%EC%8A%B5.png)

todo 리스트

- 부가 기능
    - 서버에 기록되지는 않지만, 유용하게 사용할 수 있는 **스톱워치**
    - 현재 공부하고 있는 **인원이 수**
    - 설정한 **D-day** 중 가장 가까운 것의 날짜 및 내용
    - 동기를 부여해줄 **명언**
    - 오늘 내가 할 일을 작성할 수 있는 **todo 리스트**
- 메인기능
    
    오늘 목표하는 공부시간을 설정할 수 있으며, 
    **시작을 하게되면 시간이 기록**되며 게이지가 차오르게됩니다. 
    공부 도중 **휴식**을 취할 수 있으며, 
    **휴식한 시간도 따로 증가**하여 유저가 얼마나 쉬었는지 시간 체크도 가능합니다.
    마지막으로 **목표를 달성**하게 되면 성취감을 느끼도록 색을 변경했습니다.
    

## 2-3. 랭킹 페이지

![랭킹 기본화면.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1b17e189-da55-4f3d-a977-7ce036e90562/%EB%9E%AD%ED%82%B9_%EA%B8%B0%EB%B3%B8%ED%99%94%EB%A9%B4.png)

카테고리 별 랭킹

![Rectangle 6.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ddaf0531-e010-432b-a32f-8daf05673795/Rectangle_6.png)

카테고리 설정 기능

가입 시 추가한 정보에 따라 카테고리를 확인할 수 있으며, 
**자신의 랭킹 및 일간, 주간, 월간 공부시간 및 랭킹을 확인**할 수 있습니다.

- 부가 기능
    - 유저의 스터디를 돕기 위해 서버에 기록되지는 않지만, 유용하게 사용할 수 있는 스톱워치
    - 현재 공부하고 있는 인원이 수
    - 설정한 D-day 중 가장 가까운 것의 날짜 및 내용
    - 동기를 부여해줄 명언
    - 오늘 내가 할 일을 작성할 수 있는 todo 리스트
- 메인기능
    
    오늘 목표하는 공부시간을 설정할 수 있으며, **시작을 하게되면 시간이 기록**되며 
    게이지가 차오르게됩니다. 공부 도중 **휴식**을 취할 수 있으며, **휴식한 시간도 따로 증가**하여 
    유저가 얼마나 쉬었는지 시간 체크도 가능합니다.
    마지막으로 **목표를 달성**하게 되면 성취감을 느끼도록 색을 변경했습니다.
    

## 2-4. 마이 페이지

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c5e4c46-65c4-40c4-a993-07f08db903e0/Untitled.png)

- 프로필 및 디데이 설정 기능
- 주간, 월간 스터디 로그
- 날짜별 작성한 todo 리스트
- 서비스로 기록한 총 시간

## 3. 실전프로젝트 도중 직면한 문제

### 3-1. 디자이너

### 3-2. 협업

### 3-3.

### 3-1. 디자이너

## 4. 트러블 슈팅

## 5. 결론
