import Image from 'next/image';
import { Mail, Github } from 'lucide-react';

export default function Home() {
  const skills = [
    { name: "Node.js", text: "Express 등을 활용한 RESTful API 서버 개발" },
    { name: "Spring Boot", text: "JPA, QueryDSL을 활용한 비즈니스 로직 구현" },
    { name: "Database", text: "MySQL, PostgreSQL 데이터베이스 설계 및 쿼리 작성" },
    { name: "Infra", text: "Docker, AWS를 활용한 배포 및 운영 경험" },
    { name: "Architecture", text: "유지보수를 고려한 계층형 아키텍처 설계" },
    { name: "Tools", text: "Git, GitHub을 통한 코드 리뷰 및 협업" },
  ];

  const projects = [
    {
      title: "포트폴리오 백엔드 서버",
      category: "API Server",
      description:
        "현재 보고 계신 포트폴리오의 이력 및 프로젝트 데이터를 제공하는 API 서버입니다. 정적인 데이터를 프론트에서 분리하여 관리의 편의성을 높였습니다.",
      stack: ["Node.js", "Express", "PostgreSQL"],
    },
    {
      title: "인증 및 권한 모듈",
      category: "Authentication",
      description:
        "JWT와 Redis를 활용하여 로그인 세션 관리 및 역할 기반 권한 검증을 처리하는 공통 모듈입니다. 서비스 확장을 고려하여 결합도를 낮추는 데 집중했습니다.",
      stack: ["Spring Boot", "Redis", "Security"],
    },
    {
      title: "개발 아카이브",
      category: "Web Service",
      description:
        "프로젝트 진행 중 발생한 트러블 슈팅과 학습 기록을 마크다운 형태로 저장하고 검색할 수 있는 서비스입니다.",
      stack: ["Spring Boot", "MySQL", "Docker"],
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
                  <h3>홍지호 <span>(Jiho)</span></h3>
                </div>
                <p className="profile-title">from Backend Developer to Product Engineer</p>
                
                <div className="profile-links">
                  <a href="mailto:hello@example.com"><Mail size={16}/> hello@example.com</a>
                  <a href="https://github.com"><Github size={16}/> @hongjiho</a>
                </div>
              </div>
            </div>
          </div>

          <div className="intro-content mt-8">
            <p>
              단순히 돌아가는 코드를 넘어서, 왜 이렇게 작성했는지 동료들에게 설명할 수 있는 코드를 지향합니다.
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
            {skills.map((skill) => (
              <div className="skill-card" key={skill.name}>
                <h3>{skill.name}</h3>
                <p>{skill.text}</p>
              </div>
            ))}
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
              <div className="project-card" key={project.title}>
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
              </div>
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
