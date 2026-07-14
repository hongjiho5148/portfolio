export type ContributionDetail = {
  title: string;
  tech: string[];
  points: string[];
};

export type RepoLink = {
  label: string;
  url: string;
};

export type ProjectMedia = {
  type: "video" | "gif" | "image";
  src: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  period: string;
  description: string;
  summary: string;
  stack: string[];
  features: string[];
  links: RepoLink[];
  media?: ProjectMedia;
  contributions: ContributionDetail[];
};

export const projects: Project[] = [
  {
    slug: "convenience-dashboard",
    title: "편의점 행사 통합 대시보드",
    category: "Data Dashboard",
    period: "2026.02.23 ~ 2026.02.27",
    description:
      "CU, GS25, 7-Eleven, emart24의 행사 상품 데이터를 수집·정제하여 가격과 혜택을 비교하고, 예산에 맞는 상품 조합을 추천하는 Streamlit 기반 대시보드입니다. 6인 팀 프로젝트로 진행했습니다.",
    summary:
      "브랜드마다 다른 상품 데이터를 하나의 스키마로 정리하고, 행사 단가와 예산 조건을 반영해 실제 구매 가능한 조합을 추천하는 데이터 중심 프로젝트입니다.",
    stack: ["Python", "Streamlit", "Pandas", "BeautifulSoup4"],
    features: [
      "CU, GS25, 7-Eleven, emart24 행사 상품을 한 화면에서 탐색하는 통합 대시보드",
      "브랜드별 행사 규모, 가격 분포, 카테고리별 상품 현황을 비교하는 시각화 화면",
      "예산과 목적에 맞춰 상품 조합을 추천하는 꿀조합 생성기",
      "다이어트·식단·야식·안주 등 상황별 추천 가이드",
      "편의점 위치 확인, 잭팟 이벤트, 장바구니 연동 등 부가 기능",
    ],
    links: [{ label: "GitHub", url: "https://github.com/hongjiho5148/python_conv_project" }],
    media: { type: "image", src: "/convenience-dashboard.png" },
    contributions: [
      {
        title: "CU 행사 상품 수집 파이프라인",
        tech: ["Python", "BeautifulSoup4", "Pandas"],
        points: [
          "CU 행사 상품 페이지의 페이지네이션 구조를 분석해 상품명, 가격, 행사 유형, 카테고리를 수집하는 크롤러를 구현했습니다.",
          "쉼표, 원화 표기, 행사 텍스트가 섞인 가격 문자열을 정규식으로 정제해 계산 가능한 정수형 데이터로 변환했습니다.",
          "중복 상품을 제거하고 brand/name/price/event/category 공통 스키마로 저장해 다른 추천·시각화 기능에서 재사용할 수 있게 했습니다.",
        ],
      },
      {
        title: "예산 기반 상품 조합 추천",
        tech: ["itertools", "Streamlit"],
        points: [
          "1+1, 2+1, 3+1 행사 유형별 실제 지불 금액과 수량을 반영해 단순 가격 비교보다 현실적인 추천 기준을 만들었습니다.",
          "카테고리별 후보군을 구성한 뒤 itertools.product로 조합을 생성하고, 중복 카테고리와 예산 초과 조합을 필터링했습니다.",
          "잔여 예산이 남는 경우 추가 상품을 채워 추천 결과의 예산 활용도를 높였습니다.",
        ],
      },
    ],
  },
  {
    slug: "mate-platform",
    title: "MATE - 팀 프로젝트 매칭 플랫폼",
    category: "Full Stack",
    period: "2026.03.30 ~ 2026.04.08",
    description:
      "기술 스택과 포지션 기반으로 팀원을 모집·지원하고, 프로젝트별 게시판에서 소통할 수 있는 협업 플랫폼입니다. 백엔드 3명, 프론트엔드 2명, 풀스택 1명으로 구성된 6인 팀 프로젝트에서 백엔드를 담당했습니다.",
    summary:
      "모집글, 지원서, 프로젝트 멤버, 게시판이 얽힌 협업 플랫폼에서 유저 도메인과 삭제 정책을 맡아 API 일관성과 데이터 상태 관리를 정리했습니다.",
    stack: ["Java 17", "Spring Boot", "Spring Security", "JWT", "JPA", "MariaDB"],
    features: [
      "기술 스택, 포지션, 카테고리 기반 프로젝트 모집글 작성·조회·검색",
      "프로젝트 지원서 제출, 지원 현황 확인, 승인·거절 처리",
      "승인된 지원자를 프로젝트 멤버로 관리하는 팀 구성 플로우",
      "프로젝트별 게시판과 댓글을 통한 팀 내부 커뮤니케이션",
      "프로필 관리, 내가 작성한 모집글, 참여 프로젝트, 신청 현황을 모아보는 마이페이지",
    ],
    links: [
      { label: "Backend", url: "https://github.com/hongjiho5148/miniproject2-backend" },
      { label: "Frontend", url: "https://github.com/hongjiho5148/miniproject2-front" },
    ],
    media: { type: "image", src: "/mate-platform.png" },
    contributions: [
      {
        title: "유저·마이페이지 API",
        tech: ["Spring Boot", "Spring Security", "JWT", "Cloudinary"],
        points: [
          "UserController/UserService 계층에서 내 프로필 조회·수정, 프로필 이미지 업로드, 마이페이지 조회 API를 구현했습니다.",
          "Cloudinary 연동으로 프로필 이미지 업로드 결과 URL을 사용자 프로필에 저장하는 흐름을 구성했습니다.",
          "내 모집글, 참여 프로젝트, 신청 현황 조회 API에서 로그인 사용자 기준으로 필요한 데이터만 모아 반환하도록 DTO 응답을 구성했습니다.",
          "이메일·닉네임·전화번호 중복 확인 API를 회원가입과 마이페이지 수정 화면에서 함께 사용할 수 있도록 분리했습니다.",
          "프로필 수정 시 이메일, 닉네임, 전화번호 중복 여부를 각각 검증하고 기존 본인 값은 예외적으로 허용하도록 처리했습니다.",
          "존재하지 않는 사용자, 탈퇴 처리된 사용자, 중복 입력 값에 대해 서비스 계층에서 예외를 분리해 잘못된 상태 변경을 막았습니다.",
        ],
      },
      {
        title: "소프트 삭제 정책 설계",
        tech: ["JPA", "MariaDB", "Repository Query"],
        points: [
          "BaseEntity에 deletedAt 필드와 softDelete(), isDeleted() 메서드를 추가해 엔티티 삭제 상태를 공통 모델로 관리했습니다.",
          "회원 탈퇴, 모집글, 지원서, 게시글, 댓글, 프로젝트 멤버 삭제가 물리 삭제 대신 상태 변경으로 처리되도록 서비스 로직을 수정했습니다.",
          "User, Project, Application, BoardPost, Comment, ProjectMember Repository 쿼리에 deletedAt 조건을 반영해 삭제 데이터가 일반 조회에 섞이지 않게 했습니다.",
          "탈퇴 회원이 작성한 게시글을 조회할 때 작성자 정보 접근 과정에서 발생하던 500 에러를 재현하고, 탈퇴 사용자도 안전하게 응답에 매핑되도록 예외 케이스를 보완했습니다.",
          "프로젝트 통합 검색에서 기술 스택 필터링 조건이 누락되던 문제를 찾아 Repository 조회 조건을 수정했습니다.",
        ],
      },
    ],
  },
  {
    slug: "safepay-vault",
    title: "SafePay-Vault",
    category: "Full Stack / Infra",
    period: "2026.05.07 ~ 2026.05.18",
    description:
      "보안 격리 기반 가상계좌 결제 시스템으로, 가상계좌 발급부터 입금 검증, 판매자 정산 대시보드, 관리자 보안 모니터링까지 연결한 결제 서비스입니다. 5인 팀에서 사용자·판매자·관리자 대시보드를 담당했습니다.",
    summary:
      "결제 상태 전이와 입금 검증을 분리해 테스트 가능한 결제 흐름을 만들고, 판매자·관리자 대시보드까지 연결한 보안 결제 프로젝트입니다.",
    stack: ["Java 17", "Spring Boot", "Redis", "MySQL", "React", "AWS", "Terraform"],
    features: [
      "상품 주문 후 가상계좌를 발급하고 입금대기·승인·만료 상태를 관리하는 결제 플로우",
      "사용자 주문 내역과 결제 상태를 확인하는 사용자 대시보드",
      "판매자가 결제 요청을 확인하고 승인·정산 현황을 관리하는 판매자 대시보드",
      "관리자가 시스템 현황, 계정, 보안 감사 로그를 모니터링하는 관리자 대시보드",
      "계좌번호 마스킹, 삭제 데이터 관리, 보안 이벤트 기록 등 결제 서비스 보안 처리",
    ],
    links: [{ label: "Backend", url: "https://github.com/hongjiho5148/miniproject3" }],
    media: { type: "image", src: "/safepay-vault.png" },
    contributions: [
      {
        title: "가상계좌 결제 API",
        tech: ["Spring Boot", "JPA", "MySQL"],
        points: [
          "PaymentController에서 가상계좌 발급, 입금 완료 보고, 판매자 승인, 만료 처리 API를 구현했습니다.",
          "결제 상태를 발급, 입금대기, 승인, 만료 단계로 분리하고 각 API가 허용된 상태에서만 다음 단계로 이동하도록 흐름을 연결했습니다.",
          "판매자별 결제 목록 조회와 승인 API를 연결해 판매자 대시보드에서 결제 상태를 관리할 수 있게 했습니다.",
        ],
      },
      {
        title: "입금 검증 시뮬레이터",
        tech: ["Spring Boot", "Validation", "Redis"],
        points: [
          "SimulatorController에서 실제 결제 상태를 변경하지 않고 입금 요청을 검증하는 시뮬레이션 API를 구현했습니다.",
          "요청자 이메일과 계좌 소유자 일치 여부, 계좌 ACTIVE 상태, 주문 금액 일치 여부를 순차적으로 검증했습니다.",
          "이메일 불일치는 403으로 분리하고, 금액·상태 검증 실패는 실패 응답으로 내려 성공/실패 케이스를 명확히 구분했습니다.",
        ],
      },
      {
        title: "판매자·관리자 대시보드 연동",
        tech: ["React", "REST API"],
        points: [
          "판매자 대시보드에서 결제 목록, 승인 대기 건, 정산 관련 데이터를 조회할 수 있도록 REST API 응답을 연동했습니다.",
          "관리자 대시보드에서 시스템 현황, 계정 조회, 보안 감사 로그 API를 연결했습니다.",
          "사용자·판매자·관리자 화면이 같은 결제 상태 값을 기준으로 동작하도록 응답 데이터 구조를 맞췄습니다.",
        ],
      },
    ],
  },
  {
    slug: "argus-onde",
    title: "ARGUS × Onde - AI 기반 웹 취약점 자동 진단",
    category: "Security",
    period: "2024.06.09 ~ 2024.06.19",
    description:
      "AI 기반 웹 취약점 자동 진단 플랫폼 ARGUS와, 그 진단 대상으로 직접 구축한 항공·숙박·렌터카 통합 예약 서비스 Onde를 함께 진행한 프로젝트입니다. 수동 진단과 ARGUS 자동 진단 결과를 비교하며 자동화 도구의 실효성을 검증했습니다.",
    summary:
      "실사용 서비스 수준의 예약 플랫폼을 진단 대상으로 삼아 XSS/CSRF, 권한 상승, IDOR, Mass Assignment 자동 진단 모듈의 실효성을 검증했습니다.",
    stack: ["Python", "FastAPI", "OWASP ZAP", "Playwright", "React", "Spring Boot", "MariaDB"],
    features: [
      "ARGUS: 웹 애플리케이션을 대상으로 취약점 진단을 실행하고 결과를 리포트로 확인하는 자동 진단 플랫폼",
      "ARGUS: XSS, CSRF, 권한 상승, IDOR, Mass Assignment 등 주요 웹 취약점 진단 모듈 제공",
      "ARGUS: 진단 결과, 위험도, 증적 스크린샷을 함께 제공하는 리포트 화면",
      "Onde: 항공권, 숙소, 렌터카 예약과 결제·정산 흐름을 갖춘 진단 대상 여행 예약 서비스",
      "Onde: 사용자 예약 화면과 관리자 백오피스를 포함한 실사용 수준의 테스트 타겟",
    ],
    links: [
      { label: "ARGUS", url: "https://github.com/UR-ARGUS" },
      { label: "Onde", url: "https://github.com/UR-VULN" },
    ],
    media: { type: "image", src: "/argus-onde.png" },
    contributions: [
      {
        title: "XSS/CSRF 자동 진단 모듈",
        tech: ["Python", "FastAPI", "OWASP ZAP"],
        points: [
          "요청 파라미터를 하나씩 변조해 응답에 페이로드가 반영되는지 확인하고 Reflected/Stored XSS 가능성을 탐지했습니다.",
          "Origin/Referer 검증 여부, CSRF 토큰 존재 여부, SameSite 쿠키 설정을 함께 확인해 CSRF 위험을 판정했습니다.",
          "DELETE, 승인, 반려처럼 실제 데이터 상태를 바꿀 수 있는 요청은 스캔 대상에서 제외해 자동 진단의 위험 동작을 줄였습니다.",
        ],
      },
      {
        title: "권한 상승 진단 모듈",
        tech: ["HTTP Session", "JWT", "Cookie Auth"],
        points: [
          "A/B 테스트 계정을 이용해 일반 계정 토큰으로 관리자 API를 호출하는 수직 권한 상승 케이스를 검증했습니다.",
          "B 계정 소유 자원 id를 A 계정 인증 정보로 접근해 IDOR/수평 권한 상승 가능성을 실제 HTTP 요청으로 확인했습니다.",
          "role 같은 민감 파라미터를 주입한 뒤 응답 반영 여부를 확인해 Mass Assignment 가능성을 판정했습니다.",
          "토큰 인증 중심 구조를 헤더 기반으로 일반화해 쿠키 세션 인증도 지원하도록 확장했습니다.",
        ],
      },
      {
        title: "취약점 증적 캡처",
        tech: ["Playwright", "Report Automation"],
        points: [
          "Playwright로 공격 재현 화면을 열고 스크린샷을 저장해 취약점 리포트에 증적으로 첨부하도록 구현했습니다.",
          "IDOR 판정 로직을 사전 응답 스키마 비교 방식에서 실제 요청 후 상대방 정보 노출 여부를 확인하는 방식으로 리팩터링했습니다.",
          "응답 반영 여부 재확인과 수동 검증 안내를 추가해 자동 진단 결과의 오탐 가능성을 줄였습니다.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
