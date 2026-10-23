import type { ReactNode } from "react";
import type { ChartItem, FigureKey } from "./data";

// 자동 생성: 트러블슈팅 구조도 (PDF 포트폴리오와 같은 그림)

export function NginxFigure() {
  return (
    <svg viewBox="0 0 592 262" className="ts-svg" role="img" aria-label="NginxFigure">
  <defs>
    <marker id="a1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#111"/></marker>
    <marker id="a1r" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#c0392b"/></marker>
    <marker id="a1g" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#0f6b3a"/></marker>
  </defs>
  <text x="0" y="14" fontSize="13" fontWeight="800" fill="#c0392b">변경 전</text>
  <rect x="0" y="26" width="92" height="42" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="46" y="52" textAnchor="middle" fontSize="13" fontWeight="700">k6 1000 VU</text>
  <rect x="150" y="26" width="92" height="42" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="196" y="52" textAnchor="middle" fontSize="13" fontWeight="700">nginx</text>
  <rect x="470" y="26" width="110" height="42" rx="9" fill="#000"/><text x="525" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">gateway</text>
  <line x1="92" y1="47" x2="150" y2="47" stroke="#111" strokeWidth="1.5" markerEnd="url(#a1)"/>
  <line x1="242" y1="47" x2="470" y2="47" stroke="#c0392b" strokeWidth="2" markerEnd="url(#a1r)"/>
  <text x="356" y="38" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c0392b">요청마다 새 TCP 연결</text>
  <text x="356" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c0392b">→ 임시 포트 고갈</text>

  <line x1="0" y1="92" x2="592" y2="92" stroke="#c9ccd8" strokeDasharray="4 4"/>
  <text x="0" y="112" fontSize="13" fontWeight="800" fill="#0f6b3a">변경 후</text>
  <rect x="0" y="124" width="92" height="40" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="46" y="149" textAnchor="middle" fontSize="13" fontWeight="700">nginx :80</text>
  <rect x="470" y="124" width="110" height="40" rx="9" fill="#000"/><text x="525" y="149" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">gateway</text>
  <line x1="92" y1="144" x2="470" y2="144" stroke="#0f6b3a" strokeWidth="2" markerEnd="url(#a1g)"/>
  <text x="281" y="137" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0f6b3a">고정 IP + 정적 upstream + keepalive (연결 재사용)</text>
  <text x="281" y="160" textAnchor="middle" fontSize="11" fill="#555">gateway는 스케일하지 않는 단일 컨테이너</text>

  <rect x="0" y="190" width="92" height="40" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="46" y="215" textAnchor="middle" fontSize="13" fontWeight="700">nginx :8081</text>
  <rect x="440" y="182" width="140" height="18" rx="5" fill="#fff" stroke="#111" strokeWidth="1.3"/><text x="510" y="195" textAnchor="middle" fontSize="11.5" fontWeight="700">backend #1</text>
  <rect x="440" y="204" width="140" height="18" rx="5" fill="#fff" stroke="#111" strokeWidth="1.3"/><text x="510" y="217" textAnchor="middle" fontSize="11.5" fontWeight="700">backend #2</text>
  <rect x="440" y="226" width="140" height="18" rx="5" fill="#fff" stroke="#111" strokeWidth="1.3"/><text x="510" y="239" textAnchor="middle" fontSize="11.5" fontWeight="700">backend #3</text>
  <line x1="92" y1="210" x2="440" y2="210" stroke="#0f6b3a" strokeWidth="2" markerEnd="url(#a1g)"/>
  <text x="266" y="203" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0f6b3a">resolve(5초마다 재조회) + keepalive</text>
  <text x="266" y="226" textAnchor="middle" fontSize="11" fill="#555">스케일되는 backend는 레플리카 변화를 따라감</text>
    </svg>
  );
}

