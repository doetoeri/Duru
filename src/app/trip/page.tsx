'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './paper.module.css';

type TripItem = {
  id: string;
  time: string;
  end?: string;
  title: string;
  place: string;
  icon: string;
  fixed?: boolean;
  leaveBefore?: number;
  note?: string;
};

type Expense = {
  id: string;
  name: string;
  amount: number;
  category: string;
  payer: 'me' | 'friend';
  shared: boolean;
  createdAt: number;
};

const TRIP_DATE = '2026-10-02';
const SEOUL_OFFSET = '+09:00';

const schedule: TripItem[] = [
  {
    id: 'lunch',
    time: '12:40',
    end: '13:35',
    title: '점심 + 시험 끝 휴식',
    place: '김포',
    icon: '🍚',
    note: '여기서 밥은 제대로. 서울 가서 굶지 않기.',
  },
  {
    id: 'depart',
    time: '14:00',
    end: '14:35',
    title: '김포공항 출발',
    place: '마곡 한강버스 선착장',
    icon: '🚇',
    leaveBefore: 10,
  },
  {
    id: 'riverbus',
    time: '15:30',
    end: '16:17',
    title: '한강버스',
    place: '마곡 → 여의도',
    icon: '🚢',
    fixed: true,
    leaveBefore: 20,
    note: '고정 일정. 15:30 출항은 밀면 안 됨.',
  },
  {
    id: 'picnic',
    time: '16:50',
    end: '18:15',
    title: '노들섬 피크닉',
    place: '노들섬',
    icon: '🧺',
    leaveBefore: 30,
    note: '아무것도 안 하는 게 일정. 돗자리, 간식, 산책.',
  },
  {
    id: 'festival',
    time: '18:30',
    end: '19:40',
    title: '빛섬축제',
    place: '노들섬',
    icon: '✨',
    fixed: true,
    leaveBefore: 15,
    note: '18:30 개막. 노을에서 야간 조명으로 넘어가는 구간.',
  },
  {
    id: 'dinner',
    time: '19:50',
    end: '20:30',
    title: '저녁',
    place: '노들섬',
    icon: '🍜',
    note: '가볍게 먹고 야간 작품 조금 더 보기.',
  },
  {
    id: 'leave-nodeul',
    time: '20:50',
    end: '21:25',
    title: '남산으로 이동',
    place: '노들섬 → 남산케이블카',
    icon: '🚕',
    leaveBefore: 10,
  },
  {
    id: 'cable',
    time: '21:25',
    end: '21:40',
    title: '남산케이블카',
    place: '남산',
    icon: '🚠',
    leaveBefore: 5,
    note: '마지막 발권 22:30을 절대 안전선으로 취급.',
  },
  {
    id: 'namsan',
    time: '21:40',
    end: '22:20',
    title: '남산 야경',
    place: 'N서울타워 주변',
    icon: '🗼',
    note: '전망대는 생략. 정상부 + 팔각정 + 야경.',
  },
  {
    id: 'home',
    time: '22:35',
    title: '귀가',
    place: '김포 방향',
    icon: '🏠',
  },
];

const categories = ['교통', '식사', '간식', '입장·체험', '기타'];

function atTripTime(time: string) {
  return new Date(`${TRIP_DATE}T${time}:00${SEOUL_OFFSET}`);
}

function fmtClock(date: Date) {
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

function fmtMoney(value: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(value));
}

function minuteDiff(later: Date, earlier: Date) {
  return Math.ceil((later.getTime() - earlier.getTime()) / 60000);
}

