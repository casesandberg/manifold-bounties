import React from 'react'

export const Suspender = (): React.ReactElement => {
  const resolve = React.useRef<() => void>()
  const promise = React.useMemo(
    () =>
      new Promise<void>((res) => {
        resolve.current = res
      }),
    [],
  )

  React.useEffect(() => {
    return () => {
      resolve.current?.()
    }
  })

  throw promise
}
