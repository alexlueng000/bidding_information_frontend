import Link from 'next/link'

interface PaginationNumericProps {
    currentPage: number,
    totalPages: number,
}


export default function PaginationNumeric({ currentPage, totalPages }: PaginationNumericProps) {

    const maxVisiblePages = 5

    const getVisiblePages = () => {
        const pages = [];

        // Show all pages if total pages are less than or equal to maxVisiblePages
        if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
        }

        // Handle pages at the start (near the first page)
        if (currentPage <= 2) { // This condition is modified to include page 4 when current page is 3
        pages.push(1, 2, 3);
        pages.push('...'); // Ellipsis after the first few pages
        pages.push(totalPages); // Always show the last page
        return pages;
        }

        // Handle pages at the end (near the last page)
        if (currentPage >= totalPages - 2) {
        pages.push(1); // Always show the first page
        pages.push('...'); // Ellipsis before the last few pages
        for (let i = totalPages - 2; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
        }

        // General case: pages around the current page with ellipses
        pages.push(1); // Always show the first page
        pages.push('...'); // Ellipsis before the current page range

        // Add current page and surrounding pages
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
        }

        pages.push('...'); // Ellipsis after the current page range
        pages.push(totalPages); // Always show the last page
        
        return pages;
    }


    const visiblePages = getVisiblePages();

    return (
      <div className="flex justify-center">
        <nav className="flex" role="navigation" aria-label="Navigation">
          <div className="mr-2">
            <Link
                href={`?skip=${currentPage - 1}&limit=10`}
                className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 ${
                currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }`}
                aria-disabled={currentPage === 1}
            >
                {/* <span className="inline-flex items-center justify-center rounded-lg leading-5 px-2.5 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 text-gray-300 dark:text-gray-600"> */}
                <span className="sr-only">Previous</span><wbr />
                <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
                </svg>
                {/* </span> */}
            </Link>
          </div>
        {/* Page Numbers */}
        <ul className="inline-flex text-sm font-medium -space-x-px rounded-lg shadow-sm">
          {visiblePages.map((page, index) => (
            <li key={index}>
              {page === '...' ? (
                <span className="inline-flex items-center justify-center px-3.5 py-2 bg-white border border-gray-200 text-gray-600">
                  ...
                </span>
              ) : (
                <Link
                  href={`?skip=${page}&limit=10`}
                  className={`inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white border border-gray-200 ${
                    currentPage === page ? 'text-indigo-500' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </Link>
              )}
            </li>
          ))}
        </ul>

          <div className="ml-2">
            <Link
                href={`?skip=${currentPage + 1}&limit=10`}
                className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 ${
                currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
                }`}
                aria-disabled={currentPage === totalPages}
            >
                {/* <a href="#0" className="inline-flex items-center justify-center rounded-lg leading-5 px-2.5 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-700/60 text-violet-500 shadow-sm"> */}
                <span className="sr-only">Next</span><wbr />
                <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
                </svg>
                {/* </a> */}
            </Link>
          </div>
        </nav>
      </div>
    )
  }