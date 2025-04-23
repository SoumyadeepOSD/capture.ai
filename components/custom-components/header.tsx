import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <div className="text-white text-sm font-bold flex flex-row items-center justify-between w-full">
      {/* Header */}
      <p>App Logo</p>
      <ul className="flex flex-row items-center gap-6">
        <li className="hover:cursor-pointer">Home</li>
        <li className="hover:cursor-pointer">About</li>
        <li className="hover:cursor-pointer">Settings</li>
      </ul>
      {/* Right Side */}
      <div>
        <Link href="/signup">
          <Button className="hover:cursor-pointer">Signup</Button>
        </Link>
        <Link href="/login">
          <Button className="hover:cursor-pointer" variant="secondary">Signin</Button>
        </Link>
      </div>
    </div>
  )
}

export default Header