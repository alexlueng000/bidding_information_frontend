'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getBidInfo, getBidInfoTotal, getUniversityInfo } from '@/lib/getBidInfo'
import PostItem from './post-item'
import PaginationNumeric from '@/components/pagination'
import IndexCard from '@/components/index-card'

interface Post {
  title: string,
  url: string,
  publish_date: string,
  created_at: string,
}



export default function PostsList() {

  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  
  
  const currentPage = searchParams.get('skip') ? parseInt(searchParams.get('skip')!) : 1
  const postsPerPage = 10
  const totalPages = Math.ceil(total / postsPerPage)

  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBidInfo(currentPage, postsPerPage);
        setPosts(data);

        const total = await getBidInfoTotal();
        setTotal(total);
        const universities = await getUniversityInfo();
        // setUniversities(universities);
      } catch (err) {
        setError('Failed to fetch posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <div className="pb-8 md:pb-16">
      
      <h2 className="text-3xl font-bold font-inter mb-10">所有招标信息 共<span className="text-red-600 text-lg"> {total} </span>条</h2>
      {/* List container */}
      <div className="flex flex-col">

        {posts.map(post => {
          return (
            <PostItem key={post.url + post.created_at} {...post} />
          )
        })}

      </div>
      
      <div className="flex justify-center mt-10">
        <PaginationNumeric currentPage={currentPage} totalPages={totalPages} />
      </div>

    </div>
  )
}
