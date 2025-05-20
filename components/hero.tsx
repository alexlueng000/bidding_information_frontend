import Image from 'next/image'
import Illustration from '@/public/images/hero-illustration.svg'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true" />

      {/* Illustration */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
        <Image src={Illustration} className="max-w-none" priority alt="Hero Illustration" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        <div className="pt-28 pb-8 md:pt-18 md:pb-8">
          {/* Hero content */}
          <div className="max-w-3xl text-center md:text-left">
            {/* Copy */}
            
            <h2 className="text-lg text-gray-500 mb-8">
              {/* 收集2024年12月1日至今的招标信息  */}
              {/* <br className="hidden md:block" /> up once, and get beautiful results forever. */}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}