"use client"

import React from 'react'
import { useState, useEffect } from 'react'


import Hero from '@/components/hero'
import PostItem from '../../post-item'
import { getOneUniversityInfo } from '@/lib/getBidInfo'

interface Post {
    _id?: string,
    title: string,
    url: string,
    publish_date: string,
    created_at: string,
    is_good: boolean
}

interface props {
    queryUniversity: string,
    universityChinese: string
}

type UniversityChinese = {
  iasf: string;
  szu: string;
  sztu: string;
  siqse: string;
  nkd: string;
  pkusz: string;
  tsinghua: string;
  sziit: string;
  szbl: string;
  smbu: string;
  szari: string;
  szyxkxy: string;
  pcsys: string;
  hgd: string;
  hkc: string;
  szlg: string;
  szzyjs: string;
  szust: string;
};

type UniversityKey = keyof typeof universityChinese;

const universityChinese: UniversityChinese = {
  iasf: "深圳先进光源研究院",
  szu: "深圳大学",
  sztu: "深圳技术大学",
  siqse: "深圳国际量子研究院",
  nkd: "南方科技大学",
  pkusz: "北京大学深圳研究生院",
  tsinghua: "清华大学深圳国际研究生院",
  sziit: "深圳信息职业技术学院",
  szbl: "深圳湾实验室",
  smbu: "深圳北理莫斯科大学",
  szari: "北京理工大学深圳汽车研究院",
  szyxkxy: "深圳医学科学院",
  pcsys: "鹏城实验室",
  hgd: "哈尔滨工业大学（深圳）",
  hkc: "香港中文大学（深圳）",
  szlg: "深圳理工大学",
  szzyjs: "深圳职业技术大学",
  szust: "中山大学深圳校区"
};

function getChineseName(key: string): string {
  return universityChinese[key as UniversityKey];
}

export default function Home({params}: {params: Promise<{university: string}>}) {

    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isGoodsOnly, setIsGoodsOnly] = useState(false)


    const { university } = React.use(params)

    const unvChinese = getChineseName(university)

    const handleClick = () => {
      setIsGoodsOnly(!isGoodsOnly)
    }

    // 根据 isGoodsOnly 的值过滤文章
    // useEffect(() => {
    //   const goodPosts = posts.filter((post) => post.is_good);
    //   setFilteredPosts(goodPosts);
    // }, [isGoodsOnly, posts]);


    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const data = await getOneUniversityInfo(university); // 假设从此函数获取数据
          setPosts(data); // 设置所有的 posts 数据、
          // setFilteredPosts(data); // 默认显示所有文章
        } catch (err) {
          setError('Failed to fetch posts.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, [university]);

    

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
                        <div className="pb-8 md:pb-16">
                        
                          <div className='flex items-baseline'>
                            <h2 className="text-3xl font-bold font-inter mb-10 mr-4">{unvChinese}货物类招标信息共 <span className='text-red-600 font-bold'>{posts.length}</span> 条</h2>
                            {/* <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" onClick={handleClick}>
                        
                            {isGoodsOnly ? '查看全部' : '仅看货物类'}

                            </button> */}
                          </div>
                          
                          {/* List container */}
                          <div className="flex flex-col">

                              {posts.map(post => {
                              return (
                                  <PostItem key={post._id || (post.url + post.created_at)} {...post} />
                              )
                              })}

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
  