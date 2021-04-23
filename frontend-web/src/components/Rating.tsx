import React from 'react'
import { StarFill, Star, StarHalf } from 'react-bootstrap-icons'

interface Props {
  value: number
  text: string
}

const Rating: React.FC<Props> = ({ value, text }) => {
  const stars = []
  let star
  for (let i = 0; i < 5; i++) {
    star = <Star className="mb-1" />
    if (value >= 1 + i) {
      star = <StarFill className="mb-1" />
    } else if (value >= 0.5 + i) {
      star = <StarHalf className="mb-1" />
    }
    stars.push(
      <span style={{ color: '#f8e825' }} key={i}>
        {star}
      </span>
    )
  }
  return (
    <div className="rating">
      {stars}
      <span className="">{text && text}</span>
    </div>
  )
}

export default Rating
