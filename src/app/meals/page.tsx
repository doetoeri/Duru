'use client'

import Link from 'next/link'
import { useState } from 'react'

const SAMPLE_MEALS = {
  breakfast: ['미역국', '계란말이', '밥', '김', '배추김치'],
  lunch: ['돼지불고기덮밥', '미소된장국', '닭다리조림', '단무지', '배추김치', '요구르트'],
  dinner: ['제육볶음', '계란국', '야채코드', '밥', '배추김치'],
}

export default function Meals() {
  const [mounted, setMounted] = useState(true)
  const today = new Date().toLocaleDateString('ko-KR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            <span className="inline-block bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              🍽️ 급식
            </span>
          </h1>
          <p className="text-gray-400 text-sm font-light">{today}</p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: '아침', items: SAMPLE_MEALS.breakfast, icon: '🌅', color: 'from-yellow-500/30 to-orange-500/30' },
            { name: '점심', items: SAMPLE_MEALS.lunch, icon: '☀️', color: 'from-green-500/30 to-emerald-500/30' },
            { name: '저녁', items: SAMPLE_MEALS.dinner, icon: '🌙', color: 'from-blue-500/30 to-cyan-500/30' },
          ].map((meal, idx) => (
            <div
              key={meal.name}
              className="liquid-glass p-8 animate-fade-in-scale"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{meal.icon}</span>
                <h2 className="text-lg font-semibold text-white">{meal.name}</h2>
              </div>
              <ul className="space-y-3">
                {meal.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="text-gray-400 text-sm font-light group-hover:text-green-400 transition-colors flex-shrink-0 mt-1">
                      •
                    </span>
                    <span className="text-gray-300 text-sm font-light group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
