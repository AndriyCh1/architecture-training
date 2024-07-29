import { useEffect, useRef } from 'react'

export const usePrevious = <T = unknown>(value: T) => {
  const previousRef = useRef<T>()

  useEffect(() => {
    previousRef.current = value
  }, [value])

  return previousRef.current
}
