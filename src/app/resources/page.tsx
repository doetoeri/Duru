'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Resource {
  id: string
  title: string
  content: string
  uploadedAt: string
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('resources')
    if (saved) setResources(JSON.parse(saved))
  }, [])

  const saveToStorage = (data: Resource[]) => {
    localStorage.setItem('resources', JSON.stringify(data))
  }

  const addResource = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    const newResource: Resource = {
      id: Date.now().toString(),
      title,
      content,
      uploadedAt: new Date().toLocaleString('ko-KR'),
    }

    const updated = [newResource, ...resources]
    setResources(updated)
    saveToStorage(updated)
    setTitle('')
    setContent('')
  }

  const deleteResource = (id: string) => {
    const updated = resources.filter((r) => r.id !== id)
    setResources(updated)
    saveToStorage(updated)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 cursor-pointer mb-8 pt-6">📁 자료 보관함</h1>
        </Link>

        {/* Form */}
        <form onSubmit={addResource} className="glass rounded-2xl p-8 mb-8 border-2 border-orange-400">
          <div className="mb-4">
            <input
              type="text"
              placeholder="자료 제목 (예: 1단원 학습지)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="설명 (예: 스캔본 링크 또는 설명)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all"
          >
            자료 올리기
          </button>
        </form>

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-gray-400 md:col-span-2">
              아직 올린 자료가 없습니다.
            </div>
          ) : (
            resources.map((resource) => (
              <div key={resource.id} className="glass rounded-2xl p-6 border-l-4 border-orange-400">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-orange-300">{resource.title}</h3>
                  <button
                    onClick={() => deleteResource(resource.id)}
                    className="text-red-400 hover:text-red-300 font-bold"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-300 text-sm mb-2">{resource.content}</p>
                <p className="text-xs text-gray-500">{resource.uploadedAt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
