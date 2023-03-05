import React, { FC, memo, useState } from 'react'

import { RatingValueType } from '../../../cardType'
import { AnswerStatuses } from '../../learnCardSlice'

import s from './GradesItem.module.scss'
import { Star } from './Star/Star'

import { useAppSelector } from 'common/hooks'

type GradesItemType = {
  onChangeChecked: (isActive: AnswerStatuses, grade: number) => void
}

export const GradesItem: FC<GradesItemType> = memo(({ onChangeChecked }) => {
  const [rating, setRating] = useState<RatingValueType | 0>(0)

  const gradesCardLearn = useAppSelector(state => state.learnCard)

  const changeRating = (rating: RatingValueType) => {
    return () => setRating(rating)
  }

  return (
    <div className={s.gradesItem}>
      <h3 className={s.grades}>Rate yourself:</h3>
      <div className={s.gradesBlock}>
        {gradesCardLearn.map((g, i) => {
          return (
            <div key={i} className={s.inputItem}>
              <label>
                <input
                  type={'checkbox'}
                  className={s.customCheckbox}
                  checked={g.status === AnswerStatuses.IsActive}
                  onChange={e =>
                    onChangeChecked(
                      e.currentTarget.checked ? AnswerStatuses.IsActive : AnswerStatuses.IsNoActive,
                      g.id
                    )
                  }
                />
                <Star
                  selected={rating >= g.id}
                  setRating={changeRating(g.id)}
                  description={g.title}
                />
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
})
