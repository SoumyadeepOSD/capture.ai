import Header from '@/components/custom-components/header'
import SmallLine from '@/components/custom-components/small-line';
import { Button } from '@/components/ui/button';
import React from 'react'
import Link from 'next/link';

const App = () => {
  return (
    <div className="bg-black h-[100%] w-[100%] p-10 overflow-x-hidden font-roboto-mono">
      <Header />
      <div className="flex flex-col items-center text-white font-extrabold text-6xl mt-10">
        <h1 className="text-transparent bg-gradient-to-br from-blue-700 to-green-500 bg-clip-text">Master Your Notes</h1>
        <h1>Efforlessly</h1>
      </div>

      <p className="text-white text-center font-semibold my-5">Organize, create, and access your notes anytime, anwhere.</p>
      <div className="flex flex-row items-center justify-center">
        <Link href="/home">
        <Button className="text-white bg-blue-600 w-[300px] h-[50px] mt-10">Get Started</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-6xl font-extrabold text-white text-center mt-[300px]">Features</h1>
        <SmallLine />
      </div>
    </div>
  )
}

export default App;