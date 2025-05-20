import Link from 'next/link'

interface Post {
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
}

export default function IndexCard({university, title, total, posts}: IndexCardProps) {
    return(
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="flex justify-between items-center">
          <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">{title} 共<span className="text-red-600 text-sm"> {total} </span>条</h2>
          </header>
          <div className="text-sm text-gray-600"><Link href={`/universities/${university}`}>查看更多 {'>'} </Link></div>
        </div>
        
        <div className="p-3">
  
          {/* Card content */}
          {/* "Today" group */}
          <div>
            {/* <header className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">Today</header> */}
            <ul className="my-1">
              {/* Item */}
              { posts.length > 0 ? posts.map((post, index) => (

              <li className="flex px-2" key={index}>
                <div className="w-9 h-9 rounded-full shrink-0 bg-green-500 my-2 mr-3">
                  <svg className="w-9 h-9 fill-current text-white" viewBox="0 0 36 36">
                    <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
                  </svg>
                </div>
                <div className="grow flex items-center border-b border-gray-100 dark:border-gray-700/60 text-sm py-2">
                  <div className="grow flex justify-between">
                    <div className="self-center"><a className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white" href={"http://zfcg.szggzy.com:8081" + `${post.url}`} target="_blank">{post.title}</a></div>
                    <div className="shrink-0 self-start ml-2">
                      <span className="font-medium text-gray-800 dark:text-gray-100">{post.publish_date}</span>
                    </div>
                  </div>
                </div>
              </li>
              )) : <h3 className="text-left text-red-600 text-bold">暂无该高校招标信息</h3>}
              
            </ul>
          </div>
  
        </div>
      </div>
    )
  }
  