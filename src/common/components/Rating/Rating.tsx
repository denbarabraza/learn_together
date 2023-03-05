import React, { memo } from 'react'

import StarIcon from '@mui/icons-material/Star'
import Rating from '@mui/material/Rating'

type RatingCard = {
  value: number
}

export const CardsRating: React.FC<RatingCard> = memo(({ value }) => {
  return (
    <div>
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.25}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </div>
  )
})
