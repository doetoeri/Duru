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

  // 로컬스토리지에서 로드
  useEffect(() => {
    const saved = localStorage.getItem('announcements')
    if (saved) setAnnouncements(JSON.parse(saved))
  }, [])

  // 로컬스토리지에 저장
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-6">
          <Link href="/">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 cursor-pointer hover:from-pink-400 hover:to-cyan-400 transition-all">📢 학급 알림</h1>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={addAnnouncement} className="glass rounded-2xl p-8 mb-8 border-2 border-purple-400">
          <div className="mb-4">
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            게시하기
          </button>
        </form>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-gray-400">
              아직 게시글이 없습니다.
            </div>
          ) : (
            announcements.map((ann) => (
              <div key={ann.id} className="glass rounded-2xl p-6 border-l-4 border-pink-400 hover:scale-102 transition-transform">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-purple-300">{ann.title}</h3>
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="text-red-400 hover:text-red-300 font-bold"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-300 mb-2">{ann.content}</p>
                <p className="text-sm text-gray-500">{ann.createdAt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
