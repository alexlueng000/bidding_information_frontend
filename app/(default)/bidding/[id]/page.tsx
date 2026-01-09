"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import BiddingDetail from '@/components/bidding-detail'
import { getBiddingItemById } from '@/lib/getBidInfo'

export default function BiddingItemPage() {
    const params = useParams()
    const id = params.id as string

    const [item, setItem] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBiddingItemById(id)
                setItem(data)
            } catch (error) {
                console.error('Failed to fetch bidding item:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [id])

    return <BiddingDetail item={item} isLoading={isLoading} />
}
