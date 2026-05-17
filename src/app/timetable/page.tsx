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
    <main className="relative min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-light">돌아가기</span>
          </Link>
          <h1 className="text-5xl font-bold tracking-tight mb-2">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ⏰ 시간표
            </span>
          </h1>
          <p className="text-gray-600 text-sm font-light">고촌고 1학년 8반</p>
        </div>

        {/* Timetable Grid */}
        <div className="overflow-x-auto animate-fade-in-scale">
          <div className="liquid-glass p-8 min-w-max">
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `120px repeat(5, 1fr)`,
              }}
            >
              {/* Header Row */}
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center"></div>
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center py-4 font-semibold text-gray-900 text-sm border-b border-gray-200"
                >
                  {day}요일
                </div>
              ))}

              {/* Timetable Rows */}
              {PERIODS.map((period, idx) => (
                <div key={period} className="contents">
                  <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide flex items-center justify-center py-4 border-b border-gray-200">
                    {period}
                  </div>
                  {DAYS.map((day) => (
                    <div
                      key={`${day}-${period}`}
                      className="liquid-glass p-4 text-center flex flex-col items-center justify-center min-h-24"
                    >
                      <div className="text-sm font-medium text-gray-900 mb-2">
                        {DEFAULT_TIMETABLE[day][period]}
                      </div>
                      <div className="text-xs text-gray-500 font-light">메모 없음</div>
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
