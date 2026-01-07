"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BiddingDetailProps {
    item: {
        _id?: string
        title: string
        publish_date: string
        created_at?: string
        is_good?: boolean
        organization?: string
        budget?: string
        category?: string
        description?: string
        expected_time?: string
        remarks?: string
        url?: string
        university?: string
    } | null
    isLoading: boolean
}

const UNIVERSITY_NAMES: Record<string, string> = {
    szu: '深圳大学',
    nkd: '南方科技大学',
    siqse: '深圳国际量子研究院',
    szlg: '深圳理工大学',
    sziit: '深圳信息职业技术学院',
    sztu: '深圳技术大学',
    iasf: '深圳先进光源研究院',
    pkusz: '北京大学深圳研究生院',
    smbu: '深圳北理莫斯科大学',
    szyxkxy: '深圳医学科学院',
    szbl: '深圳湾实验室',
    hkc: '香港中文大学（深圳）',
    szzyjs: '深圳职业技术大学',
    pcsys: '鹏城实验室',
    szari: '北京理工大学深圳汽车研究院',
    hgd: '哈尔滨工业大学（深圳）',
    tsinghua: '清华大学深圳国际研究生院',
    szust: '中山大学深圳校区',
}

export default function BiddingDetail({ item, isLoading }: BiddingDetailProps) {
    const [isVisible, setIsVisible] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            setIsVisible(true)
        }
    }, [isLoading])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">加载中...</p>
                </div>
            </div>
        )
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">未找到招标信息</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">抱歉，该招标信息不存在或已被删除。</p>
                    <Link
                        href="/universities"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        返回院校列表
                    </Link>
                </div>
            </div>
        )
    }

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '--'
        return dateStr.split(' ')[0]
    }

    const externalUrl = item.url
        ? `http://zfcg.szggzy.com:8081${item.url}`
        : null

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            {/* Hero Header - Redesigned with adaptive spacing */}
            <div className="relative bg-slate-950" style={{ minHeight: '280px' }}>
                {/* Ambient background layers */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Diagonal gradient sweep */}
                    <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-slate-700/10 to-transparent rounded-full blur-3xl" />
                    {/* Subtle grid overlay */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:48px_48px]" />
                </div>

                {/* Decorative top border line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top bar: Back button + Badge */}
                    <div className="flex items-center justify-between gap-4 pt-60 pb-4">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
                                transition: 'all 0.4s ease-out',
                            }}
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-sm">返回</span>
                        </button>

                        {/* Badge - positioned on right for better balance */}
                        <div
                            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8 backdrop-blur-sm"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateX(0)' : 'translateX(8px)',
                                transition: 'all 0.4s ease-out 0.05s',
                            }}
                        >
                            {item.is_good && (
                                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium tracking-wide">
                                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                    货物类
                                </span>
                            )}
                            {item.university && (
                                <>
                                    <span className="w-px h-2.5 bg-white/15" />
                                    <span className="text-slate-300 text-xs font-medium">
                                        {UNIVERSITY_NAMES[item.university] || item.university}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Title section - with adaptive sizing */}
                    <div className="py-6 md:py-8 lg:py-10">
                        <h1
                            className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-white leading-snug tracking-tight pr-4"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                                transition: 'all 0.5s ease-out 0.1s',
                                textShadow: '0 0 40px rgba(0,0,0,0.5)',
                            }}
                        >
                            {item.title}
                        </h1>
                    </div>

                    {/* Meta bar: Date + Organization + Button - horizontal layout */}
                    <div
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-t border-white/8 pt-5"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                            transition: 'all 0.5s ease-out 0.2s',
                        }}
                    >
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-400">
                                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{formatDate(item.publish_date)}</span>
                            </div>
                            {item.organization && (
                                <div className="flex items-center gap-2 text-slate-400">
                                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <span className="truncate max-w-[200px]">{item.organization}</span>
                                </div>
                            )}
                        </div>

                        {/* External link button - always visible */}
                        {externalUrl && (
                            <a
                                href={externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:shadow-xl"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                原始公告
                            </a>
                        )}
                    </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-slate-950 to-transparent pointer-events-none" />
            </div>

            {/* Detail Cards */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative">
                <div className="space-y-6 -mt-16">
                    {/* Description Card */}
                    {item.description && (
                        <div
                            className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.5s ease-out 0.4s',
                            }}
                        >
                            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">项目概况</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Info Grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.5s ease-out 0.5s',
                        }}
                    >
                        {/* Budget */}
                        {item.budget && (
                            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-medium text-slate-600 dark:text-slate-400">预算金额</h4>
                                </div>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.budget}</p>
                            </div>
                        )}

                        {/* Category */}
                        {item.category && (
                            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-medium text-slate-600 dark:text-slate-400">采购品目</h4>
                                </div>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.category}</p>
                            </div>
                        )}

                        {/* Expected Time */}
                        {item.expected_time && (
                            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-medium text-slate-600 dark:text-slate-400">预计完成时间</h4>
                                </div>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.expected_time}</p>
                            </div>
                        )}

                        {/* Organization (if not shown in header) */}
                        {item.organization && (
                            <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h4 className="font-medium text-slate-600 dark:text-slate-400">采购单位</h4>
                                </div>
                                <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.organization}</p>
                            </div>
                        )}
                    </div>

                    {/* Remarks */}
                    {item.remarks && (
                        <div
                            className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/50 p-6"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                transition: 'all 0.5s ease-out 0.6s',
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">备注信息</h4>
                                    <p className="text-amber-700 dark:text-amber-400 text-sm whitespace-pre-line">{item.remarks}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Info */}
                    <div
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.5s ease-out 0.7s',
                        }}
                    >
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            数据来源：深圳市政府采购网
                        </div>
                        {item.created_at && (
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                录入时间：{formatDate(item.created_at)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
