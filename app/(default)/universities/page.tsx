"use client"

import { useState, useEffect } from "react"

import IndexCard from "@/components/index-card"
import Hero from "@/components/hero"

import { getUniversityInfo } from '@/lib/getBidInfo'

interface Post {
    _id?: string,
    title: string,
    url: string,
    publish_date: string,
    created_at: string,
}

type UniversitiesData = {
  iasf: Post[];
  iasf_total: number;
  nkd: Post[];
  nkd_total: number;
  sztu: Post[];
  sztu_total: number;
  szu: Post[];
  szu_total: number;
  siqse: Post[];
  siqse_total: number;
  pkusz: Post[],
  pkusz_total: number,
  tsinghua: Post[],
  tsinghua_total: number,
  sziit: Post[],
  sziit_total: number,
  szbl: Post[],
  szbl_total: number,
  smbu: Post[],
  smbu_total: number,
  szari: Post[],
  szari_total: number,
  szyxkxy: Post[],
  szyxkxy_total: number,
  hgd: Post[],
  hgd_total: number,
  hkc: Post[],
  hkc_total: number,
  szlg: Post[],
  szlg_total: number,
  szzyjs: Post[],
  szzyjs_total: number,
  pcsys: Post[],
  pcsys_total: number,
  szust: Post[],
  szust_total: number
};

// University configuration with display order
const universitiesConfig = [
    { id: 'szu', title: '深圳大学', key: 'szu' as keyof UniversitiesData, totalKey: 'szu_total' as keyof UniversitiesData },
    { id: 'nkd', title: '南方科技大学', key: 'nkd' as keyof UniversitiesData, totalKey: 'nkd_total' as keyof UniversitiesData },
    { id: 'siqse', title: '深圳国际量子研究院', key: 'siqse' as keyof UniversitiesData, totalKey: 'siqse_total' as keyof UniversitiesData },
    { id: 'szlg', title: '深圳理工大学', key: 'szlg' as keyof UniversitiesData, totalKey: 'szlg_total' as keyof UniversitiesData },
    { id: 'sziit', title: '深圳信息职业技术学院', key: 'sziit' as keyof UniversitiesData, totalKey: 'sziit_total' as keyof UniversitiesData },
    { id: 'sztu', title: '深圳技术大学', key: 'sztu' as keyof UniversitiesData, totalKey: 'sztu_total' as keyof UniversitiesData },
    { id: 'iasf', title: '深圳先进光源研究院', key: 'iasf' as keyof UniversitiesData, totalKey: 'iasf_total' as keyof UniversitiesData },
    { id: 'pkusz', title: '北京大学深圳研究生院', key: 'pkusz' as keyof UniversitiesData, totalKey: 'pkusz_total' as keyof UniversitiesData },
    { id: 'smbu', title: '深圳北理莫斯科大学', key: 'smbu' as keyof UniversitiesData, totalKey: 'smbu_total' as keyof UniversitiesData },
    { id: 'szyxkxy', title: '深圳医学科学院', key: 'szyxkxy' as keyof UniversitiesData, totalKey: 'szyxkxy_total' as keyof UniversitiesData },
    { id: 'szbl', title: '深圳湾实验室', key: 'szbl' as keyof UniversitiesData, totalKey: 'szbl_total' as keyof UniversitiesData },
    { id: 'hkc', title: '香港中文大学（深圳）', key: 'hkc' as keyof UniversitiesData, totalKey: 'hkc_total' as keyof UniversitiesData },
    { id: 'szzyjs', title: '深圳职业技术大学', key: 'szzyjs' as keyof UniversitiesData, totalKey: 'szzyjs_total' as keyof UniversitiesData },
    { id: 'pcsys', title: '鹏城实验室', key: 'pcsys' as keyof UniversitiesData, totalKey: 'pcsys_total' as keyof UniversitiesData },
    { id: 'szari', title: '北京理工大学深圳汽车研究院', key: 'szari' as keyof UniversitiesData, totalKey: 'szari_total' as keyof UniversitiesData },
    { id: 'hgd', title: '哈尔滨工业大学（深圳）', key: 'hgd' as keyof UniversitiesData, totalKey: 'hgd_total' as keyof UniversitiesData },
    { id: 'tsinghua', title: '清华大学深圳国际研究生院', key: 'tsinghua' as keyof UniversitiesData, totalKey: 'tsinghua_total' as keyof UniversitiesData },
    { id: 'szust', title: '中山大学深圳校区', key: 'szust' as keyof UniversitiesData, totalKey: 'szust_total' as keyof UniversitiesData },
];

export default function Home() {
    const initialData: UniversitiesData = {
        iasf: [], iasf_total: 0, nkd: [], nkd_total: 0, sztu: [], sztu_total: 0,
        szu: [], szu_total: 0, siqse: [], siqse_total: 0, pkusz: [], pkusz_total: 0,
        tsinghua: [], tsinghua_total: 0, sziit: [], sziit_total: 0, szbl: [], szbl_total: 0,
        smbu: [], smbu_total: 0, szari: [], szari_total: 0, szyxkxy: [], szyxkxy_total: 0,
        pcsys: [], pcsys_total: 0, hgd: [], hgd_total: 0, hkc: [], hkc_total: 0,
        szlg: [], szlg_total: 0, szzyjs: [], szzyjs_total: 0, szust: [], szust_total: 0
    };

    const [universities, setUniversities] = useState<UniversitiesData>(initialData);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getUniversityInfo();
                setUniversities(data);
            } catch (err) {
                console.error('Failed to fetch university data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Calculate total posts across all universities
    const totalPosts = universitiesConfig.reduce((sum, uni) => {
        return sum + (universities[uni.totalKey] as number || 0);
    }, 0);

    return (
        <>
            <Hero />

            {/* Page content */}
            <section className="relative bg-gray-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-12 md:py-16">
                        {/* Section header with stats */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    院校招标信息
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    共 {totalPosts.toLocaleString()} 条招标公告
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <span className="relative flex h-2 w-2">
                                    {isLoading ? (
                                        <>
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                                        </>
                                    ) : (
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    )}
                                </span>
                                <span>{isLoading ? '正在更新...' : '数据已更新'}</span>
                            </div>
                        </div>

                        {/* University cards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {universitiesConfig.map((uni, index) => (
                                <IndexCard
                                    key={uni.id}
                                    university={uni.id}
                                    title={uni.title}
                                    posts={universities[uni.key] as Post[] || []}
                                    total={universities[uni.totalKey] as number || 0}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative bottom element */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            </section>
        </>
    )
}
