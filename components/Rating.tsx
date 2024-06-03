'use client'

import { useState } from 'react'

type RatingProps = {
  star: number
  totalCount?: number
  size?: number
  readOnly?: boolean
  withLabel?: boolean
  onClick?: (value: number) => void
}

const Rating = ({
  star,
  totalCount = undefined,
  size = 20,
  readOnly = false,
  withLabel = false,
  onClick,
}: RatingProps) => {
  const [hoverValue, setHoverValue] = useState(star)
  const [clickValue, setClickValue] = useState(star)
  const [isHovered, setIsHovered] = useState(false)
  const arr = [1, 2, 3, 4, 5]

  const calcRes = (
    amount: number,
    event: React.MouseEvent<HTMLSpanElement>,
  ) => {
    const target = event.target as HTMLSpanElement
    const rect = target.getBoundingClientRect()
    const clickX = event.pageX
    const positionX = rect.left + window.scrollX
    const x = clickX - positionX
    const half = rect.width / 2
    let res = amount
    if (x < half) {
      res = amount - 0.5
    }
    return res
  }

  const handleOnClick = (
    amount: number,
    event: React.MouseEvent<HTMLSpanElement>,
  ) => {
    const res = calcRes(amount, event)
    setClickValue(res)
    setHoverValue(res)
    if (onClick) {
      onClick(res)
    }
  }

  const handleOnHover = (
    amount: number,
    event: React.MouseEvent<HTMLSpanElement>,
  ) => {
    setIsHovered(true)
    const res = calcRes(amount, event)
    setHoverValue(res)
  }

  return (
    <div className='flex items-center gap-2'>
      {withLabel && <span className=''>{clickValue}</span>}
      <div
        className='relative inline-block select-none items-center'
        style={{
          cursor: readOnly ? 'auto' : 'pointer',
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
      >
        <div
          className='flex overflow-hidden whitespace-nowrap'
          style={{
            fontSize: `${size}px`,
          }}
        >
          {arr.map((num: number) => {
            return (
              <span
                key={`star-${num}`}
                className='pr-0.5'
                onMouseMove={readOnly ? () => {} : (e) => handleOnHover(num, e)}
                onClick={readOnly ? () => {} : (e) => handleOnClick(num, e)}
              >
                ☆
              </span>
            )
          })}
        </div>
        <div
          className='absolute left-0 top-0 flex overflow-hidden whitespace-nowrap'
          style={{
            fontSize: `${size}px`,
            width: isHovered
              ? `${hoverValue * 2 * 10}%`
              : `${clickValue * 2 * 10}%`,
            pointerEvents: 'none',
          }}
        >
          {arr.map((num: number) => {
            return (
              <span key={`star-active-${num}`} className='pr-0.5'>
                ★
              </span>
            )
          })}
        </div>
      </div>
      {totalCount && <span className=''>({totalCount})</span>}
    </div>
  )
}

export default Rating