export function LatePayFigure() {
  return (
    <svg viewBox="0 0 592 388" className="ts-svg" role="img" aria-label="LatePayFigure">
  <defs>
    <marker id="a2" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#111"/></marker>
    <marker id="a2r" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#c0392b"/></marker>
    <marker id="a2g" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#0f6b3a"/></marker>
  </defs>
  <text x="0" y="14" fontSize="13" fontWeight="800">상황: 결제창이 열려 있는 동안 5분 홀드가 만료됨</text>
  <rect x="0" y="26" width="110" height="46" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="55" y="46" textAnchor="middle" fontSize="12" fontWeight="700">① 사용자 A</text><text x="55" y="62" textAnchor="middle" fontSize="12" fontWeight="700">좌석 홀드</text>
  <rect x="160" y="26" width="110" height="46" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="215" y="46" textAnchor="middle" fontSize="12" fontWeight="700">② 홀드 만료</text><text x="215" y="62" textAnchor="middle" fontSize="12" fontWeight="700">(A 결제 진행 중)</text>
  <rect x="320" y="26" width="110" height="46" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="375" y="46" textAnchor="middle" fontSize="12" fontWeight="700">③ 사용자 B가</text><text x="375" y="62" textAnchor="middle" fontSize="12" fontWeight="700">같은 좌석 홀드</text>
  <rect x="480" y="26" width="112" height="46" rx="9" fill="#000"/><text x="536" y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">④ A의 결제</text><text x="536" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">뒤늦게 완료</text>
  <line x1="110" y1="49" x2="160" y2="49" stroke="#111" strokeWidth="1.5" markerEnd="url(#a2)"/>
  <line x1="270" y1="49" x2="320" y2="49" stroke="#111" strokeWidth="1.5" markerEnd="url(#a2)"/>
  <line x1="430" y1="49" x2="480" y2="49" stroke="#111" strokeWidth="1.5" markerEnd="url(#a2)"/>

  <text x="0" y="122" fontSize="13" fontWeight="800" fill="#c0392b">변경 전</text>
  <rect x="0" y="132" width="170" height="50" rx="9" fill="#fff" stroke="#c0392b" strokeWidth="1.6"/><text x="85" y="153" textAnchor="middle" fontSize="12" fontWeight="700">홀드 유효성 확인 없이</text><text x="85" y="169" textAnchor="middle" fontSize="12" fontWeight="700">confirm / sell 무조건 실행</text>
  <rect x="210" y="132" width="150" height="50" rx="9" fill="#fff" stroke="#c0392b" strokeWidth="1.6"/><text x="285" y="153" textAnchor="middle" fontSize="12" fontWeight="700">A가 B의 홀드 좌석을</text><text x="285" y="169" textAnchor="middle" fontSize="12" fontWeight="700">판매 처리</text>
  <rect x="400" y="132" width="192" height="50" rx="9" fill="#fff" stroke="#c0392b" strokeWidth="1.6"/><text x="496" y="153" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c0392b">B도 결제하면 한 좌석에</text><text x="496" y="169" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c0392b">PAID 주문 2건 (QR 2장)</text>
  <line x1="170" y1="157" x2="210" y2="157" stroke="#c0392b" strokeWidth="1.8" markerEnd="url(#a2r)"/>
  <line x1="360" y1="157" x2="400" y2="157" stroke="#c0392b" strokeWidth="1.8" markerEnd="url(#a2r)"/>

  <line x1="0" y1="204" x2="592" y2="204" stroke="#c9ccd8" strokeDasharray="4 4"/>
  <text x="0" y="226" fontSize="13" fontWeight="800" fill="#0f6b3a">변경 후</text>
  <rect x="0" y="236" width="170" height="50" rx="9" fill="#fff" stroke="#0f6b3a" strokeWidth="1.6"/><text x="85" y="257" textAnchor="middle" fontSize="12" fontWeight="700">좌석 락 안에서 sell(</text><text x="85" y="273" textAnchor="middle" fontSize="12" fontWeight="700">seat, holdExpireAt) 검증</text>
  <rect x="210" y="236" width="150" height="50" rx="9" fill="#fff" stroke="#0f6b3a" strokeWidth="1.6"/><text x="285" y="257" textAnchor="middle" fontSize="12" fontWeight="700">홀드가 끝났으면</text><text x="285" y="273" textAnchor="middle" fontSize="12" fontWeight="700">410 SEAT_HOLD_LOST</text>
  <rect x="400" y="236" width="192" height="50" rx="9" fill="#000"/><text x="496" y="257" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">혜택 복구 → PortOne 환불</text><text x="496" y="273" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">→ 예약 취소 → 주문 실패</text>
  <line x1="170" y1="261" x2="210" y2="261" stroke="#0f6b3a" strokeWidth="1.8" markerEnd="url(#a2g)"/>
  <line x1="360" y1="261" x2="400" y2="261" stroke="#0f6b3a" strokeWidth="1.8" markerEnd="url(#a2g)"/>

  <text x="0" y="316" fontSize="12.5" fontWeight="800">실패 유형에 따라 처리를 나눔</text>
  <rect x="0" y="324" width="288" height="54" rx="9" fill="#fff" stroke="#111" strokeWidth="1.3"/><text x="10" y="344" fontSize="12" fontWeight="800">확정적 실패 (홀드 만료)</text><text x="10" y="362" fontSize="11.5">좌석을 잃었다는 증거가 있을 때만 환불</text>
  <rect x="304" y="324" width="288" height="54" rx="9" fill="#fff" stroke="#111" strokeWidth="1.3"/><text x="314" y="344" fontSize="12" fontWeight="800">일시 장애 (네트워크 등)</text><text x="314" y="362" fontSize="11.5">환불하지 않고 PENDING 유지, 같은 결제 id로 재시도</text>
    </svg>
  );
}

