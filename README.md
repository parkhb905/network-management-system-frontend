# Network Management System (네트워크 관제 시스템)
<br />

## 사용 기술스택
- Java 17.0.12
- Spring Boot(Maven) 3.5.6
- MariaDB 10.6.23
- MyBatis
- React 19.1.1
- Node 20.19.4
- Vite
- Amcharts5
- tailwindcss

<br />

## 필수 기능 (완료 시 ✅ 처리)
1. 사용자 
    - (Spring Security & JWT) 회원가입, 로그인&로그아웃
    - 마이페이지
        - 회원정보 수정
        - 회원탈퇴
2. 대시보드 
    - 장비 현황
    - 성능 차트
3. 장비관리 
    - 임계치 설정
4. 성능관리
    - 장비별 CPU, MEMORY, TRAFFIC 조회
        - Max, Min, Avg, Latest 표출
        - 필터별 검색
5. 일별/주별/월별 통계 
    - 필터별 검색
    - 엑셀 다운로드
6. 공지사항
    - 첨부파일
    - 중요 공지사항 - 최상단 표출
    - 표출 기간 설정
    - 댓글
    - 조회수
7. 기타
    - 백엔드
        - ✅ 공통 DTO (CQRS 패턴) 
        - ✅ 커스텀 Exception 
        ```json
        {
        	"code":1002,
        	"message":"비밀번호가 일치하지 않습니다.",
        	"status":401
        }
        ```
        - Request Validation
        - 트랜잭션 설정 
        - 테스트 코드
        - 메뉴별 권한 설정
    - 프론트엔드
        - ✅ toast 공통 메시지 
        - 쿠키
        - Request Validation
