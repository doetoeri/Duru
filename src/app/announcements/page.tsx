'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('announcements')
    if (saved) setAnnouncements(JSON.parse(saved))
  }, [])

  const saveToStorage = (items: Announcement[]) => {
    localStorage.setItem('announcements', JSON.stringify(items))
  }

  const addAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toLocaleString('ko-KR'),
    }

    const updated = [newAnnouncement, ...announcements]
    setAnnouncements(updated)
    saveToStorage(updated)
    setTitle('')
    setContent('')
  }

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id)
    setAnnouncements(updated)
    saveToStorage(updated)
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
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              📢 학급 알림
            </span>
          </h1>
          <p className="text-gray-600 text-sm font-light">공지사항을 게시하고 관리하세요</p>
        </div>

        {/* Form */}
        <form onSubmit={addAnnouncement} className="liquid-glass p-8 mb-10 animate-fade-in-scale">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                제목
              </label>
              <input
                type="text"
                placeholder="공지사항의 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 font-light text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                내용
              </label>
              <textarea
                placeholder="공지사항의 내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 font-light text-gray-900 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 rounded-xl transition-all duration-300 text-sm uppercase tracking-wide"
            >
              게시하기
            </button>
          </div>
        </form>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="liquid-glass rounded-3xl p-12 text-center animate-fade-in-scale">
              <p className="text-gray-500 font-light">아직 게시된 공지사항이 없습니다</p>
            </div>
          ) : (
            announcements.map((ann, index) => (
              <div
                key={ann.id}
                className="liquid-glass p-6 hover:scale-102 transition-all duration-300 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{ann.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-light mb-3">{ann.content}</p>
                    <p className="text-xs text-gray-500 font-light">{ann.createdAt}</p>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 flex items-center justify-center transition-all duration-300"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
