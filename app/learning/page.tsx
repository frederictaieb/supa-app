"use client"
import { useState } from "react"

const Test = () => { 

    const [number, setNumber] = useState(0)

    return(
        <div>
            Hello, le compteur est {number}
            <button onClick={() => setNumber(number+1)}>Increment</button>
        </div>
    )
}

export default Test