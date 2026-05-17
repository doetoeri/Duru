'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const features = [
  {
    id: 1,
    name: '학급 알림',
    description: '공지사항을 한눈에',
    href: '/announcements',
    icon: '📢',
    gradient: 'from-blue-100 to-cyan-100',
    textColor: 'text-blue-600',
  },
  {
    id: 2,
    name: '학급 일정',
    description: 'D-Day까지 카운트',
    href: '/schedule',
    icon: '📅',
    gradient: 'from-purple-100 to-pink-100',
    textColor: 'text-purple-600',
  },
  {
    id: 3,
    name: '시간표',
    description: '주간 수업 일정',
    href: '/timetable',
    icon: '⏰',
    gradient: 'from-orange-100 to-red-100',
    textColor: 'text-orange-600',
  },
  {
    id: 4,
    name: '급식',
    description: '오늘의 메뉴',
    href: '/meals',
    icon: '🍽️',
    gradient: 'from-green-100 to-emerald-100',
    textColor: 'text-green-600',
  },
  {
    id: 5,
    name: '자료 보관함',
    description: '학습 자료 공유',
    href: '/resources',
    icon: '📚',
    gradient: 'from-indigo-100 to-blue-100',
    textColor: 'text-indigo-600',
  },
  {
    id: 6,
    name: 'Tester',
    description: '기능 테스트',
    href: '/tester',
    icon: '🔧',
    gradient: 'from-slate-100 to-gray-100',
    textColor: 'text-slate-600',
  },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-20 animate-fade-in-up">
        <div className="text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              DURU
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            고촌고등학교 1학년 8반<br />
            <span className="text-base text-gray-500 mt-2 inline-block">통합 학급 관리 플랫폼</span>
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Link key={feature.id} href={feature.href}>
              <div
                className="liquid-glass group relative overflow-hidden h-full"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-8 h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight mb-2 text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">
                      {feature.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xs text-gray-500 font-light">탐색하기</span>
                    <svg
                      className="w-4 h-4 text-gray-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7l10 10M7 17L17 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-20 text-center">
        <p className="text-sm text-gray-500 font-light">
          DURU v0.1.0 · 2026
        </p>
      </div>
    </main>
  )
}
