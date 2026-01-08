import { getBiddingItemById } from '@/lib/getBidInfo'
import BiddingDetail from '@/components/bidding-detail'

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function BiddingItemPage({ params }: PageProps) {
    const { id } = await params

    try {
        const item = await getBiddingItemById(id)

        return <BiddingDetail item={item} isLoading={false} />
    } catch (error) {
        console.error('Failed to fetch bidding item:', error)
        return <BiddingDetail item={null} isLoading={false} />
    }
}
