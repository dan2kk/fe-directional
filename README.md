# FE-Directional

## 프로젝트 실행 방법

```bash
npm i #의존성 설치
npm run dev #개발 서버 구동
```

## 사용한 기술 스택

<aside>
💡 Next.js, React, matine-react-table, tanstack-query, axios, chart.js
</aside>

## 주요 구현 기능 요약

### 게시판 기능

1. 로그인 화면 (`/crud`)
    1. `Input` 컴포넌트와 `useInput` 커스텀 훅을 사용하여 이메일 과 비밀번호 입력 창 구현
    2. 각각 `emailValidator`, `passwordValidator` 로 이메일 규칙 과 비밀번호 규칙 검증
    3. 검증 절차 후에 `authLogin`을 호출하여 `sessionStorage`에 발급받은 토큰 저장.
2. 게시판 리스트 화면(`/crud`)
    1. `matine-react-table` 라이브러리를 활용하여 테이블 구현
    2. 각각의 row는 크기 조절 및 숨김 처리가 가능
    3. 제목, 생성일을 기준으로 정렬 가능. (서버 요청)
    4. 검색어 입력이 가능.(서버 요청)
    5. 전체 게시글 삭제 버튼 클릭시 `deleteAllPosts` 로 전체 게시글 삭제.
    6. 무한 스크롤 기반 페이지네이션 구현
        1. tanstack-query의 `useInfiniteQuery` 사용
        2. Observer의 intersection 감지 기능으로 하단 버튼 감지 후 fetch
3. 게시글 작성 화면(`/crud/create`)
    1. 페이지 진입시 토큰 없을 경우 게시판 리스트 화면으로 이동
    2. `useInput` 커스텀 훅을 사용하여 제목, 본문 규칙 검증
    3. 태그의 경우 엔터 키 혹은 , 입력 시 string 배열에 추가. 백스페이스 입력시 태그 삭제.
    4. 검증 절차 후 `updatePost` 호출하여 게시글 작성 후 `/crud` 로 이동
4. 게시글 열람 및 수정 화면 (`/crud/[id]`)
    1. 게시글 id를 path parm으로 활용
    2. 페이지 진입시 토큰 없을 경우 게시판 리스트 화면으로 이동
    3. `useGetSinglePost(id)` 함수로 게시글 정보를 불러와서 이를 제목, 본문, 태그, 카테고리로 설정
    4. `deleteSinglePost`, `updateSinglePost` 로 단일 게시글 삭제 및 수정 가능
    5. 나머지 기능은 작성 화면과 동일

### 차트 기능

1. 차트에 필요한 데이터는 `useGetChartData` 로 불러와 차트에 필요한 형태로 가공하여 저장
2. 각 차트는 종류별로 컴포넌트화(`BarChart`, `DoughnutChart`,`AreaChart`, `StackedBarChart`, `MultilineChart`)
3. 각 차트의 색상은 `generateRandomColors` 로 랜덤한 색상을 입힘.

## 배포 링크

[Vercel 링크](https://fe-directional-deploy-maugksi8e-dan2kks-projects.vercel.app/)