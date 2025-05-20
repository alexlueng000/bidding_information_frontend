import Link from 'next/link'
import { usePathname } from 'next/navigation'

import HeaderLogo from '@/components/ui/header-logo'

export default function Header() {

  const pathname = usePathname()

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <HeaderLogo />
          </div>

          {/* Desktop navigation */}
          <nav className="flex grow">
            <span className="font-nycd text-indigo-500 text-3xl">招标信息收集平台</span>
          </nav>
        </div>
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700/60 mt-12">
      <ul className="text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
        <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
          <Link
            href="/"
            className={`whitespace-nowrap flex items-center ${
              pathname === '/'
                ? 'text-violet-500' // 高亮样式
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300' // 默认样式
            }`}
          >
            <svg className="shrink-0 fill-current mr-2" width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-5.143 7.91a1 1 0 1 1-1.714-1.033A7.996 7.996 0 0 1 8 10a7.996 7.996 0 0 1 6.857 3.877 1 1 0 1 1-1.714 1.032A5.996 5.996 0 0 0 8 12a5.996 5.996 0 0 0-5.143 2.91Z" />
            </svg>
            <span className="text-lg">首页</span>
          </Link>
        </li>
        <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
          <Link
            href="/universities"
            className={`whitespace-nowrap flex items-center ${
              pathname === '/universities'
                ? 'text-violet-500' // 高亮样式
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300' // 默认样式
            }`}
          >
            <svg className="shrink-0 fill-current text-gray-400 dark:text-gray-500 mr-2" width="16" height="16" viewBox="0 0 16 16">
              <path d="m9 12.614 4.806 1.374a.15.15 0 0 0 .174-.21L8.133 2.082a.15.15 0 0 0-.268 0L2.02 13.777a.149.149 0 0 0 .174.21L7 12.614V9a1 1 0 1 1 2 0v3.614Zm-1 1.794-5.257 1.503c-1.798.514-3.35-1.355-2.513-3.028L6.076 1.188c.791-1.584 3.052-1.584 3.845 0l5.848 11.695c.836 1.672-.714 3.54-2.512 3.028L8 14.408Z" />
            </svg>
            <span className="text-lg">高校招标信息</span>
          </Link>
        </li>
      </ul>
    </div>
      </div>
    </header>
  )
}
