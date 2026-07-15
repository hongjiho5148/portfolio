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
          "페이지 내부 데이터 API를 직접 호출해 브라우저 렌더링 없이 필요한 상품 데이터만 수집하도록 설계했습니다.",
          "응답이 비어있는 시점을 종료 조건으로 두고 안전 상한을 추가해, 전체 상품 수를 몰라도 안정적으로 수집되게 했습니다.",
          "중복 기준과 요청 간격을 두어 재실행에 안전하고 대상 서버에 부담을 줄이는 수집 흐름을 만들었습니다.",
          "수집과 가공 단계를 분리해 원본 데이터를 추천·분류 기능에서 재사용할 수 있게 했습니다.",
        ],
      },
      {
        title: "예산 기반 상품 조합 추천",
        tech: ["Pandas", "Streamlit"],
        points: [
          "카테고리별 후보군을 제한하고 무작위로 추려, 계산량을 줄이면서도 다양한 추천 결과가 나오게 했습니다.",
          "1+1 같은 행사 상품은 정가가 아니라 실제 지불 금액 기준으로 계산해 추천 정확도를 높였습니다.",
          "조합 생성 후 부족한 구성을 보완하고, 남은 예산에는 추가 상품을 채워 예산 활용도를 높였습니다.",
          "같은 조합이 반복 노출되지 않도록 고유성 판별 기준을 두었습니다.",
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
        tech: ["Spring Boot", "Spring Security"],
        points: [
          "내 프로필 조회·수정, 마이페이지 조회 API를 구현했습니다.",
          "이메일·닉네임·전화번호 중복 확인 로직을 회원가입과 마이페이지 수정 화면에서 함께 쓸 수 있도록 구현했습니다.",
          "프로필 수정 시 본인의 기존 값은 예외적으로 허용하면서 다른 사용자와의 중복은 막도록 검증 로직을 작성했습니다.",
          "존재하지 않는 사용자, 탈퇴 처리된 사용자 등 잘못된 상태 변경을 서비스 계층에서 예외로 분리해 차단했습니다.",
        ],
      },
      {
        title: "인증 흐름 구현 (로그인·토큰 재발급·로그아웃)",
        tech: ["Spring Security", "JWT", "Spring Boot"],
        points: [
          "로그인 시 발급된 리프레시 토큰을 DB에 저장·갱신하고, 재발급 API에서 저장된 토큰과 만료 여부를 검증하는 로직을 구현했습니다.",
          "로그아웃 시 저장된 리프레시 토큰을 삭제해, 이후 해당 토큰으로는 재발급이 불가능하도록 처리했습니다.",
          "회원가입 시 닉네임 미입력 시 자동 할당, 기본 프로필 이미지 자동 등록 등 예외 케이스를 처리해 가입 과정을 다듬었습니다.",
          "비밀번호 재설정(임시 비밀번호 발급), 이메일 찾기 등 계정 복구 관련 API를 구현했습니다.",
        ],
      },
      {
        title: "소프트 삭제 정책 설계 및 적용",
        tech: ["JPA", "MariaDB"],
        points: [
          "삭제 여부를 표시하고 확인하는 공통 로직을 만들어, 회원탈퇴·모집글·게시글·댓글·멤버 삭제를 물리 삭제 대신 상태 변경으로 처리하도록 구현했습니다.",
          "관련 컨트롤러·서비스·레포지토리 전반에 이 정책을 적용해, 삭제된 데이터가 일반 조회에 섞이지 않으면서도 필요 시 복구 가능하도록 설계했습니다.",
          "탈퇴한 회원이 쓰던 이메일·닉네임·전화번호를 재사용하지 못하던 문제를 발견해, 탈퇴 이력까지 포함한 중복 확인 로직으로 수정했습니다.",
        ],
      },
      {
        title: "공통 응답·예외 처리",
        tech: ["Spring Boot"],
        points: [
          "성공·실패 응답 포맷과 에러 코드를 통일해, 프론트엔드가 일관된 방식으로 결과를 처리할 수 있도록 기반을 만들었습니다.",
          "입력값 검증 실패 시 어떤 항목이 왜 잘못됐는지 구체적으로 전달해, 프론트엔드 폼 검증과 자연스럽게 연동되도록 했습니다.",
          "부분 수정 API를 PUT에서 PATCH로 전환하는 등 REST 원칙에 맞게 스펙을 다듬으며 프론트엔드와 협의했습니다.",
        ],
      },
    ],
  },
  {
    slug: "safepay-vault",
    title: "SafePay-Vault",
    category: "Full Stack",
    period: "2026.05.07 ~ 2026.05.18",
    description:
      "보안 격리 기반 가상계좌 결제 시스템으로, 가상계좌 발급부터 입금 검증, 판매자 정산 대시보드, 관리자 보안 모니터링까지 연결한 결제 서비스입니다. 5인 팀에서 사용자·판매자·관리자 대시보드를 담당했습니다.",
    summary:
      "결제 상태 전이와 입금 검증을 분리해 테스트 가능한 결제 흐름을 만들고, 판매자·관리자 대시보드까지 연결한 보안 결제 프로젝트입니다.",
    stack: ["Java 17", "Spring Boot", "Redis", "MySQL", "React"],
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
        title: "가상계좌 결제 API 및 상태 관리",
        tech: ["Spring Boot", "JPA", "MySQL"],
        points: [
          "가상계좌 발급부터 입금 대기, 판매자 승인, 만료까지 이어지는 결제 흐름 전체를 API로 설계하고 구현했습니다.",
          "결제가 항상 정해진 순서로만 진행되도록, 각 단계에 들어가기 전 이전 단계가 제대로 끝났는지 검증하는 로직을 넣었습니다.",
          "판매자가 본인이 등록한 상품의 결제만 승인할 수 있도록 권한 검증을 추가하고, 승인되는 순간 결제 기록이 함께 남도록 처리했습니다.",
        ],
      },
      {
        title: "입금 검증 시뮬레이터",
        tech: ["Spring Boot", "JPA"],
        points: [
          "실제 은행과 연동하지 않고도 결제 로직을 테스트할 수 있도록, 실제 데이터를 건드리지 않고 입금 요청이 유효한지만 확인하는 시뮬레이션 기능을 만들었습니다.",
          "계좌가 실제로 존재하는지, 입금자가 계좌 주인이 맞는지, 계좌가 아직 쓸 수 있는 상태인지, 입금 금액이 주문 금액과 맞는지를 순서대로 검사해서 어느 단계에서 실패했는지 정확히 알 수 있게 했습니다.",
          "계좌 주인이 아닌 경우와 단순 금액·상태 불일치를 구분해서 응답하도록 만들어, 권한 문제와 입력 실수를 다르게 처리할 수 있게 했습니다.",
        ],
      },
      {
        title: "결제 화면 및 대시보드 연동",
        tech: ["React", "REST API"],
        points: [
          "주문 화면과 결제 이력 화면을 만들고, 가상계좌 만료까지 남은 시간을 실시간으로 보여주다가 시간이 다 되면 자동으로 만료 처리가 되도록 화면과 서버 상태를 맞췄습니다.",
          "판매자 화면에서 입금 확인이 필요한 건과 이미 승인된 건을 탭으로 나누고, 승인 버튼을 누르면 바로 처리되도록 연결했습니다.",
          "관리자 화면에서 전체 결제 현황과 가입자 정보를 조회할 수 있도록 백엔드와 연동했습니다.",
        ],
      },
    ],
  },
  {
    slug: "argus-onde",
    title: "ARGUS × Onde - 웹 취약점 자동 진단",
    category: "Security",
    period: "2024.06.09 ~ 2024.06.19",
    description:
      "AI 기반 웹 취약점 자동 진단 플랫폼 ARGUS와, 그 진단 대상으로 직접 구축한 항공·숙박·렌터카 통합 예약 서비스 Onde를 함께 진행한 프로젝트입니다. 수동 진단과 ARGUS 자동 진단 결과를 비교하며 자동화 도구의 실효성을 검증했습니다.",
    summary:
      "예약 플랫폼 Onde를 진단 대상으로 구축하고, ARGUS의 취약점 탐지부터 증적 캡처·PDF 리포트 생성까지 이어지는 자동 진단 흐름을 검증했습니다.",
    stack: ["Python", "FastAPI", "OWASP ZAP", "Playwright", "React", "Spring Boot", "MariaDB"],
    features: [
      "ARGUS: 웹 애플리케이션을 대상으로 취약점 진단을 실행하고 결과를 리포트로 확인하는 자동 진단 플랫폼",
      "ARGUS: 입력값 변조, 요청 위조, 권한 검증, 파라미터 주입 등 다양한 공격 시나리오 기반 자동 진단 모듈 제공",
      "ARGUS: 진단 결과, 위험도, 증적 스크린샷을 함께 제공하는 리포트 화면",
      "Onde: 항공권, 숙소, 렌터카 예약과 결제·정산 흐름을 갖춘 진단 대상 여행 예약 서비스",
      "Onde: 사용자 예약 화면과 관리자 백오피스를 포함한 진단용 테스트 타겟",
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
          "정상 요청(baseline)과 변조 후 응답을 비교해 새로 나타난 반응만 취약점으로 인정하도록 해 XSS 오탐을 줄였습니다.",
          "저장형 XSS는 저장 요청 후 관련 조회 API를 다시 확인해, 실제 노출되는 화면이나 응답에 페이로드가 남는지 검증했습니다.",
          "Origin/Referer, CSRF 토큰, SameSite 쿠키 방어 상태를 기준으로 CSRF 위험도와 판정 근거를 남겼습니다.",
        ],
      },
      {
        title: "권한 상승 진단 모듈",
        tech: ["HTTP Session", "JWT", "Cookie Auth"],
        points: [
          "상태 코드와 응답 본문을 함께 확인해, 에러를 200 OK로 반환하는 서버에서도 권한 상승 오탐을 줄였습니다.",
          "A/B 계정의 고유 자원만 IDOR 테스트 대상으로 남기고, 실제 상대방 식별 정보가 노출되는지 기준으로 판정 로직을 개선했습니다.",
        ],
      },
      {
        title: "취약점 증적 캡처 엔진",
        tech: ["Playwright", "Browser Automation"],
        points: [
          "Playwright로 실제 브라우저를 조작해 URL 방문, 요소 클릭, API 응답 기반 탐색 순서로 취약점 증적 화면을 확보했습니다.",
          "SPA에서 DOM에 식별자가 바로 드러나지 않는 경우를 대비해, 목록 API 응답에서 대상 레코드의 텍스트를 찾아 클릭하는 방식을 추가로 설계했습니다.",
        ],
      },
      {
        title: "진단 결과 보고서(PDF) 생성 엔진",
        tech: ["HTML/CSS", "PDF Rendering"],
        points: [
          "진단 결과, 증적 스크린샷, 조치 가이드를 결합해 표지·요약·finding 상세로 구성된 HTML 리포트를 자동 생성했습니다.",
          "취약점 유형과 심각도 통계를 집계하고, CSRF처럼 근거가 중요한 항목은 별도 표로 판정 내용을 정리했습니다.",
          "HTML 리포트를 PDF로 변환해, 스캔 결과를 바로 공유 가능한 최종 산출물로 만들었습니다.",
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
