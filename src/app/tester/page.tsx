'use client'

import Link from 'next/link'

export default function Tester() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-slate-400 cursor-pointer mb-8 pt-6">🧪 Tester</h1>
        </Link>

        <div className="glass rounded-2xl p-8 border-2 border-gray-400">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-300 mb-4">기능 테스트</h2>
              <p className="text-gray-400 mb-4">각 페이지에서 기능을 테스트할 수 있습니다:</p>
              <ul className="space-y-2 text-gray-400">
                <li>✓ 학급 알림: 게시글 추가/삭제</li>
                <li>✓ 학급 일정: 일정 추가/삭제 및 D-Day 계산</li>
                <li>✓ 시간표: 주간 시간표 조회</li>
                <li>✓ 급식: 오늘의 급식 정보</li>
                <li>✓ 자료 보관함: 자료 추가/삭제</li>
              </ul>
            </div>

            <div className="border-t border-gray-600 pt-6">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">개발 정보</h2>
              <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm text-gray-400 space-y-2">
                <div>Framework: Next.js 14</div>
                <div>Styling: Tailwind CSS</div>
                <div>Storage: LocalStorage</div>
                <div>Deploy: Vercel</div>
                <div>Repo: github.com/doetoeri/Duru</div>
              </div>
            </div>

            <div className="border-t border-gray-600 pt-6">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">데이터 초기화</h2>
              <button
                onClick={() => {
                  if (confirm('모든 데이터를 초기화하시겠습니까?')) {
                    localStorage.clear()
                    alert('데이터가 초기화되었습니다.')
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                전체 데이터 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
