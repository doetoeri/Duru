'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            DURU
          </h1>
          <p className="text-xl text-gray-300">고촌고 1학년 8반 통합 플랫폼</p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {[
            { name: '학급 알림', href: '/announcements', color: 'from-purple-500 to-pink-500', icon: '📢' },
            { name: '학급 일정', href: '/schedule', color: 'from-pink-500 to-cyan-500', icon: '📅' },
            { name: '시간표', href: '/timetable', color: 'from-cyan-500 to-blue-500', icon: '⏰' },
            { name: '급식', href: '/meals', color: 'from-green-500 to-emerald-500', icon: '🍽️' },
            { name: '자료 보관함', href: '/resources', color: 'from-orange-500 to-red-500', icon: '📁' },
            { name: 'Tester', href: '/tester', color: 'from-gray-500 to-slate-500', icon: '🧪' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`glass rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer border-2 neon-border border-${item.color.split(' ')[1].split('-')[0]}-400`}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h2 className="text-2xl font-bold">{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
