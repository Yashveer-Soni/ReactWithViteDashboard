import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { logout } from '../../Auth/authSlice';
import { useDispatch } from 'react-redux';

export default function header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
};
  return (
    <header class="w-full border-b flex justify-center items-center">
  <div class="flex flex-col w-full max-w-[1300px] items-center justify-between gap-2 px-4 py-2 md:gap-4 md:flex-row md:py-4 lg:gap-2 lg:px-6 lg:py-6">
    <div class="flex items-center gap-4 shrink-0 ">
      <a class="flex items-center gap-2 font-semibold" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
          <path d="M12 3v6"></path>
        </svg>
        <span class="">Acme Inc</span>
      </a>
    </div>
    <div class="hidden md:flex flex-1 items-center gap-4 max-w-2xl">
      <form class="flex-1">
        <div class="relative">
          <Icon class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"icon="mynaui:search" width={20}></Icon>
          <input
            class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 bg-gray-100/40 appearance-none dark:bg-gray-800/40"
            type="search"
            placeholder="Search"
          />
        </div>
      </form>
      </div>

      <div className='flex gap-4'>
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800">
        <Icon width={20} icon="mdi:heart-outline"></Icon>
        <span class="sr-only">Toggle wishlist</span>
      </button>
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800">
       <Icon width={20} icon="mdi:user-outline"></Icon>
        <span class="sr-only">Toggle account</span>
      </button>
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800">
        <Icon width={20} icon="solar:bag-line-duotone"></Icon>
        <span class="sr-only">Toggle cart</span>
      </button>
      <button onClick={handleLogout} class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full">
        Log Out
      </button>
    </div>
  </div>
</header>
  )
}