export function SafepayLockFigure() {
  return (
    <svg viewBox="0 0 592 330" className="ts-svg" role="img" aria-label="SafepayLockFigure">
  <defs>
    <marker id="a3" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#111"/></marker>
    <marker id="a3r" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#c0392b"/></marker>
    <marker id="a3g" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#0f6b3a"/></marker>
  </defs>
  <text x="0" y="14" fontSize="12.5" fontWeight="800">결제 상태 전이</text>
  <rect x="0" y="22" width="92" height="30" rx="15" fill="#000"/><text x="46" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">입금대기</text>
  <rect x="130" y="22" width="102" height="30" rx="15" fill="#000"/><text x="181" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">입금확인</text>
  <rect x="270" y="22" width="92" height="30" rx="15" fill="#000"/><text x="316" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">승인</text>
  <rect x="400" y="22" width="80" height="30" rx="15" fill="#fff" stroke="#111" strokeWidth="1.4"/><text x="440" y="42" textAnchor="middle" fontSize="12" fontWeight="700">취소</text>
  <rect x="496" y="22" width="80" height="30" rx="15" fill="#fff" stroke="#111" strokeWidth="1.4"/><text x="536" y="42" textAnchor="middle" fontSize="12" fontWeight="700">만료</text>
  <line x1="92" y1="37" x2="130" y2="37" stroke="#111" strokeWidth="1.5" markerEnd="url(#a3)"/>
  <line x1="232" y1="37" x2="270" y2="37" stroke="#111" strokeWidth="1.5" markerEnd="url(#a3)"/>
  <text x="400" y="68" fontSize="11" fill="#555">승인 전에는 취소·만료로 전환</text>

  <text x="0" y="84" fontSize="13" fontWeight="800" fill="#c0392b">락 없음 — 같은 결제 건에 승인(판매자)과 취소(구매자)가 동시에 도착</text>
  <rect x="0" y="94" width="130" height="44" rx="9" fill="#fff" stroke="#c0392b" strokeWidth="1.5"/><text x="65" y="114" textAnchor="middle" fontSize="12" fontWeight="700">둘 다 "입금대기"로</text><text x="65" y="129" textAnchor="middle" fontSize="12" fontWeight="700">읽음</text>
  <rect x="170" y="94" width="130" height="44" rx="9" fill="#fff" stroke="#c0392b" strokeWidth="1.5"/><text x="235" y="114" textAnchor="middle" fontSize="12" fontWeight="700">둘 다 각자 상태를</text><text x="235" y="129" textAnchor="middle" fontSize="12" fontWeight="700">저장</text>
  <rect x="340" y="94" width="252" height="44" rx="9" fill="#fff" stroke="#c0392b" strokeWidth="1.5"/><text x="466" y="114" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c0392b">둘 다 200, 최종 상태가 어긋남</text><text x="466" y="129" textAnchor="middle" fontSize="11.5" fill="#c0392b">(50라운드 중 26라운드)</text>
  <line x1="130" y1="116" x2="170" y2="116" stroke="#c0392b" strokeWidth="1.8" markerEnd="url(#a3r)"/>
  <line x1="300" y1="116" x2="340" y2="116" stroke="#c0392b" strokeWidth="1.8" markerEnd="url(#a3r)"/>

  <line x1="0" y1="160" x2="592" y2="160" stroke="#c9ccd8" strokeDasharray="4 4"/>
  <text x="0" y="182" fontSize="13" fontWeight="800" fill="#0f6b3a">@Version 낙관적 락 — 저장 시점에 버전을 비교</text>
  <rect x="0" y="192" width="130" height="44" rx="9" fill="#fff" stroke="#0f6b3a" strokeWidth="1.5"/><text x="65" y="212" textAnchor="middle" fontSize="12" fontWeight="700">둘 다 version N을</text><text x="65" y="227" textAnchor="middle" fontSize="12" fontWeight="700">읽음</text>
  <rect x="170" y="192" width="130" height="44" rx="9" fill="#fff" stroke="#0f6b3a" strokeWidth="1.5"/><text x="235" y="212" textAnchor="middle" fontSize="12" fontWeight="700">먼저 저장한 쪽만</text><text x="235" y="227" textAnchor="middle" fontSize="12" fontWeight="700">성공 (N → N+1)</text>
  <rect x="340" y="192" width="252" height="44" rx="9" fill="#000"/><text x="466" y="212" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">늦은 쪽은 버전 불일치</text><text x="466" y="227" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">→ 409 응답, 불일치 0라운드</text>
  <line x1="130" y1="214" x2="170" y2="214" stroke="#0f6b3a" strokeWidth="1.8" markerEnd="url(#a3g)"/>
  <line x1="300" y1="214" x2="340" y2="214" stroke="#0f6b3a" strokeWidth="1.8" markerEnd="url(#a3g)"/>

  <text x="0" y="268" fontSize="12.5" fontWeight="800">락 적용 후에도 500이 나오던 예외 경로</text>
  <rect x="0" y="276" width="288" height="44" rx="9" fill="#fff" stroke="#111" strokeWidth="1.3"/><text x="10" y="294" fontSize="11.5" fontWeight="800">유니크 제약 위반 (동시 승인 20개)</text><text x="10" y="310" fontSize="11">DataIntegrityViolationException</text>
  <rect x="304" y="276" width="288" height="44" rx="9" fill="#fff" stroke="#111" strokeWidth="1.3"/><text x="314" y="294" fontSize="11.5" fontWeight="800">DB 데드락 (승인 vs 취소 경합)</text><text x="314" y="310" fontSize="11">ConcurrencyFailureException → 모두 409로 매핑</text>
    </svg>
  );
}

