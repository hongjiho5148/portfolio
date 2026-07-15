import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Hong Jiho Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-detail-main">
      <Link href="/#project" className="project-back-link">
        ← 프로젝트 목록으로
      </Link>

      <section className="project-detail-hero">
        <div className="project-detail-meta">
          <span className="project-category">{project.category}</span>
          <span className="project-period">
            {project.period}
          </span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </section>

      {project.media && (
        <div className="project-detail-media">
          {project.media.type === "video" ? (
            <video src={project.media.src} autoPlay loop muted playsInline />
          ) : (
            <img src={project.media.src} alt={`${project.title} 대표 화면`} />
          )}
        </div>
      )}

      <section className="project-detail-section">
        <h2>프로젝트 개요</h2>
        <p className="project-detail-description">{project.description}</p>
      </section>

      <section className="project-detail-section">
        <h2>기술 스택</h2>
        <div className="detail-stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="project-detail-section">
        <h2>주요 기능</h2>
        <ul className="detail-feature-list">
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="project-detail-section">
        <h2>내가 맡은 역할</h2>
        <div className="detail-contribution-list">
          {project.contributions.map((contribution) => (
            <article className="detail-contribution-card" key={contribution.title}>
              <div className="detail-contribution-head">
                <h3>{contribution.title}</h3>
                <div className="contribution-tech">
                  {contribution.tech.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <ul className="contribution-points">
                {contribution.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="project-detail-section">
        <h2>관련 링크</h2>
        <div className="detail-links">
          {project.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label} 레포지토리
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
