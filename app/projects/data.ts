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

export type TroubleshootingRow = {
  label: string;
  text: string;
};

export type FigureKey = "nginx" | "latePay" | "safepayLock" | "safepayN1";

export type ChartItem = {
  label: string;
  before: number;
  after: number;
  beforeText: string;
  afterText: string;
};

export type TsPoint = {
  lead?: string;
  text: string;
};

export type Troubleshooting = {
  title: string;
  tag: string;
  featured?: boolean;
  headline?: { label: string; before: string; after: string };
  figure?: FigureKey;
  chart?: { title: string; items: ChartItem[] };
  problem?: TsPoint[];
  solution?: TsPoint[];
  result?: TsPoint[];
  conditions?: string;
  rows?: TroubleshootingRow[];
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
  troubleshooting?: Troubleshooting[];
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
    troubleshooting: [
      {
        title: "행사 상품 비용·절약액 계산 오류",
        tag: "데이터 모델링",
        rows: [
          {
            label: "문제",
            text: "2+1, 3+1 상품을 1개 가격으로만 계산해, 예를 들어 예산 10,000원에 3+1 4,000원 상품이 4,000원으로 판정되면 실제로는 12,000원이 드는 조합이 추천될 수 있었습니다.",
          },
          {
            label: "원인",
            text: "데이터에 몇 개를 결제해야 행사가 성립하는지가 없었습니다. unit_price와 discount_rate는 비교·표시용이었는데 예산 판정은 단품가에 의존했습니다.",
          },
          {
            label: "해결",
            text: "pay_count와 total_count 컬럼을 추가해(1+1은 1/2, 2+1은 2/3, 3+1은 3/4) 비용을 price × pay_count로, 절약액을 (total_count − pay_count) × price로 바꿨습니다. 총액 검증, 밥·반찬 보완 시 예산 확인, 잔여 예산 채우기의 누적 합계에도 같은 기준을 적용했습니다.",
          },
          {
            label: "결과",
            text: "최종 검증을 통과한 조합은 실제 결제액 기준으로 예산을 넘지 않습니다. 총액 기준 정렬도 의미를 갖게 됐습니다.",
          },
          {
            label: "남은 과제",
            text: "후보 풀 사전 필터는 아직 단품가 기준이고, 1+1·2+1·3+1 외 행사는 1/1로 처리하며, 이 계산을 검증하는 자동화 테스트가 없습니다.",
          },
        ],
      },
      {
        title: "키워드 부분일치 오분류",
        tag: "분류 로직",
        rows: [
          {
            label: "문제",
            text: "상품명에 키워드가 포함되는지로 카테고리를 나누다 보니 초코, 아몬드 같은 범용 키워드가 초코우유와 아몬드 음료까지 간식으로 끌어왔습니다.",
          },
          {
            label: "원인",
            text: "부분 문자열 포함 여부만 확인해 단어 경계가 없었고, 키워드가 짧고 범용적일수록 오탐이 늘어났습니다.",
          },
          {
            label: "해결",
            text: "범용 키워드를 감자칩, 초코바 같은 구체적인 상품명으로 바꾸고, 식사 판정에는 도시락김, 밥도둑처럼 이름에 밥이 들어가지만 밥이 아닌 상품의 제외 키워드 목록을 두었습니다. 영양제와 숙취해소제는 앞단에서 기타로 먼저 분리했습니다.",
          },
          {
            label: "결과",
            text: "대시보드에서 오분류를 발견할 때마다 키워드를 보완하며 오탐을 줄였습니다. 정확도를 수치로 측정하지는 않았습니다.",
          },
          {
            label: "남은 과제",
            text: "사전에 없는 신상품은 기타로 빠지고 사전이 커질수록 유지보수 비용이 늘어나, 추후 ML 기반 분류로 전환하고 싶습니다.",
          },
        ],
      },
      {
        title: "같은 추천이 반복되는 문제",
        tag: "추천 다양성",
        rows: [
          {
            label: "문제",
            text: "순위나 가격 정렬로 상품을 고르다 보니 같은 조합과 같은 상품이 계속 추천됐고, 남은 예산을 채우는 단계에서는 같은 상품이 도배되는 현상이 있었습니다.",
          },
          {
            label: "원인",
            text: "정렬 기준이 결정적이라 입력이 같으면 항상 같은 결과가 나왔습니다.",
          },
          {
            label: "해결",
            text: "카테고리별 상위 후보에서 무작위로 일부만 뽑고, 조합 순서와 남은 예산 채우기 순서도 섞었습니다. 같은 상품 구성은 중복 제거하고, 라면 두 개나 음료 여러 종류가 한 조합에 들어가는 것은 동종 상품 그룹으로 막았습니다.",
          },
          {
            label: "결과",
            text: "추천 결과가 매번 달라져 같은 상품이 반복되지 않습니다.",
          },
          {
            label: "남은 과제",
            text: "결과의 재현성은 포기했기 때문에 고정값 테스트가 어렵고, 후보를 한정하므로 최적해는 보장하지 않습니다. 테스트는 예산 이내인지, 중복이 없는지 같은 속성 기준으로 해야 합니다.",
          },
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
    troubleshooting: [
      {
        title: "팀원 강제 퇴출이 DB에 반영되지 않던 문제",
        tag: "JPA 영속성 컨텍스트",
        featured: true,
        headline: { label: "강제 퇴출 처리", before: "DB 미반영", after: "한 트랜잭션으로 반영" },
        rows: [
          {
            label: "문제",
            text: "방장이 팀원을 강제 퇴출하면 지원서를 REJECTED로 바꾸고, 프로젝트 인원 수를 줄이고, 그 프로젝트에서 대상이 쓴 댓글과 게시글을 정리하고, 멤버를 삭제해야 했습니다. 그런데 API는 정상 응답을 주는데도 멤버가 DB에서 삭제되지 않았고, 예외도 없어 원인을 찾기 어려웠습니다.",
          },
          {
            label: "원인",
            text: "댓글과 게시글 정리를 @Modifying(clearAutomatically = true) 벌크 UPDATE로 구현했는데, 이 쿼리는 실행 직후 영속성 컨텍스트를 비웁니다. 그 전에 조회해 둔 퇴출 대상 멤버 엔티티가 detached 상태가 되었고, detached 엔티티에 삭제 처리를 해도 Hibernate가 변경을 추적하지 않아 DB에 반영되지 않았습니다.",
          },
          {
            label: "해결",
            text: "지원서 상태 변경과 인원 수 감소를 먼저 flush하고, 컨텍스트를 clear한 뒤 벌크 쿼리를 실행했습니다. 마지막에 멤버를 다시 조회해 managed 엔티티에 삭제 처리를 했습니다.",
          },
          {
            label: "결과",
            text: "퇴출된 유저의 지원서가 REJECTED로 바뀌어 내 신청 현황에 퇴출 내역이 보이고, 그 프로젝트의 게시글과 댓글도 함께 정리되며, 모든 처리가 하나의 트랜잭션으로 묶입니다.",
          },
          {
            label: "배운 점",
            text: "벌크 연산은 영속성 컨텍스트를 우회합니다. 벌크 연산 전후로 들고 있는 엔티티가 여전히 managed 상태인지, 아직 flush되지 않은 변경이 있는지 확인해야 합니다.",
          },
        ],
      },
      {
        title: "탈퇴 회원 이메일로 재가입 시 500 에러",
        tag: "ORM 필터와 DB 제약의 검사 범위",
        rows: [
          {
            label: "문제",
            text: "회원 탈퇴를 소프트 삭제로 구현했더니, 탈퇴한 계정의 이메일로 재가입할 때 이메일 중복 확인은 사용 가능으로 통과하는데 실제 가입 시점에는 알 수 없는 서버 오류(500)가 발생했습니다.",
          },
          {
            label: "원인",
            text: "User 엔티티의 @Where(deleted_at IS NULL) 때문에 existsByEmail 같은 일반 조회는 탈퇴 회원을 보지 못하지만, DB의 UNIQUE 제약은 탈퇴 회원 행까지 포함해 걸려 있었습니다. 애플리케이션의 중복 확인 범위와 DB 제약의 범위가 달랐고, 제약 위반 예외는 전역 예외 처리기의 최종 500 핸들러로 떨어졌습니다.",
          },
          {
            label: "해결",
            text: "@Query(nativeQuery = true)로 @Where를 우회하는 중복 확인 쿼리(이메일, 닉네임, 전화번호)를 추가해, 탈퇴 회원을 포함한 전체 테이블 기준으로 중복을 검사하게 했습니다.",
          },
          {
            label: "결과",
            text: "DB 제약까지 가서 터지던 500 에러를 이미 사용 중인 이메일입니다 같은 원인별 에러 코드 응답으로 미리 걸러냅니다.",
          },
          {
            label: "배운 점",
            text: "ORM 필터는 애플리케이션 레벨에만 적용되고 DB 제약은 필터와 무관합니다. 소프트 삭제에서는 두 검사 범위를 일치시켜야 합니다.",
          },
        ],
      },
      {
        title: "게시글 목록 N+1 쿼리",
        tag: "JPA 성능 · 프로젝트 이후 재점검",
        featured: true,
        headline: { label: "게시글 목록 조회 쿼리 수", before: "4번", after: "1번" },
        rows: [
          {
            label: "문제",
            text: "프로젝트 게시판 목록을 페이징으로 조회하면 작성자별로 추가 SELECT가 나가, 목록 쿼리 1번에 작성자 조회가 더해져 총 4번이 실행됐습니다.",
          },
          {
            label: "원인",
            text: "author가 지연 로딩이라, 응답 DTO로 변환하며 작성자 닉네임에 접근할 때마다 프록시 초기화 쿼리가 실행됐습니다.",
          },
          {
            label: "해결",
            text: "기존 파생 쿼리 메서드에 @EntityGraph(attributePaths = author)를 추가해 작성자를 JOIN으로 한 번에 조회하게 했습니다. 작성자는 @ManyToOne(단일 값 연관관계)이라 페이징과 함께 써도 메모리 페이징 경고나 카운트 쿼리 문제가 없어, 변경이 가장 적은 방식을 골랐습니다.",
          },
          {
            label: "결과",
            text: "Hibernate Statistics로 실제 실행 쿼리 수를 세는 테스트를 작성해, 테스트 데이터 기준 수정 전 4번에서 수정 후 1번으로 줄어드는 것을 확인했습니다.",
          },
          {
            label: "배운 점",
            text: "성능 개선은 체감이 아니라 쿼리 수로 측정해야 하고, 연관관계가 단일 값인지 컬렉션인지에 따라 안전한 해결책이 달라집니다.",
          },
        ],
      },
      {
        title: "회원 탈퇴 후 타인의 댓글이 정리되지 않던 문제",
        tag: "소프트 삭제 순서 · 프로젝트 이후 재점검",
        rows: [
          {
            label: "문제",
            text: "회원 탈퇴 시 본인의 게시글, 댓글, 지원서, 프로젝트 멤버십을 소프트 삭제하는데, 탈퇴한 회원의 게시글에 다른 사람이 단 댓글이 정리되지 않고 남았습니다.",
          },
          {
            label: "원인",
            text: "탈퇴자가 쓴 게시글에 달린 댓글을 서브쿼리로 찾아 삭제하는 구조였는데, 게시글을 먼저 소프트 삭제하면 @Where 때문에 서브쿼리가 삭제된 게시글을 조회하지 못해 그 댓글이 정리 대상에서 빠졌습니다.",
          },
          {
            label: "해결",
            text: "삭제 순서를 게시글에 달린 타인 댓글, 게시글, 본인 댓글 순으로 바로잡았습니다.",
          },
          {
            label: "결과",
            text: "올바른 순서에서는 댓글이 정리되고 잘못된 순서에서는 버그가 재현되는 것을 테스트 두 개로 증명했습니다.",
          },
          {
            label: "배운 점",
            text: "소프트 삭제에서는 삭제 순서가 곧 데이터 정합성이며, 필터가 걸린 상태에서 서브쿼리가 무엇을 볼 수 있는지까지 고려해야 합니다.",
          },
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
    troubleshooting: [
      {
        title: "승인·취소 요청이 동시에 들어오면 둘 다 성공해 결제 상태가 어긋나는 문제 해결",
        tag: "JPA @Version · 동시성",
        featured: true,
        headline: { label: "승인·취소 동시 요청의 상태 불일치 (50라운드)", before: "26라운드", after: "0라운드" },
        figure: "safepayLock",
        chart: {
          title: "락 유무 비교 (50라운드, 각 항목은 락 없음 기준)",
          items: [
            { label: "승인 vs 취소|둘 다 성공", before: 26, after: 0, beforeText: "26/50", afterText: "0/50" },
            { label: "승인 vs 취소|최종 상태 불일치", before: 26, after: 0, beforeText: "26/50", afterText: "0/50" },
            { label: "승인 vs 만료|둘 다 성공", before: 2, after: 0, beforeText: "2/50", afterText: "0/50" },
            { label: "동시 승인 20개|500 응답", before: 270, after: 0, beforeText: "270/600", afterText: "0" },
          ],
        },
        problem: [
          { lead: "발견", text: "결제 상태 전이 API가 동시 요청에 취약할 수 있다는 점을 설계 점검에서 발견하고, 락 유무만 다른 두 빌드에 같은 부하를 주는 재현 스크립트로 확인했습니다." },
          { lead: "원인", text: "판매자의 승인과 구매자의 취소가 같은 결제 행을 동시에 바꾸면 둘 다 성공(200)하고 최종 상태가 어긋났습니다." },
          { lead: "해결 이유", text: "결제 상태가 어긋나면 정산과 고객 안내가 틀어지는 금전 문제입니다." },
        ],
        solution: [
          { lead: "@Version 낙관적 락", text: "Payment 엔티티에 JPA @Version을 적용해, 저장 시점에 버전이 다르면 늦은 요청이 실패하게 했습니다." },
          { lead: "선택 이유", text: "같은 결제 건에 서로 다른 요청이 겹치는 일은 드물고, 겹치면 한쪽을 거절하면 되는 업무라 대기 없이 충돌을 감지하는 낙관적 락을 택했습니다." },
          { lead: "추가 발견", text: "락 이후에도 동시 승인 20개 시나리오에서 유니크 제약 위반과 DB 데드락이 500으로 응답되어, 전역 예외 처리기에서 ConcurrencyFailureException과 DataIntegrityViolationException을 409로 매핑했습니다." },
        ],
        result: [
          { text: "승인 vs 취소: 둘 다 성공과 최종 상태 불일치가 각각 26/50 → 0/50" },
          { text: "승인 vs 만료: 둘 다 성공 2/50 → 0/50" },
          { text: "동시 승인 20개: 500 응답 600건 중 270건 → 0건 (409로 응답)" },
          { lead: "해석", text: "같은 승인의 중복 요청은 payment_history 유니크 제약이 이미 막고 있어, 이 케이스에서 락의 추가 효과는 측정되지 않았습니다." },
        ],
        conditions:
          "로컬 PC에서 Spring Boot 단일 인스턴스 + Docker MySQL 8.0 + Docker Redis 7을 같은 머신에 띄우고, Node 스크립트로 시나리오마다 50라운드, 라운드당 동시 요청을 발사. 락 유무만 다른 두 빌드로 비교(AMD Ryzen AI 7 350 8코어/16스레드, RAM 32GB). 절대값보다 전후 비교용입니다.",
      },
      {
        title: "판매자 결제 목록 조회의 N+1 쿼리 해결 (cache miss 814ms → 33ms)",
        tag: "Redis 캐시 · JPA 성능",
        featured: true,
        headline: { label: "결제 목록 cache miss 응답", before: "814ms", after: "33ms" },
        figure: "safepayN1",
        chart: {
          title: "응답 시간 비교 (결제 540건, 중앙값)",
          items: [
            { label: "cache miss|(DB 조회) ms", before: 814, after: 33, beforeText: "814ms", afterText: "33ms" },
            { label: "cache hit ms", before: 16, after: 13, beforeText: "16ms", afterText: "13ms" },
            { label: "miss 시 SELECT 수", before: 51, after: 1, beforeText: "51개", afterText: "1개" },
          ],
        },
        problem: [
          { lead: "발견", text: "판매자 대시보드 결제 목록에 Redis 캐시를 적용한 뒤 효과를 측정하다, cache miss가 814ms로 느린 것을 발견했습니다." },
          { lead: "원인", text: "SQL 로그를 세어 보니 45건 조회에 SELECT가 51개였습니다. 결제마다 가상계좌(@OneToOne mappedBy, 기본 EAGER)와 회원을 따로 조회하는 N+1이었습니다." },
          { lead: "해결 이유", text: "캐시가 비거나 무효화될 때마다 느린 경로를 타고, 캐시 수치가 이 문제를 가려 개선 효과를 잘못 읽게 됩니다." },
        ],
        solution: [
          { lead: "@EntityGraph", text: "조회 메서드 findAllByProduct_SellerId에 @EntityGraph(attributePaths = {\"member\", \"virtualAccount\"})를 붙여 한 번의 조인 조회로 바꿨습니다." },
          { lead: "선택 이유", text: "캐시를 더 늘려도 miss 경로는 그대로라 원인인 쿼리 자체를 고쳤고, 쿼리 메서드를 유지한 채 어노테이션만으로 조인을 적용할 수 있어 변경 범위가 작았습니다." },
          { lead: "구분해서 기록", text: "개선의 대부분이 캐시가 아닌 N+1 해결에서 나왔음을 단계별로 나눠 측정했습니다." },
        ],
        result: [
          { text: "cache miss 814ms → 33ms (약 24배), 585건을 조회해도 SELECT 1개" },
          { text: "그 위에 캐시를 더하면 33ms → 13ms (약 2.6배). 캐시만 보면 50배(814 → 16ms)로 보이지만 대부분은 N+1 해결의 효과입니다." },
        ],
        conditions:
          "로컬 PC에서 Spring Boot 단일 인스턴스 + Docker MySQL 8.0 + Docker Redis 7을 같은 머신에 띄워 측정(AMD Ryzen AI 7 350 8코어/16스레드, RAM 32GB). 사용자 60명 × 상품 9종 = 결제 540건, 케이스당 100회 조회의 중앙값, 응답 약 160KB. 같은 머신이라 네트워크 지연은 거의 포함되지 않았고 전후 비교용입니다.",
      },
    ],
  },
  {
    slug: "argus-onde",
    title: "ARGUS × Onde - 웹 취약점 자동 진단",
    category: "Security",
    period: "2026.06.22 ~ 2026.07.22",
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
  {
    slug: "pickseat",
    title: "PickSeat - 선착순 티켓팅 MSA 서비스",
    category: "Backend / MSA",
    period: "2026.09.09 ~ 2026.10.10",
    description:
      "한정 좌석에 사용자가 몰리는 상황을 가정한 선착순 공연 티켓팅 서비스입니다. 단일 모놀리스로 시작해 동시성 제어, 수평 확장, 5단계 마이크로서비스 분리까지 혼자 기획·설계·개발했고, 설계를 바꿀 때마다 k6 부하테스트로 전후를 비교했습니다. 이후 결제·환불, QR 입장권, 티켓 양도, 알림, 관리자 앱, 봇 방어로 운영 가능한 서비스로 확장했습니다.",
    summary:
      "문제를 부하테스트로 먼저 찾고 원인을 로그로 분석해 해결한 뒤 수치로 다시 검증한 개인 프로젝트입니다. 해결이 새 약점을 남기지 않았는지 재측정으로 다시 확인했습니다.",
    stack: ["Java 17", "Spring Boot", "Spring Cloud Gateway", "Redis(Redisson)", "MySQL", "React", "nginx", "k6", "Docker Compose"],
    features: [
      "선착순 대기열, 5분 좌석 임시 홀드, 공연당 1인 4석 제한, 결제까지 이어지는 예매 흐름",
      "Redisson 분산락과 낙관적 락(@Version)의 이중 구조로 같은 좌석의 중복 판매 방지",
      "PortOne 결제를 서버에서 재검증하고, 단계별 환불과 쿠폰·포인트, 실패 시 자동 환불 보상 처리",
      "QR 입장권, 티켓 양도, HTML 메일 알림, 관리자 앱(공연 등록, 매출 대시보드, 주문 조회, QR 스캔)",
      "IP별 토큰 버킷 레이트 리미팅과 reCAPTCHA, KOPIS 공공데이터로 실제 공연 정보 가져오기",
    ],
    links: [{ label: "GitHub", url: "https://github.com/hongjiho5148/ticketing-service" }],
    media: { type: "image", src: "/pickseat.png" },
    contributions: [
      {
        title: "모놀리스에서 5단계 마이크로서비스 분리",
        tech: ["Spring Cloud Gateway", "Spring Boot", "MySQL"],
        points: [
          "모놀리스에서 시작해 gateway, auth, event, reservation, order 서비스와 대기열 backend로 단계적으로 분리했습니다.",
          "서비스마다 DB 스키마를 분리하고, 서비스 간 참조는 FK 대신 id 값과 REST 호출로 처리했습니다.",
          "JWT는 auth-service만 발급하고 나머지는 검증만 하며, CORS는 Gateway 한 곳에서만 처리하도록 정리했습니다.",
        ],
      },
      {
        title: "좌석 동시성 제어",
        tech: ["Redisson", "Redis", "JPA @Version"],
        points: [
          "좌석별 분산락 안에서 상태 확인과 HOLD 전이를 처리하고, 락을 못 잡으면 즉시 실패시켜 DB로 요청이 몰리지 않게 했습니다.",
          "락이 커밋 직전에 풀린다는 점을 고려해 Seat에 @Version 낙관적 락을 두어 최종 정합성을 보증했습니다.",
          "예약과 좌석 홀드 사이의 부분 실패는 두 서비스가 각자 만료 스윕을 돌려 복구하게 하고, 해제는 멱등으로 처리했습니다.",
        ],
      },
      {
        title: "결제·환불 정합성",
        tech: ["PortOne", "Spring Boot", "MySQL"],
        points: [
          "결제 상태와 금액을 PortOne 서버에서 다시 조회해 검증하고, 결제수단도 클라이언트 값이 아닌 PortOne 응답에서 기록했습니다.",
          "쿠폰 한도, 포인트 잔액, QR 스캔, 양도 수락을 조건부 UPDATE 한 문장으로 처리해 읽고 쓰는 경쟁을 막았습니다.",
          "환불액을 서버가 계산해 미리 보여주고, 확인하는 사이 구간이 바뀌면 더 적게 환불하지 않고 거절하도록 했습니다.",
        ],
      },
      {
        title: "대기열과 부하테스트",
        tech: ["Redis ZSET", "k6", "nginx"],
        points: [
          "대기와 입장을 Redis ZSET으로 관리하고, 스케일아웃 시 스윕을 분산락으로 감싸 레플리카 중 한 대만 입장을 처리하게 했습니다.",
          "k6 시나리오(로그인, 대기열, 좌석 조회, 예약, 취소 반복)로 설계 변경 전후를 비교했습니다.",
          "동시성 로직은 실제 MySQL에 붙어 롤백하는 통합 테스트를 포함해 JUnit 150개로 검증했습니다.",
        ],
      },
    ],
    troubleshooting: [
      {
        title: "nginx 임시 포트 고갈로 부하테스트 요청 실패율 24%가 나오던 문제 해결",
        tag: "nginx · 부하테스트",
        featured: true,
        headline: { label: "k6 1000 VU 요청 실패율", before: "24%", after: "0.05%" },
        figure: "nginx",
        chart: {
          title: "재측정 A/B 결과 (backend 경로, 1000 VU)",
          items: [
            { label: "요청 실패율", before: 25.37, after: 0.04, beforeText: "25.37%", afterText: "0.04%" },
            { label: "포트 고갈 에러|(건)", before: 15745, after: 0, beforeText: "15,745", afterText: "0" },
            { label: "처리량|(req/s)", before: 647, after: 1624, beforeText: "647", afterText: "1,624" },
            { label: "전체 HTTP p95", before: 2410, after: 715, beforeText: "2.41s", afterText: "715ms" },
          ],
        },
        problem: [
          { lead: "발견", text: "k6 1000 VU 부하테스트에서 요청의 24%가 실패했고, nginx 에러 로그에서 임시 포트 고갈(Address not available)을 확인했습니다." },
          { lead: "원인", text: "변수를 쓰는 동적 proxy_pass는 upstream keepalive 풀을 쓸 수 없어, 요청마다 새 TCP 연결을 열었습니다." },
          { lead: "해결 이유", text: "연결을 재사용하지 못하는 구조 자체가 원인이라, 트래픽이 늘면 반드시 다시 터질 문제였습니다." },
        ],
        solution: [
          { lead: "nginx → gateway", text: "gateway는 스케일하지 않는 단일 컨테이너라 재탐색이 필요 없어, 고정 IP + 정적 upstream + keepalive 64로 교체했습니다." },
          { lead: "고려한 방법", text: "호스트명 기반 정적 upstream은 gateway가 꺼져 있으면 nginx가 host not found in upstream으로 기동하지 못했고(실제로 겪음) 컨테이너 재생성 시 IP 캐시 위험도 있어, 고정 IP를 택했습니다." },
          { lead: "nginx → backend", text: "수평 확장되는 구간은 레플리카 변화를 따라가야 해서 server backend:8080 resolve + keepalive를 적용했습니다. 이 구간은 현재 구조 재측정에서 같은 증상이 재발해, 연결을 재사용한다는 같은 원리로 해결했습니다." },
          { lead: "추가 발견", text: "backend를 3개로 늘렸는데 요청이 한 인스턴스로만 쏠려(30/0/0), 내부 로드밸런서를 추가해 9/10/11로 분산시켰습니다." },
        ],
        result: [
          { lead: "1차", text: "gateway 구간: 같은 1000 VU 테스트에서 실패율 24% → 0.05% (기능 확장 이전 구조, 커밋 기록)" },
          { lead: "2차", text: "backend 구간: 같은 조건 A/B에서 실패율 25.37% → 0.04%, 처리량 647 → 1,624 req/s, 전체 p95 2.41s → 715ms, backend 3개 분산 20 / 20 / 21 확인" },
        ],
        conditions:
          "k6 1000 VU, 로그인→대기열→좌석 목록→예약→취소 반복, 대기열 기본값(500명/300ms), backend 1개, 좌석 336석 신규 공연(전·후 각각 다른 공연)으로 변경 전·후를 연달아 측정. Windows 노트북(AMD Ryzen AI 7 350 8코어/16스레드, RAM 32GB), Docker Desktop(16 CPU, 메모리 약 15GB), k6와 서버를 같은 PC에서 실행. 절대값보다 전후 비교용입니다.",
      },
      {
        title: "홀드가 만료된 뒤 완료된 결제로 같은 좌석이 이중 판매될 수 있는 문제 해결",
        tag: "결제 정합성 · 보상 처리",
        featured: true,
        headline: { label: "늦은 결제의 좌석 이중 판매", before: "가능", after: "차단" },
        figure: "latePay",
        problem: [
          { lead: "발견", text: "결제 흐름을 코드로 따라가며 \"결제는 됐는데 좌석이 없는 경우가 있는가\"를 점검하다 찾았습니다." },
          { lead: "원인", text: "pay()가 홀드 유효성을 보지 않고 예약 확정과 좌석 판매를 무조건 실행했습니다. 결제창이 열려 있는 동안 홀드가 만료되고 다른 사용자가 홀드하면, 늦은 결제가 그 좌석을 팔 수 있었습니다." },
          { lead: "해결 이유", text: "결제 금액은 나갔는데 좌석이 중복되면 환불과 고객 대응으로 이어지는 금전 문제입니다." },
        ],
        solution: [
          { lead: "판매를 홀드에 묶음", text: "event-service의 sell이 좌석 락 안에서 그 홀드가 유효할 때만 판매하고(아니면 410 SEAT_HOLD_LOST), reservation-service는 HOLDING 예약만 확정합니다." },
          { lead: "보상 순서", text: "order-service는 홀드 만료 응답을 받으면 쿠폰·포인트 복구 → PortOne 자동 환불 → 예약 취소 → 주문 실패 순으로 처리합니다." },
          { lead: "선택 이유", text: "좌석이 아직 비어 있어도 홀드가 끝났으면 환불하는 엄격한 정책을 택해 경계 시점의 경합과 의미 모호성을 없앴습니다. 일시 장애는 환불하지 않고 같은 결제 id로 재시도하며, 판매 후 어느 홀드로 팔렸는지 남겨 반복 판매도 무해(멱등)하게 했습니다." },
        ],
        result: [
          { text: "홀드가 끝난 뒤의 결제는 좌석을 팔지 못하고, 혜택 복구와 자동 환불로 이어집니다." },
          { text: "판매 보호 6개, 예약 확정 4개, 결제 3개 등 통합 테스트 13개로 확인했습니다." },
        ],
        conditions:
          "JUnit 통합 테스트(실제 MySQL·Redis 사용). PortOne은 모킹해 검증했고 실제 결제로는 확인하지 못했습니다. 부하테스트는 이 문제에 대해 따로 측정하지 않았습니다.",
      },
      {
        title: "예약 API 지연: 트랜잭션이 원격 호출 동안 DB 연결을 점유하던 문제",
        tag: "트랜잭션 범위 · 성능 분석",
        featured: true,
        headline: { label: "예약 API 평균 지연", before: "1.76s", after: "0.94s" },
        chart: {
          title: "예약 API 변경 전후 (300 VU, 워밍업 후 3회 평균)",
          items: [
            { label: "평균 지연", before: 1.76, after: 0.94, beforeText: "1.76s", afterText: "0.94s" },
            { label: "p95 지연", before: 2.84, after: 2.01, beforeText: "2.84s", afterText: "2.01s" },
            { label: "처리량|(건/초)", before: 37, after: 43, beforeText: "37", afterText: "43" },
          ],
        },
        problem: [
          { lead: "발견", text: "nginx 문제를 고친 뒤에도 예약 API p95가 2~3초였습니다." },
          { lead: "가설 검증", text: "SQL 로깅 폭주는 끄고 재도 지연이 그대로였고, 커밋 fsync는 내구성 설정을 완화해도 개선이 작아 원인에서 제외했습니다. 좌석 296석 공연의 지연은 좌석 락 경합이라는 테스트 설계 문제였습니다." },
          { lead: "원인", text: "reserve()와 cancel()이 클래스 전체 @Transactional이라 HTTP 호출 3번 동안 DB 연결을 잡고 있었고, hold()는 락 대기 중에도 연결을 점유했습니다. processlist에서 연결 10개가 모두 사용 중이며 상당수가 COMMIT 대기임을 확인했습니다." },
        ],
        solution: [
          { lead: "트랜잭션 범위", text: "트랜잭션을 걷어내 DB 연결을 쓰는 순간에만 빌리게 하고, hold()는 락 → 짧은 트랜잭션 → 커밋 → 락 해제 순으로 바꿨습니다. 저장에 실패하면 좌석을 즉시 반납합니다." },
          { lead: "단계별 타이밍 로그", text: "이어서 reservation 테이블에 인덱스가 없어 7만 행을 매번 스캔하던 것과, Kafka 발행이 요청 스레드를 1~3초 막던 것을 찾아 인덱스 추가와 비동기 발행으로 고쳤습니다." },
          { lead: "측정 방법", text: "첫 결과가 흔들려, 설정마다 워밍업 1회를 버리고 3회를 측정하는 방식으로 바꿨습니다(재시작 직후 첫 실행은 항상 약 2배 느림)." },
        ],
        result: [
          { lead: "트랜잭션 수정만", text: "평균 지연 1.76s → 1.10s(약 37% 감소), 기본 풀 크기(10) 그대로" },
          { lead: "인덱스·비동기 발행까지", text: "평균 1.76s → 0.94s(-47%), p95 2.84s → 2.01s(-29%), 처리량 37 → 43건/초" },
          { lead: "남은 과제", text: "p95는 여전히 2초대로 임계값(1.5s)을 넘고, 남은 병목은 특정하지 못했습니다." },
        ],
        conditions:
          "k6 300 VU, 좌석 2,710석 공연, 대기열 해제, 설정마다 워밍업 1회를 버리고 3회 평균. 같은 노트북에서 k6와 서버, 다른 프로젝트 컨테이너를 함께 돌렸고 호스트 CPU가 94~100%로 포화된 환경이라 상대 비교로만 읽어야 합니다.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
