'use client'

import { useEffect, useState } from 'react'

const CountUp = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (target === 0) return
    const duration = 200
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target])

  return <>{count}</>
}

export default CountUp
