import type { Troubleshooting, TsPoint } from "./data";
import { BeforeAfterChart, figures, figureTitles } from "./figures";

const PROBLEM_LABELS = ["문제", "원인", "발견"];
const SOLUTION_LABELS = ["해결", "검증", "추가 발견", "분산 환경의 틈", "보상", "설계 포인트", "트레이드오프"];

type Sections = { problem: TsPoint[]; solution: TsPoint[]; result: TsPoint[] };

function getSections(item: Troubleshooting): Sections {
  if (item.problem || item.solution || item.result) {
    return { problem: item.problem ?? [], solution: item.solution ?? [], result: item.result ?? [] };
  }
  const sections: Sections = { problem: [], solution: [], result: [] };
  for (const row of item.rows ?? []) {
    const point = { lead: row.label, text: row.text };
    if (PROBLEM_LABELS.includes(row.label)) sections.problem.push(point);
    else if (SOLUTION_LABELS.includes(row.label)) sections.solution.push(point);
    else sections.result.push(point);
  }
  return sections;
}

function PointList({ points }: { points: TsPoint[] }) {
  return (
    <ul className="ts-points">
      {points.map((point) => (
        <li key={(point.lead ?? "") + point.text}>
          {point.lead && <b>{point.lead}</b>}
          {point.text}
        </li>
      ))}
    </ul>
  );
}

export default function TroubleshootingCard({ item, index }: { item: Troubleshooting; index: number }) {
  const sections = getSections(item);
  const Figure = item.figure ? figures[item.figure] : null;

  return (
    <article className="ts-card" id={`ts-${index}`}>
      <header className="ts-head">
        <div className="ts-head-top">
          <span className="ts-num">{index}</span>
          <span className="troubleshooting-tag">{item.tag}</span>
        </div>
        <h3>{item.title}</h3>
        {item.headline && (
          <div className="ts-headline">
            <span className="ts-headline-label">{item.headline.label}</span>
            <span className="ts-headline-values">
              <span className="ts-before">{item.headline.before}</span>
              <span className="ts-arrow">→</span>
              <span className="ts-after">{item.headline.after}</span>
            </span>
          </div>
        )}
      </header>

      {(Figure || item.chart) && (
        <div className="ts-figures">
          {Figure && item.figure && (
            <figure className="ts-figure">
              <figcaption>{figureTitles[item.figure]}</figcaption>
              <Figure />
            </figure>
          )}
          {item.chart && (
            <figure className="ts-figure">
              <figcaption>{item.chart.title}</figcaption>
              <BeforeAfterChart items={item.chart.items} />
              <div className="ts-legend">
                <span><i className="ts-dot-before" />변경 전</span>
                <span><i className="ts-dot-after" />변경 후</span>
              </div>
            </figure>
          )}
        </div>
      )}

      <div className="ts-sections">
        {sections.problem.length > 0 && (
          <section className="ts-section ts-problem">
            <h4>문제 원인</h4>
            <PointList points={sections.problem} />
          </section>
        )}
        {sections.solution.length > 0 && (
          <section className="ts-section ts-solution">
            <h4>해결 과정</h4>
            <PointList points={sections.solution} />
          </section>
        )}
        {sections.result.length > 0 && (
          <section className="ts-section ts-result">
            <h4>결과</h4>
            <PointList points={sections.result} />
            {item.conditions && (
              <p className="ts-conditions">
                <b>테스트 조건</b>
                {item.conditions}
              </p>
            )}
          </section>
        )}
      </div>
    </article>
  );
}
