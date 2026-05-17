'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ScheduleItem {
  id: string
  title: string
  date: string
}

export default function Schedule() {
  const [items, setItems] = useState<ScheduleItem[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('schedule')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  const saveToStorage = (data: ScheduleItem[]) => {
    localStorage.setItem('schedule', JSON.stringify(data))
  }

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !date) return

    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      title,
      date,
    }

    const updated = [...items, newItem].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    setItems(updated)
    saveToStorage(updated)
    setTitle('')
    setDate('')
  }

  const deleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id)
    setItems(updated)
    saveToStorage(updated)
  }

  const calculateDday = (targetDate: string): number => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const target = new Date(targetDate)
    target.setHours(0, 0, 0, 0)
    const diff = Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  if (!mounted) return null

  return (
    <main className="relative min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-light">돌아가기</span>
          </Link>
          <h1 className="text-5xl font-bold tracking-tight mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📅 학급 일정
            </span>
          </h1>
          <p className="text-gray-600 text-sm font-light">학급의 중요한 일정을 관리하세요</p>
        </div>

        {/* Form */}
        <form onSubmit={addItem} className="liquid-glass p-8 mb-10 animate-fade-in-scale">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                행사명
              </label>
              <input
                type="text"
                placeholder="행사 이름을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-pink-500 font-light text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                날짜
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-pink-500 font-light text-gray-900"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 rounded-xl transition-all duration-300 text-sm uppercase tracking-wide"
            >
              일정 추가
            </button>
          </div>
        </form>

        {/* Schedule Timeline */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="liquid-glass rounded-3xl p-12 text-center animate-fade-in-scale">
              <p className="text-gray-500 font-light">예정된 일정이 없습니다</p>
            </div>
          ) : (
            items.map((item, index) => {
              const dday = calculateDday(item.date)
              let ddayText = ''
              let ddayColor = 'text-red-600'

              if (dday > 0) {
                ddayText = `D-${dday}`
                if (dday <= 7) ddayColor = 'text-red-600'
                else if (dday <= 30) ddayColor = 'text-orange-600'
                else ddayColor = 'text-blue-600'
              } else if (dday === 0) {
                ddayText = '🔴 D-Day'
                ddayColor = 'text-red-600'
              } else {
                ddayText = `D+${Math.abs(dday)}`
                ddayColor = 'text-gray-600'
              }

              return (
                <div
                  key={item.id}
                  className="liquid-glass p-6 flex items-center justify-between gap-6 animate-slide-in-right"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 font-light">
                      {new Date(item.date).toLocaleDateString('ko-KR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl font-bold font-mono ${ddayColor}`}>
                      {ddayText}
                    </span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 flex items-center justify-center transition-all duration-300"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}
