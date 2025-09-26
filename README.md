# 📡 Network Management System (네트워크 관제 시스템)

네트워크 장비와 성능을 모니터링하고, 사용자 관리 및 통계 기능을 제공하는 관제 시스템입니다.  
Spring Boot 기반 백엔드와 React 기반 프론트엔드로 구현되었으며, JWT 인증과 대시보드 시각화를 지원합니다.

---

## 🚀 주요 기능
- **사용자 관리**
  - 회원가입, 로그인/로그아웃 (Spring Security + JWT)
  - 아이디 / 비밀번호 찾기
  - 마이페이지 (회원정보 수정, 회원탈퇴)

- **대시보드**
  - 장비 현황 조회
  - 성능 차트 시각화 (amCharts5)

- **장비 관리**
  - 임계치 설정

- **성능 관리**
  - 장비별 CPU / Memory / Traffic 조회  
  - Max / Min / Avg / Latest 지표 제공  
  - 필터별 검색 기능

- **통계**
  - 일/주/월 단위 통계 조회  
  - 엑셀 다운로드 지원

- **공지사항**
  - 첨부파일 업로드  
  - 중요 공지사항 상단 고정  
  - 기간별 표출 설정  
  - 댓글, 조회수 기능

---

## 🛠️ 기술 스택
**Back-end**
- Java 17.0.12  
- Spring Boot 3.5.6 (Maven)  
- MariaDB 10.6.23  
- MyBatis  
- Spring Security (JWT)

**Front-end**
- React 19.1.1  
- Node.js 20.19.4  
- Vite  
- TailwindCSS  
- amCharts5  

---

## 📂 프로젝트 구조
```plaintext
📦network-management-system/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/network/nms/
│   │   │   │   ├── config/           # 보안, CORS, JWT 설정
│   │   │   │   ├── controller/       # REST API 컨트롤러
│   │   │   │   ├── domain/           # Entity 및 도메인 클래스
│   │   │   │   ├── dto/              # Request/Response DTO
│   │   │   │   ├── exception/        # 커스텀 예외 처리
│   │   │   │   ├── mapper/           # MyBatis 매퍼 인터페이스
│   │   │   │   ├── security/         # JWT, 필터, 인증 관련 시큐리티 구성
│   │   │   │   ├── service/          # 비즈니스 로직
│   │   │   │   └── util/             # 공통 유틸
│   └── resources/
│       ├── application.yml
│       └── mapper/                   # MyBatis XML

├── frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── api/                      # axios 기반 API 함수
│   │   ├── common/                   # 공통 모듈
│   │   │   ├── constants/            # 상수 정의
│   │   │   ├── cookie/               # 쿠키 관련 유틸
│   │   │   └── utils/                # 기타 공통 함수
│   │   ├── components/               # 공통 UI 컴포넌트
│   │   ├── features/                 # 도메인 기능 단위 페이지들 (auth, dashboard 등)
│   │   ├── layouts/                  # 페이지 레이아웃 컴포넌트
│   │   ├── routes/                   # React Router 설정
│   │   ├── store/                    # Redux store, slice 정의
│   │   ├── styles/                   # 글로벌 CSS 파일들
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html                    # Vite 진입점 HTML
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
```

---

## ⚡ 실행 방법
1) Backend
``` bash
./mvnw clean install
./mvnw spring-boot:run
```

2) Frontend
```bash
npm install
npm run dev
```

---

