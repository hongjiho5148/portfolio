import Image from 'next/image';
import Link from 'next/link';
import { Mail, Github, Server, Database, Cpu, Cloud, GitBranch, Film, Clock } from 'lucide-react';
import CursorGlow from './CursorGlow';

type ContributionDetail = {
  title: string;
  tech: string[];
  points: string[];
};

type RepoLink = {
  label: string;
  url: string;
};

type ProjectMedia = {
  type: 'video' | 'gif' | 'image';
  src: string;
};

type Project = {
  slug: string;
  title: string;
  category: string;
  period: string;
  description: string;
  stack: string[];
  features: string[];
  links: RepoLink[];
  media?: ProjectMedia;
  contributions: ContributionDetail[];
};

export default function Home() {
  const skillGroups = [
    {
      title: "Backend",
      icon: Server,
      text: "Spring Boot 기반 REST API 설계, Spring Security와 JWT를 활용한 인증/인가 처리",
      items: ["Java 17", "Spring Boot", "Spring Security", "JWT", "JPA / Hibernate"],
    },
    {
      title: "Database",
      icon: Database,
      text: "관계형 데이터 모델링과 캐시를 활용한 상태 관리 및 성능 최적화",
      items: ["MySQL", "MariaDB", "Redis"],
    },
    {
      title: "Data & Automation",
      icon: Cpu,
      text: "데이터 수집·정제 파이프라인 구축과 대시보드 형태의 시각화",
      items: ["Python", "Pandas", "BeautifulSoup4", "Streamlit"],
    },
    {
      title: "Cloud & Infra",
      icon: Cloud,
      text: "클라우드 배포 환경과 서드파티 스토리지 연동 경험",
      items: ["AWS", "Terraform", "Cloudinary"],
    },
    {
      title: "Collaboration",
      icon: GitBranch,
      text: "feature 브랜치와 PR 기반 협업, 팀 단위 REST API 컨벤션 정립",
      items: ["Git", "GitHub", "REST API 설계", "Code Review"],
    },
  ];

  const projects: Project[] = [
    {
      slug: "convenience-dashboard",
      title: "편의점 행사 통합 대시보드",
      category: "Data Dashboard",
      period: "2026.02.23 ~ 2026.02.27",
      description:
        "CU, GS25, 7-Eleven, emart24의 행사 상품 데이터를 수집·정제하여 가격과 혜택을 비교하고, 예산에 맞는 상품 조합을 추천하는 Streamlit 기반 대시보드입니다. 6인 팀 프로젝트로 진행했습니다.",
      stack: ["Python", "Streamlit", "Pandas", "BeautifulSoup4"],
      features: [
        "브랜드별 행사 상품 크롤링 및 공통 스키마(brand/name/price/event/category) 통합",
        "예산 입력 시 실제 구매 가능한 상품 조합을 자동 추천하는 꿀조합 생성기",
        "브랜드별 행사 규모·가격 분포 비교 시각화",
        "확률 기반 잭팟(슬롯머신) 이벤트 및 장바구니 연동",
      ],
      links: [
        { label: "GitHub", url: "https://github.com/hongjiho5148/python_conv_project" },
      ],
      media: {
        type: "image",
        src: "/convenience-dashboard.png",
      },
      contributions: [
        {
          title: "CU 행사 상품 수집 파이프라인",
          tech: ["Python", "BeautifulSoup4", "Pandas"],
          points: [
            "페이지네이션 기반 크롤러를 구현하고 가격 문자열을 정수형 데이터로 정제했습니다.",
            "중복 제거 후 brand/name/price/event/category 공통 스키마로 CSV 저장 흐름을 만들었습니다.",
          ],
        },
        {
          title: "예산 기반 상품 조합 추천",
          tech: ["itertools", "Streamlit"],
          points: [
            "1+1/2+1/3+1 행사 유형별 실질 단가를 계산해 추천 정확도를 높였습니다.",
            "카테고리 후보군을 조합하고 잔여 예산 내 추가 상품까지 채우는 추천 로직을 구현했습니다.",
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
      stack: ["Java 17", "Spring Boot", "Spring Security", "JWT", "JPA", "MariaDB"],
      features: [
        "기술 스택·포지션 기반 모집글 등록 및 카테고리/키워드 필터링 조회",
        "지원서 제출부터 승인/거절, 프로젝트 멤버 관리까지 이어지는 지원 플로우",
        "내 모집글·참여 프로젝트·신청 현황을 한 번에 보는 마이페이지",
        "프로젝트별 게시판·댓글, 회원 탈퇴 등 삭제 데이터를 위한 소프트 삭제 정책",
      ],
      links: [
        { label: "Backend", url: "https://github.com/hongjiho5148/miniproject2-backend" },
        { label: "Frontend", url: "https://github.com/hongjiho5148/miniproject2-front" },
      ],
      media: {
        type: "image",
        src: "/mate-platform.png",
      },
      contributions: [
        {
          title: "유저·마이페이지 API",
          tech: ["Spring Boot", "Spring Security", "JWT", "Cloudinary"],
          points: [
            "프로필 조회/수정, 이미지 업로드, 내 모집글·참여 프로젝트·신청 현황 조회 API를 구현했습니다.",
            "이메일·닉네임·전화번호 중복 확인 API를 회원가입과 마이페이지에서 재사용하도록 분리했습니다.",
          ],
        },
        {
          title: "소프트 삭제 정책 설계",
          tech: ["JPA", "MariaDB", "Repository Query"],
          points: [
            "BaseEntity에 deletedAt, softDelete(), isDeleted()를 추가해 삭제 상태를 공통화했습니다.",
            "User, Project, Application, BoardPost, Comment, ProjectMember 쿼리에 삭제 조건을 반영했습니다.",
            "탈퇴 회원 게시글 조회 500 에러와 기술 스택 필터링 누락 버그를 수정했습니다.",
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
      stack: ["Java 17", "Spring Boot", "Redis", "MySQL", "React", "AWS", "Terraform"],
      features: [
        "가상계좌 발급 → 입금대기 → 판매자 승인 → 만료의 전체 결제 상태 전이 API",
        "실제 DB를 건드리지 않고 계좌·금액을 검증하는 입금 시뮬레이터",
        "판매자 매출·주문 수·상품 순위를 보여주는 정산 대시보드",
        "관리자 시스템 현황, 보안 위반 로그, 이상 거래 알림 모니터링",
      ],
      links: [
        { label: "Backend", url: "https://github.com/hongjiho5148/miniproject3" },
      ],
      media: {
        type: "image",
        src: "/safepay-vault.png",
      },
      contributions: [
        {
          title: "가상계좌 결제 API",
          tech: ["Spring Boot", "JPA", "MySQL"],
          points: [
            "가상계좌 발급, 입금 완료 보고, 판매자 승인, 만료 처리 API를 구현했습니다.",
            "발급→입금대기→승인→만료로 이어지는 결제 상태 전이 흐름을 연결했습니다.",
          ],
        },
        {
          title: "입금 검증 시뮬레이터",
          tech: ["Spring Boot", "Validation", "Redis"],
          points: [
            "실제 DB 변경 없이 계좌 소유자, ACTIVE 상태, 주문 금액 일치 여부를 순차 검증했습니다.",
            "성공·실패·지연 케이스를 테스트할 수 있도록 결제 처리와 검증 로직을 분리했습니다.",
          ],
        },
        {
          title: "판매자·관리자 대시보드 연동",
          tech: ["React", "REST API"],
          points: [
            "판매자별 결제 목록과 승인 흐름을 연결했습니다.",
            "관리자 시스템 현황, 계정 조회, 보안 감사 API를 대시보드에 연동했습니다.",
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
      stack: ["Python", "FastAPI", "OWASP ZAP", "Playwright", "React", "Spring Boot", "MariaDB"],
      features: [
        "XSS/CSRF 자동 진단(1-1) — 파라미터 퍼징, CSRF 토큰·SameSite 쿠키 검증, 위험 요청 스킵 안전장치",
        "공격 재현 스크린샷 캡처 엔진 — Playwright 기반으로 취약점 증적 화면 확보",
        "일반계정 권한 상승 자동 진단(4-5) — 수직 권한 상승, IDOR(수평 권한 상승), Mass Assignment 3종 검사",
        "진단 대상 서비스 Onde — 항공권/숙소/렌터카 예약, 결제·정산, 관리자 백오피스를 갖춘 실사용 수준 웹 서비스",
      ],
      links: [
        { label: "ARGUS", url: "https://github.com/UR-ARGUS" },
        { label: "Onde", url: "https://github.com/UR-VULN" },
      ],
      media: {
        type: "image",
        src: "/argus-onde.png",
      },
      contributions: [
        {
          title: "XSS/CSRF 자동 진단 모듈",
          tech: ["Python", "FastAPI", "OWASP ZAP"],
          points: [
            "파라미터 퍼징으로 Reflected/Stored XSS를 탐지했습니다.",
            "Origin/Referer, CSRF 토큰, SameSite 쿠키 설정을 확인해 CSRF 위험을 판정했습니다.",
            "DELETE, 승인, 반려 같은 상태 변경 요청은 스캔 대상에서 제외했습니다.",
          ],
        },
        {
          title: "권한 상승 진단 모듈",
          tech: ["HTTP Session", "JWT", "Cookie Auth"],
          points: [
            "A/B 테스트 계정으로 수직 권한 상승, IDOR, Mass Assignment를 실제 HTTP 요청 기반으로 검증했습니다.",
            "토큰 인증 중심 구조를 헤더 기반으로 일반화해 쿠키 세션 인증도 지원하도록 확장했습니다.",
          ],
        },
        {
          title: "취약점 증적 캡처",
          tech: ["Playwright", "Report Automation"],
          points: [
            "공격 재현 화면을 스크린샷으로 남겨 리포트에 첨부하는 캡처 엔진을 구현했습니다.",
            "응답 반영 여부 재확인 로직을 넣어 자동 진단의 오탐을 줄였습니다.",
          ],
        },
      ],
    },
  ];

  return (
    <>
      <CursorGlow />
      <header className="site-header">
        <div className="header-container">
          <a href="#" className="brand">Hong Jiho</a>
          <nav className="nav-links">
            <a href="#introduce">Introduce</a>
            <a href="#skill">Skill</a>
            <a href="#project">Project</a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <span className="hero-kicker">JIHO PORTFOLIO</span>
            <h1>안녕하세요,<br />개발자 홍지호입니다.</h1>
          </div>
        </section>

        {/* Introduce Section */}
        <section id="introduce" className="section">
          <div className="section-header">
            <span className="section-label">Introduce</span>
            <h2 className="section-title">협업을 중요하게 생각합니다.</h2>
          </div>

          <div className="profile-container">
            <div className="profile-top">
              <div className="profile-image-wrapper">
                <Image src="/profile.png" alt="Profile" width={180} height={180} className="profile-image" />
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  <h3>홍지호 <span>(Jiho Hong)</span></h3>
                </div>
                <p className="profile-title">from Developer to Product Engineer</p>

                <div className="profile-links">
                  <a href="mailto:wlgh5148@naver.com"><Mail size={16} /> wlgh5148@naver.com</a>
                  <a href="https://github.com/hongjiho5148"><Github size={16} /> @hongjiho</a>
                </div>
              </div>
            </div>
          </div>

          <div className="intro-content mt-8">
            <p>
              팀원들과의 원활한 소통과 화합을 바탕으로 함께 성장하는 개발을 지향합니다.
            </p>
          </div>
        </section>

        {/* Skill Section */}
        <section id="skill" className="section">
          <div className="section-header">
            <span className="section-label">Skill</span>
            <h2 className="section-title">주요 기술 스택</h2>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => {
              return (
                <div className="skill-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="skill-tags">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Project Section */}
        <section id="project" className="section">
          <div className="section-header">
            <span className="section-label">Project</span>
            <h2 className="section-title">진행했던 프로젝트들</h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                prefetch={false}
                className={`project-card project-card-${project.slug}`}
                key={project.title}
              >
                <div className="project-media">
                  {project.media ? (
                    project.media.type === 'video' ? (
                      <video
                        src={project.media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img src={project.media.src} alt={`${project.title} 미리보기`} />
                    )
                  ) : (
                    <div className="project-media-placeholder">
                      <Film size={26} />
                      <span>미리보기 준비 중</span>
                    </div>
                  )}
                </div>
                <div className="project-card-body">
                  <div className="project-card-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-period"><Clock size={12} /> {project.period}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <span className="project-more">상세 보기 →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Hong Jiho. Backend Developer Portfolio</p>
      </footer>

    </>
  );
}
