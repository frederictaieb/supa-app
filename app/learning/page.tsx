"use client"
//import { useState } from "react"
//import Image from 'next/image'
//import Link from 'next/link'
import Form from 'next/form'

export default function Test() {
    return (
        <Form action="/search">
          {/* On submission, the input value will be appended to
              the URL, e.g. /search?query=abc */}
          <input name="query" />
          <button type="submit">Submit</button>
        </Form>
      )
}
