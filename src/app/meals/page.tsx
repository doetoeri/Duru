'use client'

import Link from 'next/link'

const SAMPLE_MEALS = {
  breakfast: ['미역국', '계란말이', '밥', '김', '배추김치'],
  lunch: ['돼지불고기덮밥', '미소된장국', '풋고추무침', '단무지', '배추김치', '요구르트'],
  dinner: ['제육볶음', '계란국', '야채코드', '밥', '배추김치'],
}

export default function Meals() {
  const today = new Date().toLocaleDateString('ko-KR')

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 cursor-pointer mb-8 pt-6">🍽️ 급식</h1>
        </Link>

        <div className="text-center mb-8">
          <p className="text-gray-400 text-lg">오늘: {today}</p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: '아침', items: SAMPLE_MEALS.breakfast, color: 'from-yellow-500 to-orange-500' },
            { name: '점심', items: SAMPLE_MEALS.lunch, color: 'from-green-500 to-emerald-500' },
            { name: '저녁', items: SAMPLE_MEALS.dinner, color: 'from-blue-500 to-cyan-500' },
          ].map((meal) => (
            <div key={meal.name} className={`glass rounded-2xl p-6 border-2 border-${meal.color.split(' ')[1].split('-')[0]}-400`}>
              <h2 className={`text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${meal.color}`}>
                {meal.name}
              </h2>
              <ul className="space-y-2">
                {meal.items.map((item, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center">
                    <span className="text-green-400 mr-2">•</span>
                    {item}
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
