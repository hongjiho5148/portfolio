"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Github, X, Server, Database, Cpu, Cloud, GitBranch, Film, Clock, ListChecks, Wrench } from 'lucide-react';

type StarDetail = {
  situation: string;
  task: string;
  action: string;
  result: string;
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
  title: string;
  category: string;
  period: string;
  description: string;
  stack: string[];
  features: string[];
  links: RepoLink[];
  media?: ProjectMedia;
  star: StarDetail;
};

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
      star: {
        situation:
          "편의점 브랜드마다 행사 상품 페이지의 요청 방식과 데이터 구조가 달라 하나의 크롤러로 통합 수집이 불가능했고, 6인 팀에서 브랜드별 크롤링과 대시보드 기능을 분담해 진행했습니다.",
        task:
          "CU 행사 상품 데이터 수집·저장 파이프라인 구축, 예산 안에서 실제 구매 가능한 상품 조합 추천 기능 개발, 브랜드별 통계 비교 시각화 개선, 잭팟(슬롯머신) 게임 기능 추가를 맡았습니다.",
        action:
          "CUCrawler 클래스로 페이지네이션 크롤링을 구현하고 정규식으로 가격을 정수형으로 변환, 중복 제거 후 CSV로 저장했습니다. 예산 조합 추천 로직에서는 1+1/2+1/3+1 행사 유형별 실질 단가를 계산하고, 카테고리별 후보군을 뽑아 itertools.product로 조합을 생성한 뒤 중복 카테고리 배제, 식사류의 밥·국물·반찬 구성 자동 보완, 검색 키워드 우선 반영, 잔여 예산 내 추가 상품 채우기까지 처리했습니다. 이 외에 브랜드 비교 시각화 개선(PR #34)과 확률 기반 잭팟 게임, 장바구니 연동 UI를 구현했고, feature 브랜치와 PR 기반으로 협업했습니다.",
        result:
          "전체 저장소에 42개 커밋을 기여했으며, 예산 조합 추천 기능은 여러 차례 피드백을 반영해 반복 개선했습니다. 서로 다른 브랜드의 원본 데이터를 brand/name/price/event/category 공통 스키마로 통합하는 데이터 파이프라인에 기여해, 이후 팀원들의 다이어트 가이드·야식 가이드 등 다른 기능이 동일 데이터를 재사용할 수 있는 기반을 만들었습니다.",
      },
    },
    {
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
      star: {
        situation:
          "회원, 모집글, 지원서, 프로젝트 멤버, 게시판, 댓글 등 서로 얽혀 있는 도메인이 많은 서비스였고, 백엔드 3명이 유저/모집글·지원/게시판 도메인을 나눠 맡아 병렬로 개발한 뒤 지속적으로 병합해야 하는 구조였습니다.",
        task:
          "유저 및 마이페이지 도메인 REST API 개발과 폼 검증을 담당했고, 팀 전체 기능이었던 회원 탈퇴·삭제 정책과 중복 검사, 인증 관련 버그 수정에도 참여했습니다.",
        action:
          "내 프로필 조회/수정, 프로필 이미지 업로드(Cloudinary 연동), 내 모집글·참여 프로젝트·신청 현황 조회, 회원 탈퇴 API를 UserController/UserService로 구현했습니다. 이메일·닉네임·전화번호 중복 확인 API를 회원가입과 마이페이지 양쪽에서 재사용 가능하도록 만들었고, 탈퇴 회원도 검사 대상에 포함되도록 처리했습니다. 회원 탈퇴, 모집글, 게시글, 댓글, 멤버 삭제를 하드 삭제 대신 BaseEntity에 deletedAt 필드와 softDelete()/isDeleted()를 추가하는 방식으로 전환해, User/Project/Application/BoardPost/Comment/ProjectMember 등 여러 엔티티와 Repository 쿼리에 일괄 반영했습니다. 이 과정에서 발생한 탈퇴 회원의 게시글 조회 500 에러, 프로젝트 통합 검색 시 기술 스택 필터링 누락 등의 버그도 직접 찾아 수정했습니다.",
        result:
          "백엔드 저장소에 69개 커밋을 기여하며 유저 도메인 API와 소프트 삭제 정책을 담당 영역으로 완성했습니다. 소프트 삭제 전환은 5개 이상 엔티티와 다수 Repository에 걸친 변경이었지만 팀 전체 삭제 정책을 하나의 기준으로 통일해, 이후 게시판·댓글·프로젝트 멤버 기능에서 데이터 복구와 탈퇴 회원 처리를 일관되게 다룰 수 있게 만들었습니다.",
      },
    },
    {
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
      star: {
        situation:
          "결제 서비스 특성상 가상계좌번호, 계좌 상태, 결제 금액처럼 위·변조되면 안 되는 민감한 데이터를 다뤄야 했고, 5인 팀이 사용자/보안/판매자/인프라 영역을 나눠 하나의 결제 흐름으로 연결해야 하는 구조였습니다.",
        task:
          "사용자 대시보드의 상품 주문·결제 이력 화면과 입금 시뮬레이터를 담당했고, 계좌번호·금액 검증 로직, 판매자의 결제 승인 관리, 입금대기·결제완료 상태 전이, 관리자 대시보드의 시스템 현황·계정 조회·보안 감사 기능을 맡았습니다.",
        action:
          "PaymentController에 가상계좌 발급(/issue), 입금 완료 보고(/report-deposit), 판매자 승인(/approve), 만료 처리(/expire) API를 구현하고, 판매자별 결제 목록 조회와 승인 흐름을 연결했습니다. 입금 시뮬레이터(SimulatorController → checkSimulationLogic)에서는 실제 DB 변경 없이 요청자 이메일이 계좌 소유자와 일치하는지, 계좌 상태가 ACTIVE인지, 요청 금액이 주문 금액과 일치하는지를 순서대로 검증해 SUCCESS/FAIL 케이스를 나눠 응답하도록 만들었고, 이메일이 다른 경우는 403으로 별도 처리했습니다. 관리자 대시보드에서는 전체 시스템 현황과 계정 조회, 보안 감사 API 연동을 담당했습니다.",
        result:
          "결제 상태 전이(발급→입금대기→승인→만료)와 검증 로직을 분리해, 실제 결제를 트리거하지 않고도 성공/실패/지연 케이스를 시뮬레이터로 테스트할 수 있는 구조를 만들었습니다. 이를 통해 팀 전체가 계좌번호 마스킹, Soft Delete 등 보안 요구사항을 만족하는 결제 흐름을 하나의 서비스로 완성했습니다.",
      },
    },
    {
      title: "ARGUS × Onde - AI 기반 웹 취약점 자동 진단",
      category: "Security",
      period: "2024.06.09 ~ 2024.06.19",
      description:
        "AI 기반 웹 취약점 자동 진단 플랫폼 ARGUS와, 그 진단 대상으로 직접 구축한 항공·숙박·렌터카 통합 예약 서비스 Onde를 함께 진행한 프로젝트입니다. 수동 진단과 ARGUS 자동 진단 결과를 비교하며 자동화 도구의 실효성을 검증했습니다.",
      stack: ["Python", "FastAPI", "OWASP ZAP", "Selenium", "React", "Spring Boot", "MariaDB"],
      features: [
        "XSS/CSRF 자동 진단(1-1) — 파라미터 퍼징, CSRF 토큰·SameSite 쿠키 검증, 위험 요청 스킵 안전장치",
        "공격 재현 스크린샷 캡처 엔진 — Selenium 기반으로 취약점 증적 화면 확보",
        "일반계정 권한 상승 자동 진단(4-5) — 수직 권한 상승, IDOR(수평 권한 상승), Mass Assignment 3종 검사",
        "진단 대상 서비스 Onde — 항공권/숙소/렌터카 예약, 결제·정산, 관리자 백오피스를 갖춘 실사용 수준 웹 서비스",
      ],
      links: [
        { label: "ARGUS", url: "https://github.com/UR-ARGUS" },
        { label: "Onde", url: "https://github.com/UR-VULN" },
      ],
      star: {
        situation:
          "AI 기반 자동 취약점 진단 도구가 실제로 신뢰할 만한지 검증하려면 단순한 예제 앱이 아니라 실제 서비스 수준의 복잡도를 가진 타겟이 필요했습니다. 그래서 항공·숙박·렌터카를 아우르는 여행 예약 플랫폼 Onde를 직접 구축한 뒤, 이를 대상으로 사람이 직접 진단하는 방식과 ARGUS의 자동 진단 방식을 나란히 검증하는 프로젝트를 진행했습니다.",
        task:
          "ARGUS의 진단 모듈 중 1-1(XSS/CSRF)과 4-5(일반계정 권한 상승) 모듈을 엔진 구현부터 프론트 연동까지 담당했고, 취약점이 실제로 재현되는지 증적을 남기는 스크린샷 캡처 엔진도 함께 개발했습니다.",
        action:
          "1-1 모듈에서는 파라미터를 하나씩 변조해 반응을 관찰하는 방식으로 Reflected/Stored XSS를 탐지하고, Origin/Referer 검증·CSRF 토큰·SameSite 쿠키 설정을 확인해 CSRF 위험을 판정했습니다. DELETE나 승인/반려 같은 상태 변경 요청은 스캔 대상에서 제외하는 안전장치를 넣었고, Selenium 기반 캡처 엔진으로 실제 공격이 재현되는 화면을 스크린샷으로 남겨 리포트에 첨부했습니다. 4-5 모듈은 테스트 계정 두 개(A/B)를 이용해 수직 권한 상승(일반 계정 토큰으로 관리자 API 직접 호출), 수평 권한 상승/IDOR(B 소유 자원 id를 A 토큰으로 접근), Mass Assignment(role 파라미터 주입 후 응답 반영 여부 확인) 3단계를 실제 HTTP 요청으로 검증하도록 설계했습니다. 개발 중 IDOR 판정 로직을 응답 스키마 사전 비교 방식에서, 사전 판단 없이 일단 요청해본 뒤 상대방 정보가 응답에 새로 나타났는지만으로 판정하는 방식으로 전면 리팩터링했고, 토큰 인증만 지원하던 구조를 헤더 기반으로 일반화해 쿠키 세션 인증도 함께 지원하도록 확장했습니다.",
        result:
          "두 진단 모듈 모두 오탐을 줄이는 안전장치(공개 자원 필터링, 응답 반영 여부 재확인, 수동 검증 안내)를 갖춘 채로 ARGUS 플랫폼에 통합했고, 직접 구축한 Onde 서비스에 실제 적용해 자동 진단 결과와 수동 진단 결과를 비교 검증했습니다. 이 과정에서 자동화 도구가 어디까지 확신할 수 있고 어디서부터 사람의 수동 확인이 필요한지 기준을 세울 수 있었습니다.",
      },
    },
  ];

  return (
    <>
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
          <h1>안녕하세요,<br />백엔드 개발자 홍지호입니다.</h1>
          <p>
            주로 Node.js와 Spring Boot를 사용합니다. 코드 한 줄보다 그 코드가
            서비스와 사용자에게 미치는 영향을 더 중요하게 생각하며 개발하고 있습니다.
          </p>
        </section>

        {/* Introduce Section */}
        <section id="introduce" className="section">
          <div className="section-header">
            <span className="section-label">Introduce</span>
            <h2 className="section-title">기본기를 중요하게 생각합니다.</h2>
          </div>

          <div className="profile-container">
            <div className="profile-top">
              <div className="profile-image-wrapper">
                <Image src="/profile.jpg" alt="Profile" width={180} height={180} className="profile-image" />
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  <h3>홍지호 <span>(Jiho Hong)</span></h3>
                </div>
                <p className="profile-title">from Backend Developer to Product Engineer</p>

                <div className="profile-links">
                  <a href="mailto:wlgh5148@naver.com"><Mail size={16} /> wlgh5148@naver.com</a>
                  <a href="https://github.com/hongjiho5148"><Github size={16} /> @hongjiho</a>
                </div>
              </div>
            </div>
          </div>

          <div className="intro-content mt-8">
            <p>
              코드를 만드는 것도 중요하지만, 왜 이렇게 작성했는지 동료들에게 설명할 수 있는 코드를 지향합니다.
              서비스의 트래픽이나 데이터가 늘어났을 때 발생할 수 있는 문제들을 미리 예상하고 대비하는 것을 좋아하며,
              유지보수하기 좋은 구조를 만드는 것에 관심이 많습니다.
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
              const Icon = group.icon;
              return (
                <div className="skill-card" key={group.title}>
                  <div className="skill-icon"><Icon size={22} /></div>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>
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
              <button
                type="button"
                className="project-card"
                key={project.title}
                onClick={() => setActiveProject(project)}
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
                  <span className="project-more">STAR 상세 보기 →</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Hong Jiho. Backend Developer Portfolio</p>
      </footer>

      {activeProject && (
        <div
          className="modal-overlay"
          onClick={() => setActiveProject(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="닫기"
            >
              <X size={20} />
            </button>

            <div className="modal-meta">
              <span className="project-category">{activeProject.category}</span>
              <span className="project-period"><Clock size={12} /> {activeProject.period}</span>
            </div>
            <h2 className="modal-title">{activeProject.title}</h2>
            <p className="modal-desc">{activeProject.description}</p>

            <div className="modal-section">
              <h3 className="modal-section-title"><ListChecks size={16} /> 주요 기능</h3>
              <ul className="modal-feature-list">
                {activeProject.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3 className="modal-section-title"><Wrench size={16} /> 주요 기술</h3>
              <div className="modal-stack">
                {activeProject.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <h3 className="modal-section-title star-section-title">STAR 회고</h3>
            <div className="star-list">
              {[
                { label: "S", title: "Situation", text: activeProject.star.situation },
                { label: "T", title: "Task", text: activeProject.star.task },
                { label: "A", title: "Action", text: activeProject.star.action },
                { label: "R", title: "Result", text: activeProject.star.result },
              ].map((item) => (
                <div className="star-item" key={item.label}>
                  <div className="star-badge">{item.label}</div>
                  <div className="star-body">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-links">
              {activeProject.links.map((link) => (
                <a
                  key={link.url}
                  className="modal-github-link"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} /> {link.label} 레포지토리 보기
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