export function SafepayN1Figure() {
  return (
    <svg viewBox="0 0 592 214" className="ts-svg" role="img" aria-label="SafepayN1Figure">
  <defs>
    <marker id="a4" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#111"/></marker>
    <marker id="a4r" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#c0392b"/></marker>
    <marker id="a4g" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#0f6b3a"/></marker>
  </defs>
  <text x="0" y="14" fontSize="13" fontWeight="800" fill="#c0392b">변경 전 — 결제 45건 조회에 SELECT 51개</text>
  <rect x="0" y="24" width="110" height="46" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="55" y="44" textAnchor="middle" fontSize="12" fontWeight="700">판매자 결제</text><text x="55" y="60" textAnchor="middle" fontSize="12" fontWeight="700">목록 조회</text>
  <rect x="170" y="24" width="110" height="46" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="225" y="44" textAnchor="middle" fontSize="12" fontWeight="700">payment</text><text x="225" y="60" textAnchor="middle" fontSize="12" fontWeight="700">SELECT 1회</text>
  <rect x="340" y="14" width="252" height="26" rx="7" fill="#fff" stroke="#c0392b" strokeWidth="1.4"/><text x="466" y="32" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#c0392b">결제마다 virtualAccount 개별 조회</text>
  <rect x="340" y="46" width="252" height="26" rx="7" fill="#fff" stroke="#c0392b" strokeWidth="1.4"/><text x="466" y="64" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#c0392b">회원(member) 조회</text>
  <line x1="110" y1="47" x2="170" y2="47" stroke="#111" strokeWidth="1.5" markerEnd="url(#a4)"/>
  <line x1="280" y1="47" x2="340" y2="30" stroke="#c0392b" strokeWidth="1.6" markerEnd="url(#a4r)"/>
  <line x1="280" y1="47" x2="340" y2="59" stroke="#c0392b" strokeWidth="1.6" markerEnd="url(#a4r)"/>
  <text x="0" y="96" fontSize="11.5" fill="#555">원인: virtualAccount(@OneToOne mappedBy, 기본 EAGER)와 member를 결제마다 따로 조회</text>

  <line x1="0" y1="112" x2="592" y2="112" stroke="#c9ccd8" strokeDasharray="4 4"/>
  <text x="0" y="134" fontSize="13" fontWeight="800" fill="#0f6b3a">변경 후 — 585건을 조회해도 SELECT 1개</text>
  <rect x="0" y="146" width="110" height="46" rx="9" fill="#fff" stroke="#111" strokeWidth="1.5"/><text x="55" y="166" textAnchor="middle" fontSize="12" fontWeight="700">판매자 결제</text><text x="55" y="182" textAnchor="middle" fontSize="12" fontWeight="700">목록 조회</text>
  <rect x="170" y="146" width="422" height="46" rx="9" fill="#000"/><text x="381" y="166" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">payment JOIN member JOIN virtual_account</text><text x="381" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">@EntityGraph(member, virtualAccount)로 한 번에 조회</text>
  <line x1="110" y1="169" x2="170" y2="169" stroke="#0f6b3a" strokeWidth="1.8" markerEnd="url(#a4g)"/>
    </svg>
  );
}