export default function TripPage() {
  const [now, setNow] = useState(() => new Date());
  const [delay, setDelay] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState(50000);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [payer, setPayer] = useState<'me' | 'friend'>('me');
  const [shared, setShared] = useState(true);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [notifiedKey, setNotifiedKey] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const storedExpenses = localStorage.getItem('paper-trip-expenses');
      const storedBudget = localStorage.getItem('paper-trip-budget');
      const storedChecklist = localStorage.getItem('paper-trip-checklist');
      const storedDelay = localStorage.getItem('paper-trip-delay');
      if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
      if (storedBudget) setBudget(Number(storedBudget));
      if (storedChecklist) setChecklist(JSON.parse(storedChecklist));
      if (storedDelay) setDelay(Number(storedDelay));
    } catch {
      // Local state is intentionally disposable for a one-day trip.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('paper-trip-expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('paper-trip-budget', String(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('paper-trip-checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('paper-trip-delay', String(delay));
  }, [delay]);

  const effectiveSchedule = useMemo(
    () =>
      schedule.map((item) => {
        const start = atTripTime(item.time);
        const end = item.end ? atTripTime(item.end) : undefined;
        if (!item.fixed && delay) {
          start.setMinutes(start.getMinutes() + delay);
          end?.setMinutes(end.getMinutes() + delay);
        }
        return { ...item, start, end };
      }),
    [delay],
  );

  const current = useMemo(() => {
    const active = effectiveSchedule.find(
      (item) => item.end && now >= item.start && now < item.end,
    );
    if (active) return active;
    return effectiveSchedule.filter((item) => item.start <= now).at(-1);
  }, [effectiveSchedule, now]);

  const next = useMemo(
    () => effectiveSchedule.find((item) => item.start > now),
    [effectiveSchedule, now],
  );

  const departure = useMemo(() => {
    if (!next) return null;
    const leaveAt = new Date(next.start);
    leaveAt.setMinutes(leaveAt.getMinutes() - (next.leaveBefore ?? 10));
    const remaining = minuteDiff(leaveAt, now);

    if (remaining > 20) {
      return {
        tone: 'rest',
        label: '여유로움',
        icon: '😌',
        headline: `여기서 ${remaining}분 더 있어도 돼요`,
        sub: `${fmtClock(leaveAt)}부터 이동 준비`,
      };
    }
    if (remaining > 10) {
      return {
        tone: 'good',
        label: '정상 진행',
        icon: '🟢',
        headline: `${remaining}분 뒤 출발 준비`,
        sub: `${next.title}까지 아직 여유 있음`,
      };
    }
    if (remaining > 0) {
      return {
        tone: 'ready',
        label: '슬슬 정리',
        icon: '🟡',
        headline: `${remaining}분 뒤쯤 출발해야 돼!`,
        sub: `${fmtClock(leaveAt)} 출발 권장`,
      };
    }
    return {
      tone: 'go',
      label: '지금 이동',
      icon: '🔴',
      headline: '지금 출발하세요',
      sub: `${next.title} 시작까지 ${Math.max(0, minuteDiff(next.start, now))}분`,
    };
  }, [next, now]);

  useEffect(() => {
    if (!next || !departure) return;
    const leaveAt = new Date(next.start);
    leaveAt.setMinutes(leaveAt.getMinutes() - (next.leaveBefore ?? 10));
    const remaining = minuteDiff(leaveAt, now);
    const key = `${next.id}-${remaining}`;
    if ((remaining === 10 || remaining === 5 || remaining === 0) && key !== notifiedKey) {
      setNotifiedKey(key);
      if ('vibrate' in navigator) navigator.vibrate(remaining === 0 ? [180, 80, 180] : 120);
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(remaining === 0 ? '지금 출발!' : `${remaining}분 뒤 출발`, {
          body: `${next.title} · ${next.place}`,
        });
      }
    }
  }, [departure, next, notifiedKey, now]);

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const sharedTotal = expenses.filter((item) => item.shared).reduce((sum, item) => sum + item.amount, 0);
  const mySharedPaid = expenses
    .filter((item) => item.shared && item.payer === 'me')
    .reduce((sum, item) => sum + item.amount, 0);
  const friendSharedPaid = expenses
    .filter((item) => item.shared && item.payer === 'friend')
    .reduce((sum, item) => sum + item.amount, 0);
  const target = sharedTotal / 2;
  const friendOwesMe = mySharedPaid - target;
  const budgetRate = Math.min(100, budget > 0 ? (total / budget) * 100 : 0);

  const tripStart = atTripTime('12:40');
  const tripEnd = atTripTime('22:35');
  const tripProgress = Math.max(
    0,
    Math.min(100, ((now.getTime() - tripStart.getTime()) / (tripEnd.getTime() - tripStart.getTime())) * 100),
  );

  const planB = useMemo(() => {
    const localMinutes = Number(
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
        .format(now)
        .split(':')
        .reduce((h, m) => Number(h) * 60 + Number(m), 0),
    );

    const tripDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now) === TRIP_DATE;
    if (!tripDay) return '내일은 15:30 한강버스만 놓치지 않으면 원안 그대로.';
    if (localMinutes < 20 * 60 + 50) return '원안 유지. 노들섬을 서두를 이유 없음.';
    if (localMinutes < 21 * 60 + 20) return '남산은 가능. 야경 체류를 30~40분으로 압축.';
    if (localMinutes < 21 * 60 + 50) return '노들섬 추가 체류는 끝. 남산케이블카로 바로 이동.';
    return '남산 막차 리스크가 큼. 케이블카보다 안전한 귀가를 우선.';
  }, [now]);

  function addExpense(event: FormEvent) {
    event.preventDefault();
    const parsed = Number(amount.replace(/,/g, ''));
    if (!name.trim() || !Number.isFinite(parsed) || parsed <= 0) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        amount: parsed,
        category,
        payer,
        shared,
        createdAt: Date.now(),
      },
    ]);
    setName('');
    setAmount('');
    setExpenseOpen(false);
  }

  async function enableNotifications() {
    if (!('Notification' in window)) return;
    await Notification.requestPermission();
  }

  const checklistItems = ['교통카드', '보조배터리', '얇은 겉옷', '돗자리', '물', '물티슈'];

  return (
    <main className={styles.desk}>
      <div className={styles.grain} aria-hidden="true" />
      <section className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.tape} aria-hidden="true" />
          <p className={styles.kicker}>SEOUL · OCT 02</p>
          <h1>종이 한 장짜리<br />여행 작전판</h1>
          <div className={styles.clock}>{fmtClock(now)}</div>
          <p className={styles.subtitle}>한강버스 · 노들섬 · 남산</p>
          <div className={styles.progressTrack} aria-label="여행 진행률">
            <span style={{ width: `${tripProgress}%` }} />
          </div>
        </header>

        <section className={`${styles.paperCard} ${styles.statusCard} ${departure ? styles[departure.tone] : ''}`}>
          <span className={styles.pin} aria-hidden="true" />
          <div className={styles.statusTop}>
            <span className={styles.statusIcon}>{departure?.icon ?? '🗓️'}</span>
            <div>
              <p className={styles.eyebrow}>지금</p>
              <h2>{current?.title ?? '여행 전'}</h2>
              <p>{current?.place ?? '내일 12:40부터 시작'}</p>
            </div>
          </div>
          {next && departure && (
            <div className={styles.departureNote}>
              <strong>{departure.headline}</strong>
              <span>{departure.sub}</span>
            </div>
          )}
          {next && (
            <div className={styles.nextStrip}>
              <span>다음</span>
              <b>{next.icon} {next.title}</b>
              <time>{fmtClock(next.start)}</time>
            </div>
          )}
          <div className={styles.actionsRow}>
            <button className={styles.paperButton} onClick={enableNotifications}>출발 알림 켜기</button>
            <a className={styles.paperButton} href="https://map.naver.com/p/search/%EB%85%B8%EB%93%A4%EC%84%AC" target="_blank" rel="noreferrer">지도 열기</a>
          </div>
        </section>

        <section className={styles.columns}>
          <div className={`${styles.paperCard} ${styles.timelineCard}`}>
            <div className={styles.tornLabel}>오늘의 흐름</div>
            <div className={styles.timeline}>
              {effectiveSchedule.map((item) => {
                const done = item.end ? now >= item.end : now >= item.start;
                const active = current?.id === item.id;
                return (
                  <div key={item.id} className={`${styles.timelineItem} ${done ? styles.done : ''} ${active ? styles.active : ''}`}>
                    <div className={styles.timeCol}>{fmtClock(item.start)}</div>
                    <div className={styles.dot}>{item.icon}</div>
                    <div className={styles.timelineText}>
                      <strong>{item.title}</strong>
                      <span>{item.place}</span>
                      {item.fixed && <em>고정</em>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.delayBox}>
              <span>현재 체감 지연</span>
              <b>{delay > 0 ? `+${delay}` : delay}분</b>
              <div>
                <button onClick={() => setDelay((v) => Math.max(-30, v - 5))}>−5</button>
                <button onClick={() => setDelay(0)}>0</button>
                <button onClick={() => setDelay((v) => Math.min(90, v + 5))}>+5</button>
                <button onClick={() => setDelay((v) => Math.min(90, v + 10))}>+10</button>
              </div>
              <small>고정 일정은 움직이지 않고, 유동 일정만 밀립니다.</small>
            </div>
          </div>

          <div className={styles.stack}>
            <section className={`${styles.paperCard} ${styles.moneyCard}`}>
              <div className={styles.tornLabel}>돈</div>
              <div className={styles.moneyMain}>
                <span>오늘 사용</span>
                <strong>₩ {fmtMoney(total)}</strong>
                <button className={styles.inlineLink} onClick={() => setBudgetOpen((v) => !v)}>예산 ₩{fmtMoney(budget)}</button>
              </div>
              <div className={styles.budgetTrack}><span style={{ width: `${budgetRate}%` }} /></div>
              {budgetOpen && (
                <div className={styles.budgetEdit}>
                  {[30000, 50000, 70000, 100000].map((value) => (
                    <button key={value} onClick={() => { setBudget(value); setBudgetOpen(false); }}>₩{fmtMoney(value)}</button>
                  ))}
                </div>
              )}
              <div className={styles.settlement}>
                <span>공동지출 ₩{fmtMoney(sharedTotal)}</span>
                <b>
                  {friendOwesMe > 0
                    ? `친구 → 나 ₩${fmtMoney(friendOwesMe)}`
                    : friendOwesMe < 0
                      ? `나 → 친구 ₩${fmtMoney(Math.abs(friendOwesMe))}`
                      : '정산 완료'}
                </b>
              </div>
              <button className={styles.bigAdd} onClick={() => setExpenseOpen(true)}>＋ 지출 기록</button>
              <div className={styles.receiptList}>
                {expenses.slice(-4).reverse().map((item) => (
                  <button key={item.id} onClick={() => setExpenses((prev) => prev.filter((expense) => expense.id !== item.id))} title="눌러서 삭제">
                    <span>{item.category} · {item.name}</span>
                    <b>₩{fmtMoney(item.amount)}</b>
                  </button>
                ))}
              </div>
            </section>

            <section className={`${styles.paperCard} ${styles.planCard}`}>
              <div className={styles.marker}>PLAN B</div>
              <p>{planB}</p>
              <div className={styles.deadline}>남산 안전선 <b>22:30 마지막 발권</b></div>
            </section>

            <section className={`${styles.paperCard} ${styles.checkCard}`}>
              <div className={styles.tornLabel}>가방 검사</div>
              <div className={styles.checkGrid}>
                {checklistItems.map((item) => (
                  <label key={item} className={checklist[item] ? styles.checked : ''}>
                    <input
                      type="checkbox"
                      checked={Boolean(checklist[item])}
                      onChange={() => setChecklist((prev) => ({ ...prev, [item]: !prev[item] }))}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </section>

        <footer className={styles.footerNote}>
          <span>HAND CUT · SEOUL DAY FILE 01</span>
          <b>서두르지 말 것.</b>
        </footer>
      </section>

      {expenseOpen && (
        <div className={styles.modalBackdrop} onMouseDown={() => setExpenseOpen(false)}>
          <form className={styles.expenseSheet} onSubmit={addExpense} onMouseDown={(e) => e.stopPropagation()}>
            <div className={styles.tapeSmall} />
            <h2>영수증 한 장 추가</h2>
            <label>
              무엇을 샀어?
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 저녁 김밥" autoFocus />
            </label>
            <label>
              얼마?
              <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))} placeholder="12000" />
            </label>
            <div className={styles.chipRow}>
              {categories.map((item) => <button type="button" key={item} className={category === item ? styles.selectedChip : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className={styles.twoButtons}>
              <button type="button" className={payer === 'me' ? styles.selectedChip : ''} onClick={() => setPayer('me')}>내가 결제</button>
              <button type="button" className={payer === 'friend' ? styles.selectedChip : ''} onClick={() => setPayer('friend')}>친구가 결제</button>
            </div>
            <label className={styles.sharedToggle}>
              <input type="checkbox" checked={shared} onChange={(e) => setShared(e.target.checked)} />
              둘이 같이 쓴 돈으로 1/N 정산
            </label>
            <button className={styles.saveExpense} type="submit">붙여두기</button>
          </form>
        </div>
      )}
    </main>
  );
}
