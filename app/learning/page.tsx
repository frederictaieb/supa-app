"use client"
//import { useState } from "react"
//import Image from 'next/image'
//import Link from 'next/link'

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full hover:scale-105 transition-transform">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Test Tailwind</h1>
        <p className="text-gray-600">
          Si vous voyez cette carte avec un dégradé en arrière-plan, des ombres, et une animation au survol, Tailwind fonctionne correctement ! 🎉
        </p>
      </div>
      <div>
        <Link href="../profile">Profile</Link>
      </div>
    </div>
  )
}