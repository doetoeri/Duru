'use client'

import Link from 'next/link'

const SAMPLE_MEALS = {
  breakfast: ['미역국', '계란말이', '밥', '김', '배추김치'],
  lunch: ['돗지불고기덮밥', '미소된장국', '닭다리조림', '단무지', '배추김치', '요구르트'],
  dinner: ['제육볶음', '계란국', '야채코드', '밥', '배추김치'],
}

export default function Meals() {
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
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <span className="material-icons text-xl mr-2">arrow_back</span>
            <span className="text-sm font-light">돌아가기</span>
          </Link>
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              <span className="material-icons text-5xl align-text-bottom mr-2">restaurant</span>
              급식
            </span>
          </h1>
          <p className="text-gray-600 text-sm font-light">{today}</p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: '아침', items: SAMPLE_MEALS.breakfast, icon: 'light_mode', gradient: 'from-yellow-100 to-orange-100' },
            { name: '점심', items: SAMPLE_MEALS.lunch, icon: 'wb_sunny', gradient: 'from-green-100 to-emerald-100' },
            { name: '저녁', items: SAMPLE_MEALS.dinner, icon: 'dark_mode', gradient: 'from-blue-100 to-cyan-100' },
          ].map((meal, idx) => (
            <div
              key={meal.name}
              className={`liquid-glass p-8 bg-gradient-to-br ${meal.gradient} animate-fade-in-scale`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="material-icons text-3xl text-gray-800">{meal.icon}</span>
                <h2 className="text-lg font-semibold text-gray-900">{meal.name}</h2>
              </div>
              <ul className="space-y-3">
                {meal.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="text-gray-600 text-sm font-light group-hover:text-green-600 transition-colors flex-shrink-0 mt-1">
                      •
                    </span>
                    <span className="text-gray-800 text-sm font-light group-hover:text-gray-900 transition-colors">
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
