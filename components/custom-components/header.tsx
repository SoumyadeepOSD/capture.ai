import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import images from '@/constants/images/image'

const Header = () => {
  return (
    <div className="text-white text-sm font-bold flex flex-row items-center justify-between w-full">
      {/* Header */}
      <Image
        src={images.companyLogo}
        alt="company-logo"
        width={150}
        height={150}
      />
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