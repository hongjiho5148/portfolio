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

export type Troubleshooting = {
  title: string;
  tag: string;
  rows: TroubleshootingRow[];
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
    troubleshooting: [
      {
        title: "팀원 강제 퇴출이 DB에 반영되지 않던 문제",
        tag: "JPA 영속성 컨텍스트",
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
    troubleshooting: [
      {
        title: "동시 요청 경합: 낙관적 락 적용과 측정으로 확인한 효과",
        tag: "JPA @Version · 동시성",
        rows: [
          {
            label: "문제",
            text: "결제 상태를 바꾸는 요청(승인, 취소, 만료)이 같은 결제 건에 동시에 들어오면, 상태 확인과 변경 사이의 틈을 타고 둘 다 성공해 최종 상태가 어긋날 수 있는 구조였습니다.",
          },
          {
            label: "검증",
            text: "락 유무만 다른 두 빌드에 같은 부하(50라운드)를 걸어 비교했습니다. 락이 없을 때 승인과 취소를 동시에 보내면 50라운드 중 26라운드에서 둘 다 성공하며 최종 상태가 어긋났고, 낙관적 락을 적용하자 0라운드가 됐습니다. 같은 승인이 20개 동시에 오는 경우는 락 없이도 1건만 성공했는데, payment_history의 거래 ID 유니크 제약이 이미 막고 있었기 때문입니다.",
          },
          {
            label: "추가 발견",
            text: "락이 있어도 충돌이 항상 버전 불일치 예외로 나타나지는 않았습니다. DB 데드락(CannotAcquireLockException)과 유니크 제약 위반(DataIntegrityViolationException)으로도 나타나, 동시 승인 20개 시 600건 중 270건이 500으로 응답했습니다. 세 예외를 각각 409로 매핑해 500을 0건으로 줄였습니다.",
          },
          {
            label: "배운 점",
            text: "락이 실제로 필요한 경우는 서로 다른 연산이 같은 행을 바꾸는 경합이라는 점을 수치로 확인했습니다.",
          },
        ],
      },
      {
        title: "캐시 도입 효과를 측정하다 발견한 N+1",
        tag: "Redis 캐시 · JPA 성능",
        rows: [
          {
            label: "문제",
            text: "판매자 결제 목록에 Redis 캐시를 적용하고 효과를 측정했더니 cache miss가 814ms로 비정상적으로 느렸습니다(결제 540건 기준).",
          },
          {
            label: "원인",
            text: "SQL 로그를 세어 보니 결제 45건 조회에 쿼리가 51개(결제 1개, 건마다 가상계좌 45개, 회원 5개) 나가고 있었습니다. @OneToOne(mappedBy)가 기본 EAGER여서 결제마다 가상계좌를 따로 조회하는 N+1이었고, 정작 이 응답에는 가상계좌가 쓰이지도 않았습니다.",
          },
          {
            label: "해결",
            text: "@EntityGraph로 회원과 가상계좌를 한 번의 조인으로 가져오게 바꿨습니다. 수정 전 45건 조회에 51개였던 쿼리가, 수정 후에는 585건을 조회해도 SELECT 1개로 줄었습니다.",
          },
          {
            label: "결과",
            text: "결제 540건 기준 miss 응답 시간이 814ms에서 33ms로(약 24배) 줄었고, 그 위에 캐시를 적용한 hit는 13ms였습니다. 처음에는 캐시만으로 50배 빨라진 것처럼 보였지만 대부분은 N+1의 영향이었다는 점까지 구분해 기록했습니다.",
          },
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
  {
    slug: "pickseat",
    title: "PickSeat - 선착순 티켓팅 MSA 서비스",
    category: "Backend / MSA",
    period: "2026.09.09 ~ 2026.10.10",
    description:
      "한정 좌석에 사용자가 몰리는 상황을 가정한 선착순 공연 티켓팅 서비스입니다. 단일 모놀리스로 시작해 동시성 제어, 수평 확장, 5단계 마이크로서비스 분리까지 혼자 기획·설계·개발했고, 설계를 바꿀 때마다 k6 부하테스트로 전후를 비교했습니다. 이후 결제·환불, QR 입장권, 티켓 양도, 알림, 관리자 앱, 봇 방어로 운영 가능한 서비스로 확장했습니다.",
    summary:
      "문제를 부하테스트로 먼저 찾고 원인을 로그로 분석해 해결한 뒤 수치로 다시 검증한 개인 프로젝트입니다. 해결이 만든 새 약점과 현재 구조의 한계까지 재측정으로 확인해 남겼습니다.",
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
          "동시성 로직은 실제 MySQL에 붙어 롤백하는 통합 테스트를 포함해 JUnit 115개로 검증했습니다.",
        ],
      },
    ],
    troubleshooting: [
      {
        title: "고부하에서 실패율 24%: nginx 임시 포트 고갈",
        tag: "nginx · 부하테스트",
        rows: [
          {
            label: "문제",
            text: "k6 1000 VU 부하테스트에서 요청 실패율이 24%까지 올랐습니다. 서비스 로직 오류가 아니라 연결 단계의 실패였습니다.",
          },
          {
            label: "원인",
            text: "nginx에서 gateway로 가는 구간이 변수 proxy_pass(동적 resolver)라 업스트림 keepalive 풀을 쓰지 못해 매 요청마다 새 TCP 연결을 열었고, 연결이 폭증하며 임시 포트가 고갈되었습니다(Address not available).",
          },
          {
            label: "해결",
            text: "gateway는 실제로 스케일되지 않아 동적 재탐색이 필요 없었으므로, gateway에 고정 IP를 주고 정적 upstream과 keepalive로 전환해 연결을 재사용했습니다. 스케일되는 backend 경로만 별도 내부 로드밸런서로 분리했습니다.",
          },
          {
            label: "결과",
            text: "같은 1000 VU 조건에서 실패율이 24%에서 0.05%로 내려갔습니다(기능 확장 이전 구조 기준).",
          },
          {
            label: "한계",
            text: "현재 구조로 재측정하자 동적 resolver를 쓰는 backend 경로에서 같은 포트 고갈이 다시 발생했습니다. 해결이 새 약점을 남길 수 있다는 점을 확인했고 다음 개선 과제로 정리했습니다.",
          },
        ],
      },
      {
        title: "좌석 동시성: 분산락과 낙관적 락의 이중 방어",
        tag: "Redisson · @Version",
        rows: [
          {
            label: "문제",
            text: "같은 좌석을 여러 요청이 동시에 잡으면 중복 판매가 생길 수 있었습니다.",
          },
          {
            label: "해결",
            text: "좌석별 Redis 락(lock:seat:{seatId}) 안에서 AVAILABLE 확인 후 HOLD로 전이하고, 락을 못 잡으면 즉시 실패시켰습니다. 락은 트랜잭션 커밋 직전에 풀려 경합을 줄일 뿐 완전한 상호 배제가 아니라는 점을 알고, Seat에 @Version 낙관적 락을 두어 최종 정합성은 낙관적 락이 보증하게 했습니다.",
          },
          {
            label: "분산 환경의 틈",
            text: "홀드 성공 뒤 예약 저장이 실패하면 좌석이 HOLD로 남을 수 있어, event-service와 reservation-service가 각자 독립적으로 만료 스윕을 돌리는 자가 치유 구조로 만들고, 두 곳이 같은 좌석을 풀어도 문제없도록 해제를 멱등으로 처리했습니다.",
          },
          {
            label: "결과",
            text: "재측정(1000 VU)에서 좌석 충돌 2,374건이 모두 409로 정상 거절됐고, 확정 예약 수와 판매 좌석 수가 일치함을 확인했습니다.",
          },
        ],
      },
      {
        title: "DB 유니크 제약이 만든 영구 재예약 불가",
        tag: "DB 제약 · 책임 분리",
        rows: [
          {
            label: "문제",
            text: "reservation.seat_id에 DB unique가 걸려 있어, 한 번이라도 예약 행이 생기면(취소·만료 포함) 그 좌석을 다시 예약할 수 없었습니다. 예약과 취소를 반복하는 부하테스트에서 초기부터 있던 잠복 버그를 발견했습니다.",
          },
          {
            label: "원인",
            text: "좌석 점유의 동시성은 이미 event-service의 분산락과 상태 확인이 보장하고 있었고, 예약 테이블의 unique는 좌석은 평생 한 번만 예약된다는 의도하지 않은 의미를 만들고 있었습니다.",
          },
          {
            label: "해결",
            text: "유니크 제약을 제거하고 동시성 책임은 좌석 상태 전이(분산락과 @Version)에 두었습니다.",
          },
          {
            label: "트레이드오프",
            text: "DB 수준의 마지막 안전망 하나를 걷어낸 결정입니다. 활성 상태(HOLDING, CONFIRMED)의 예약만 유니크하게 하는 부분 유니크는 개선안으로 남겼습니다.",
          },
        ],
      },
      {
        title: "결제 정합성: 서버 재검증과 보상 환불",
        tag: "PortOne · 보상 처리",
        rows: [
          {
            label: "문제",
            text: "프론트는 결제창이 끝났다는 사실만 알려줄 뿐 성공 여부를 보증하지 않아, 조작된 요청으로 무료 결제 처리될 위험이 있었습니다.",
          },
          {
            label: "해결",
            text: "주문 소유와 상태를 확인한 뒤 PortOne 서버에서 결제를 다시 조회해 상태가 PAID이고 금액이 주문 금액과 같은지 검증했습니다. 이후 쿠폰과 포인트를 조건부 UPDATE로 차감하고, reservation-service 확정이 끝난 뒤에 로컬 주문을 PAID로 바꿨습니다.",
          },
          {
            label: "보상",
            text: "이미 할인가로 결제됐는데 쿠폰 또는 포인트 차감이 실패하면 PortOne 자동 환불, 예약 취소, 주문 FAILED 처리를 하고, 자동 환불마저 실패하면 로그로 수동 환불 대상으로 표시했습니다.",
          },
          {
            label: "한계",
            text: "아웃박스 패턴은 쓰지 않아, 원격 확정이 성공한 뒤 로컬 커밋이 실패하는 틈이 남아 있습니다. PortOne은 테스트 환경이라 실결제 승인 경로는 검증하지 못했고, 환불 계산과 보상 로직은 통합 테스트로 검증했습니다.",
          },
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
