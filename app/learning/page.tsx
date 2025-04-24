"use client"
import { useState } from "react"

const test = () => { 

    const [number, setNumber] = useState('0')

    return(
        <div>
            Hello, le compteur est {number}
        </div>
    )
}

export default test