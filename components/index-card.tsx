"use client"

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

interface Post {
  _id?: string,
  title: string,
  url: string,
  publish_date: string,
  created_at: string,
}

interface IndexCardProps {
    university: string,
    title: string,
    total: number,
    posts: Post[],
    index?: number,
}

export default function IndexCard({university, title, total, posts, index = 0}: IndexCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 50)
        return () => clearTimeout(timer)
    }, [index])

    // Format date to YYYY-MM-DD only
    const formatDate = (dateStr: string) => dateStr?.split(' ')[0] || dateStr

    // Get icon based on university type
    const getIcon = () => {
        const icons = {
            default: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        }
        return icons.default
    }

    return (
        <div
            ref={cardRef}
            className="group relative bg-white dark:bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-500"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s ease-out',
                boxShadow: isHovered ? '0 20px 40px -12px rgba(0, 0, 0, 0.15)' : '0 4px 12px -2px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient accent at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Card header */}
            <div className="p-5 pb-4 border-b border-slate-100 dark:border-slate-800/60">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}`}>
                            {getIcon()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-tight truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-slate-500 dark:text-slate-400">招标公告</span>
                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {posts.length} 条最新
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="relative">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {total}
                            </span>
                        </div>
                        <span className="text-xs text-slate-400">总计</span>
                    </div>
                </div>
            </div>

            {/* Card content - posts list */}
            <div className="p-4">
                {posts.length > 0 ? (
                    <ul className="space-y-0">
                        {posts.map((post, i) => (
                            <li
                                key={i}
                                className="group/item relative"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                                    transition: `all 0.3s ease-out ${0.1 + i * 0.05}s`,
                                }}
                            >
                                <Link
                                    href={post._id && post._id !== 'null' ? `/bidding/${post._id}` : `http://zfcg.szggzy.com:8081${post.url}`}
                                    {...(post._id && post._id !== 'null' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                                    className="flex items-start gap-3 py-3 px-3 -mx-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group-hover/item:px-4"
                                >
                                    {/* Date indicator */}
                                    <div className="flex-shrink-0 w-16 py-2 px-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-center">
                                        <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                            {formatDate(post.publish_date)?.split('-')?.[1] || '--'}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {formatDate(post.publish_date)?.split('-')?.[2] || '--'}
                                        </div>
                                    </div>

                                    {/* Post title */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                            {post.title}
                                        </p>
                                    </div>

                                    {/* External link icon - show if has internal detail page */}
                                    {post._id && post._id !== 'null' && (
                                        <div className="flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="py-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mb-3">
                            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">暂无招标信息</p>
                    </div>
                )}
            </div>

            {/* Card footer with view more link */}
            <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800/60">
                <Link
                    href={`/universities/${university}`}
                    className="flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link"
                >
                    <span>查看全部信息</span>
                    <span className="flex items-center gap-1 group-hover/link:gap-2 transition-all duration-200">
                        <span>{total} 条</span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </Link>
            </div>

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-violet-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-violet-500/5 transition-all duration-500 pointer-events-none" />
        </div>
    )
}
