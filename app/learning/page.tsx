"use client"
import { useState } from "react"
import Image from 'next/image'

const Test = () => { 

    const [number, setNumber] = useState(0)

    return(
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
    )
}

export default Test