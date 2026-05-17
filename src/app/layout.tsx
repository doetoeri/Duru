import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DURU - 고촌고 1학년 8반',
  description: '학급 통합 관리 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
