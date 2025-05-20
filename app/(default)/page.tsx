export const metadata = {
  title: '招标信息收集平台',
  description: '汇总各高校的招标信息',
}


import Hero from '@/components/hero'
import PostsList from './posts-list'
export default function Home() {
  return (
    <>
      <Hero />

      {/*  Page content */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-8">
            <div className="md:flex md:justify-between" data-sticky-container>

              {/* <Sidebar /> */}
              

              {/* Main content */}
              <div className="md:grow">
                
                <PostsList />

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
