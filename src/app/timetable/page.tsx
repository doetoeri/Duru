'use client'

import Link from 'next/link'

const DAYS = ['월', '화', '수', '목', '금']
const PERIODS = ['1교시', '2교시', '3교시', '4교시', '5교시', '6교시', '7교시']

const DEFAULT_TIMETABLE: Record<string, Record<string, string>> = {
  월: {
    '1교시': '수학',
    '2교시': '영어',
    '3교시': '국어',
    '4교시': '한국사',
    '5교시': '물리학',
    '6교시': '생활과윤리',
    '7교시': '음악',
  },
  화: {
    '1교시': '수학',
    '2교시': '국어',
    '3교시': '영어',
    '4교시': '화학',
    '5교시': '통합과학',
    '6교시': '미술',
    '7교시': '체육',
  },
  수: {
    '1교시': '영어',
    '2교시': '수학',
    '3교시': '한문',
    '4교시': '정보',
    '5교시': '지구과학',
    '6교시': '영어회화',
    '7교시': '자율학습',
  },
  목: {
    '1교시': '국어',
    '2교시': '수학',
    '3교시': '영어',
    '4교시': '생물학',
    '5교시': '사회',
    '6교시': '체육',
    '7교시': '음악',
  },
  금: {
    '1교시': '수학',
    '2교시': '영어',
    '3교시': '국어',
    '4교시': '윤리',
    '5교시': '일반물리',
    '6교시': '미술',
    '7교시': '자율학습',
  },
}

export default function Timetable() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 cursor-pointer mb-8 pt-6">⏰ 시간표</h1>
        </Link>

        {/* Timetable Grid */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full glass rounded-2xl p-6 border-2 border-cyan-400">
            <div className="grid gap-2" style={{ gridTemplateColumns: `100px repeat(5, 1fr)` }}>
              {/* Header */}
              <div className="bg-cyan-500/20 p-3 rounded font-bold text-cyan-300">교시</div>
              {DAYS.map((day) => (
                <div key={day} className="bg-cyan-500/20 p-3 rounded font-bold text-cyan-300 text-center">
                  {day}
                </div>
              ))}

              {/* Timetable Rows */}
              {PERIODS.map((period) => (
                <div key={period} className="contents">
                  <div className="bg-gray-800/50 p-3 rounded font-bold text-gray-300 text-center">{period}</div>
                  {DAYS.map((day) => (
                    <div key={`${day}-${period}`} className="glass rounded-lg p-4 border-l-2 border-cyan-400 text-center">
                      <div className="text-white font-semibold">{DEFAULT_TIMETABLE[day][period]}</div>
                      <div className="text-xs text-gray-400 mt-1">메모 없음</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
