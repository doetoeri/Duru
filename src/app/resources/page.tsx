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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

  if (!mounted) return null

  return (
    <main className="relative min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <span className="material-icons text-xl mr-2">arrow_back</span>
            <span className="text-sm font-light">돌아가기</span>
          </Link>
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              <span className="material-icons text-5xl align-text-bottom mr-2">folder_open</span>
              자료 보관함
            </span>
          </h1>
          <p className="text-gray-600 text-sm mt-2 font-light">학습 자료를 공유하세요</p>
        </div>

        {/* Form */}
        <form onSubmit={addResource} className="liquid-glass p-8 mb-10 animate-fade-in-scale">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                자료 제목
              </label>
              <input
                type="text"
                placeholder="자료의 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 font-light text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                설명
              </label>
              <textarea
                placeholder="자료에 대한 설명을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 font-light text-gray-900 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 text-sm uppercase tracking-wide"
            >
              자료 올리기
            </button>
          </div>
        </form>

        {/* Resources List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.length === 0 ? (
            <div className="liquid-glass rounded-3xl p-12 text-center animate-fade-in-scale md:col-span-2">
              <p className="text-gray-500 font-light">아직 올린 자료가 없습니다</p>
            </div>
          ) : (
            resources.map((resource, index) => (
              <div
                key={resource.id}
                className="liquid-glass p-6 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="text-base font-semibold text-gray-900 flex-1">{resource.title}</h3>
                  <button
                    onClick={() => deleteResource(resource.id)}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 flex items-center justify-center transition-all duration-300"
                  >
                    <span className="material-icons text-lg">close</span>
                  </button>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-light mb-3">{resource.content}</p>
                <p className="text-xs text-gray-500 font-light">{resource.uploadedAt}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
