'use client'

import _ from 'lodash'
import { MotionValue, motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export function Counter({ value, height = 28 }: { value: number; height?: number }) {
  if (!value) {
    return null
  }
  return (
    <div className="flex overflow-hidden rounded leading-none">
      {value > 9999 && <Digit place={10000} value={value} height={height} />}
      {value > 999 && <Digit place={1000} value={value} height={height} />}
      <Digit place={100} value={value} height={height} />
      <Digit place={10} value={value} height={height} />
      <Digit place={1} value={value} height={height} />
    </div>
  )
}

function Digit({ place, value, height }: { place: number; value: number; height: number }) {
  let valueRoundedToPlace = Math.floor(value / place)
  let animatedValue = useSpring(valueRoundedToPlace)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {_.range(10).map((i: number) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  )
}

function Number({ mv, number, height }: { mv: MotionValue; number: number; height: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10
    let offset = (10 + number - placeValue) % 10

    let memo = offset * height

    if (offset > 5) {
      memo -= 10 * height
    }

    return memo
  })

  return (
    <motion.span style={{ y }} className="absolute inset-0 flex items-center justify-center">
      {number}
    </motion.span>
  )
}
