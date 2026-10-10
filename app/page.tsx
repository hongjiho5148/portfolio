import Image from 'next/image';
import Link from 'next/link';
import { Mail, Github, Server, Database, Cpu, GitBranch, Film, Clock } from 'lucide-react';
import CursorGlow from './CursorGlow';
import { projects } from './projects/data';

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
      title: "Collaboration",
      icon: GitBranch,
      text: "feature 브랜치와 PR 기반 협업, 팀 단위 REST API 컨벤션 정립",
      items: ["Git", "GitHub", "REST API 설계", "Code Review"],
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
