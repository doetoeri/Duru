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

  useEffect(() => {
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 cursor-pointer mb-8 pt-6">📅 학급 일정</h1>
        </Link>

        {/* Form */}
        <form onSubmit={addItem} className="glass rounded-2xl p-8 mb-8 border-2 border-pink-400">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="행사명"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all"
            >
              추가
            </button>
          </div>
        </form>

        {/* Timeline */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-gray-400">
              예정된 일정이 없습니다.
            </div>
          ) : (
            items.map((item) => {
              const dday = calculateDday(item.date)
              let ddayText = ''
              if (dday > 0) ddayText = `D-${dday}`
              else if (dday === 0) ddayText = 'D-Day'
              else ddayText = `D+${Math.abs(dday)}`

              return (
                <div key={item.id} className="glass rounded-2xl p-6 border-l-4 border-cyan-400 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300">{item.title}</h3>
                    <p className="text-gray-400">{new Date(item.date).toLocaleDateString('ko-KR')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-pink-400">{ddayText}</span>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-400 hover:text-red-300 font-bold text-lg"
                    >
                      ✕
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