export function BeforeAfterChart({ items }: { items: ChartItem[] }) {
  const w = 592;
  const h = 160;
  const gw = w / items.length;
  const base = h - 52;
  const maxh = base - 34;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="ts-svg" role="img" aria-label="변경 전후 비교 그래프">
      {items.map((it, i) => {
        const cx = gw * i + gw / 2;
        const m = Math.max(it.before, it.after);
        const hb = Math.max(3, (maxh * it.before) / m);
        const ha = Math.max(3, (maxh * it.after) / m);
        const bw = 40;
        return (
          <g key={it.label}>
            <rect x={cx - bw - 4} y={base - hb} width={bw} height={hb} rx={4} fill="#a9aec0" />
            <rect x={cx + 4} y={base - ha} width={bw} height={ha} rx={4} fill="#111827" />
            <text x={cx - bw / 2 - 4} y={base - hb - 6} textAnchor="middle" fontSize={12} fontWeight={700} fill="#555">
              {it.beforeText}
            </text>
            <text x={cx + bw / 2 + 4} y={base - ha - 6} textAnchor="middle" fontSize={12.5} fontWeight={800}>
              {it.afterText}
            </text>
            <line x1={cx - bw - 12} y1={base} x2={cx + bw + 12} y2={base} stroke="#777" strokeWidth={1} />
            {it.label.split("|").map((ln, j) => (
              <text key={ln} x={cx} y={base + 17 + j * 15} textAnchor="middle" fontSize={12} fontWeight={700}>
                {ln}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export const figures: Record<FigureKey, () => ReactNode> = {
  nginx: NginxFigure,
  latePay: LatePayFigure,
  safepayLock: SafepayLockFigure,
  safepayN1: SafepayN1Figure,
};

export const figureTitles: Record<FigureKey, string> = {
  nginx: "연결 구조: 변경 전 · 후",
  latePay: "결제 흐름: 변경 전 · 후",
  safepayLock: "동시 요청 처리: 락 없음 · 낙관적 락",
  safepayN1: "조회 쿼리 구조: 변경 전 · 후",
};
