'use client'
// Import necessary components

import Image from 'next/image';
import Components from './components/Components';

export default function Home() {

  return (
    <main className="flex flex-col min-h-screen m-4 mt-0 ">
      <div className="bg-gradient-to-r bg-green-700 p-4 mx-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <Image
            src="/smartphone.png"
            width={40}
            height={40}
            alt="Logo"
          />
          <h1 className="text-xl text-white font-semibold mb-4 ml-2">Problemas de Física - - - Breyner</h1>
        </div>
      </div>
      
      <div>
        <Components></Components>
      </div>

    </main>
  );
}
