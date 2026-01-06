import React from 'react'
import navLogo from "../../assets/images/logo.png"

export default function Footer() {
  return (
<footer className="bg-neutral-primary-soft rounded-base shadow-xs border border-default m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/home" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={navLogo} className="h-7" alt="Flowbite Logo" />
                <span className="text-heading self-center text-2xl font-black whitespace-nowrap">Nexify</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
                <li>
                    <a href="https://github.com/Ahmedaminn1" target='_blank' className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/ahmed-amin-5112a5287/" target='_blank' className="hover:underline me-4 md:me-6">Linkedin</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8" />
        <span className="block text-sm text-body sm:text-center">© 2026 <a href="https://flowbite.com/" className="hover:underline">Nexify™</a>. All Rights Reserved.</span>
    </div>
</footer>


  )
}
