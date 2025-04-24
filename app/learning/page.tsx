"use client"
import { useState } from "react"
import Image from 'next/image'

const Test = () => { 

    const [number, setNumber] = useState(0)

    return(
        <div>
        <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">          
            <Image 
                className="size-12 shrink-0" 
                src="/img/logo.jpg" 
                alt="ChitChat Logo"
                width={48}
                height={48}
            />
            <div>
                <div className="text-xl font-medium text-black dark:text-white">ChitChat</div>
                <p className="text-gray-500 dark:text-gray-400">You have a new message!</p>
                <div>Hello, le compteur est {number}</div>
                <div>
                    <button onClick={() => setNumber(number+1)}>Increment</button>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
            <img className="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/logo.jpg" alt="" />
            <div className="space-y-2 text-center sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg font-semibold text-black">Erin Lindford</p>
                    <p className="font-medium text-gray-500">Product Engineer</p>
                </div>
                <button className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">
                    Message
                </button>
            </div>
        </div>
        </div>
    )
}

export default Test