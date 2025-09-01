"use client"

import { useState, useEffect } from "react";

import IndexCard from "@/components/index-card"
import Hero from "@/components/hero";

import { getUniversityInfo } from '@/lib/getBidInfo'

interface Post {
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



export default function Home() {

    

    const initialData: UniversitiesData = {
        iasf: [],
        iasf_total: 0,
        nkd: [],
        nkd_total: 0,
        sztu: [],
        sztu_total: 0,
        szu: [],
        szu_total: 0,
        siqse: [],
        siqse_total: 0,
        pkusz: [],
        pkusz_total: 0,
        tsinghua: [],
        tsinghua_total: 0,
        sziit: [],
        sziit_total: 0,
        szbl: [],
        szbl_total: 0,
        smbu: [],
        smbu_total: 0,
        szari: [],
        szari_total: 0,
        szyxkxy: [],
        szyxkxy_total: 0,
        pcsys: [],
        pcsys_total: 0,
        hgd: [],
        hgd_total: 0,
        hkc: [],
        hkc_total: 0,
        szlg: [],
        szlg_total: 0,
        szzyjs: [],
        szzyjs_total: 0,
        szust: [],
        szust_total: 0
      };

    const [universities, setUniversities] = useState<UniversitiesData>(initialData);

    const iasfData = universities.iasf || [];
    const nkdData = universities.nkd || [];
    const sztuData = universities.sztu || [];
    const szuData = universities.szu || [];
    const siqseData = universities.siqse || [];
    const pkuszData = universities.pkusz || []
    const tsinghuaData = universities.tsinghua || []
    const sziitData = universities.sziit || []
    const szblData = universities.szbl || []
    const smbuData = universities.smbu || []
    const szariData = universities.szari || []
    const szyxkxyData = universities.szyxkxy || []
    const pcsysData = universities.pcsys || []
    const hgdData = universities.hgd || []
    const hkcData = universities.hkc || []
    const szlgData = universities.szlg || []
    const szzyjsData = universities.szzyjs || []
    const szustData = universities.szust || []

    const iasfTotal = universities.iasf_total || 0;
    const nkdTotal = universities.nkd_total || 0;
    const sztuTotal = universities.sztu_total || 0;
    const szuTotal = universities.szu_total || 0;
    const pkuszTotal = universities.pkusz_total || 0;
    const siqseTotal = universities.siqse_total || 0;
    const tsinghuaTotal = universities.tsinghua_total || 0;
    const sziitTotal = universities.sziit_total || 0;
    const szblTotal = universities.szbl_total || 0;
    const smbuTotal = universities.smbu_total || 0;
    const szariTotal = universities.szari_total || 0;
    const szyxkxyTotal = universities.szyxkxy_total || 0;
    const pcsysTotal = universities.pcsys_total || 0;
    const hgdTotal = universities.hgd_total || 0;
    const hkcTotal = universities.hkc_total || 0;
    const szlgTotal = universities.szlg_total || 0;
    const szzyjsTotal = universities.szzyjs_total || 0;
    const szustTotal = universities.szust_total || 0;


    useEffect(() => {
        const fetchPosts = async () => {
            try {   
            const universities = await getUniversityInfo();
            setUniversities(universities);
            } catch (err) {
        
            }
        };
    
        fetchPosts();
        }, []);


    return (
        <>
            <Hero />

            {/*  Page content */}
            <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-8">
                <div className="md:flex md:justify-between" data-sticky-container>

                    {/* Main content */}
                    <div className="md:grow">
                    
                        <div className="flex flex-col">

                            <h2 className="text-3xl font-bold font-inter mb-10">重点高校货物类招标信息</h2>
                            <div className="grid grid-cols-12 gap-6 mb-12">
                                <IndexCard title="深圳大学" posts={szuData} total={szuTotal} university="szu" />
                                <IndexCard title="南方科技大学" posts={nkdData} total={nkdTotal} university="nkd" />
                                <IndexCard title="深圳国际量子研究院" posts={siqseData} total={siqseTotal} university="siqse" />
                                <IndexCard title="深圳理工大学" posts={szlgData} total={szlgTotal} university="szlg" />
                                <IndexCard title="深圳信息职业技术学院" posts={sziitData} total={sziitTotal} university="sziit" />
                                <IndexCard title="深圳技术大学" posts={sztuData} total={sztuTotal} university="sztu" />
                                <IndexCard title="深圳先进光源研究院" posts={iasfData} total={iasfTotal} university="iasf" />
                                <IndexCard title="北京大学深圳研究生院" posts={pkuszData} total={pkuszTotal} university="pkusz" />
                                <IndexCard title="深圳北理莫斯科大学" posts={smbuData} total={smbuTotal} university="smbu" />
                                <IndexCard title="深圳医学科学院" posts={szyxkxyData} total={szyxkxyTotal} university="szyxkxy" />
                                <IndexCard title="深圳湾实验室" posts={szblData} total={szblTotal} university="szbl" />
                                <IndexCard title="香港中文大学（深圳）" posts={hkcData} total={hkcTotal} university="hkc" />
                                <IndexCard title="深圳职业技术大学" posts={szzyjsData} total={szzyjsTotal} university="szzyjs" />
                                <IndexCard title="鹏城实验室" posts={pcsysData} total={pcsysTotal} university="pcsys" />
                                <IndexCard title="北京理工大学深圳汽车研究院" posts={szariData} total={szariTotal} university="szari" />
                                <IndexCard title="哈尔滨工业大学（深圳）" posts={hgdData} total={hgdTotal} university="hgd" />
                                <IndexCard title="清华大学深圳国际研究生院" posts={tsinghuaData} total={tsinghuaTotal} university="tsinghua" />
                                <IndexCard title="中山大学深圳校区" posts={szustData} total={szustTotal} university="szust" />
                            </div>
                        </div>

                    </div>

                </div>
                </div>
            </div>
            </section>
        </>
            
        
    )
}

