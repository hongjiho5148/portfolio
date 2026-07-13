"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Github, X, Server, Database, Cpu, Cloud, GitBranch } from 'lucide-react';

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

type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  links: RepoLink[];
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
      description:
        "CU, GS25, 7-Eleven, emart24의 행사 상품 데이터를 수집·정제하여 가격과 혜택을 비교하고, 예산에 맞는 상품 조합을 추천하는 Streamlit 기반 대시보드입니다. 6인 팀 프로젝트로 진행했습니다.",
      stack: ["Python", "Streamlit", "Pandas", "BeautifulSoup4"],
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
      description:
        "기술 스택과 포지션 기반으로 팀원을 모집·지원하고, 프로젝트별 게시판에서 소통할 수 있는 협업 플랫폼입니다. 백엔드 3명, 프론트엔드 2명, 풀스택 1명으로 구성된 6인 팀 프로젝트에서 백엔드를 담당했습니다.",
      stack: ["Java 17", "Spring Boot", "Spring Security", "JWT", "JPA", "MariaDB"],
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
      description:
        "보안 격리 기반 가상계좌 결제 시스템으로, 가상계좌 발급부터 입금 검증, 판매자 정산 대시보드, 관리자 보안 모니터링까지 연결한 결제 서비스입니다. 5인 팀에서 사용자·판매자·관리자 대시보드를 담당했습니다.",
      stack: ["Java 17", "Spring Boot", "Redis", "MySQL", "React", "AWS", "Terraform"],
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
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <span className="project-more">STAR 상세 보기 →</span>
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

            <span className="project-category">{activeProject.category}</span>
            <h2 className="modal-title">{activeProject.title}</h2>
            <p className="modal-desc">{activeProject.description}</p>

            <div className="modal-stack">
              {activeProject.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

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
