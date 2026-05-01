import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiHome2Line } from "@remixicon/react";
import { RiSearchLine } from "@remixicon/react";
import { RiAddLargeLine } from "@remixicon/react";
import { RiNotification2Line } from "@remixicon/react";

const FooterNav = () => {
  const location = useLocation()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <RiHome2Line />
    },
    {
      name: 'Search',
      path: '/search',
      icon: <RiSearchLine />
    },
    {
      name: 'Create',
      path: '/create-post',
      icon: <RiAddLargeLine />
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <RiNotification2Line />
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <div>👤</div>
    },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto bg-black ">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center h-full px-4 transition-colors duration-200`}>
            <span className="text-2xl mb-1">{item.icon}</span>
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default FooterNav