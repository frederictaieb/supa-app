"use client"
import { useState } from "react"

const Test = () => { 

    const [number, setNumber] = useState(0)

    return(
        <div>
            <div>Hello, le compteur est {number}</div>
            <div>
                <button onClick={() => setNumber(number+1)}>Increment</button>
            </div>
        </div>
    )
}

export default Test