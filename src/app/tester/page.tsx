'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Tester() {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClearData = () => {
    localStorage.clear()
    setShowConfirm(false)
    alert('모든 데이터가 삭제되었습니다.')
  }

  return (
    <main className="relative min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-light">돌아가기</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="inline-block bg-gradient-to-r from-slate-300 to-gray-300 bg-clip-text text-transparent">
              🔧 Tester
            </span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-light">기능을 테스트하세요</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Features Section */}
          <div className="liquid-glass p-8 animate-fade-in-scale">
            <h2 className="text-2xl font-semibold text-white mb-6">✨ 테스트 가능한 기능</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: '학급 알림', desc: '공지사항 추가/삭제' },
                { name: '학급 일정', desc: '일정 추가/삭제 & D-Day' },
                { name: '시간표', desc: '주간 시간표 조회' },
                { name: '급식', desc: '오늘의 급식 정보' },
                { name: '자료 보관함', desc: '자료 추가/삭제' },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="glass rounded-xl p-4 animate-slide-in-right"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                    <div>
                      <p className="font-medium text-white text-sm">{feature.name}</p>
                      <p className="text-gray-400 text-xs mt-1 font-light">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="liquid-glass p-8 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-semibold text-white mb-6">ℹ️ 프로젝트 정보</h2>
            <div className="space-y-3">
              {[
                { label: 'Framework', value: 'Next.js 14' },
                { label: 'Styling', value: 'Tailwind CSS' },
                { label: 'Storage', value: 'LocalStorage' },
                { label: 'Deployment', value: 'Vercel' },
                { label: 'Repository', value: 'github.com/doetoeri/Duru' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                >
                  <span className="text-sm font-medium text-gray-300">{item.label}</span>
                  <span className="text-sm text-gray-400 font-light">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="liquid-glass p-8 border-l-4 border-red-500/30 animate-fade-in-scale" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-semibold text-white mb-6">⚠️ 위험 영역</h2>
            <p className="text-sm text-gray-400 font-light mb-4">
              이 작업은 모든 로컬 데이터를 삭제하며 되돌릴 수 없습니다.
            </p>
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 font-medium py-3 rounded-xl transition-all duration-300 text-sm uppercase tracking-wide border border-red-500/30"
              >
                모든 데이터 삭제
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-red-300 font-light">정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleClearData}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-all duration-300 text-sm"
                  >
                    확인 삭제
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg transition-all duration-300 text-sm"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
