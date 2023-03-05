import React, { FC, memo } from 'react'

import { CardType } from '../../cardType'
import s from '../LearnCardItem/LearnCardItem.module.scss'
import { AnswerStatuses } from '../learnCardSlice'

import { GradesItem } from './GradesItem/GradesItem'

import { Button } from 'common/components/Button/Button'

type FormWrapperType = {
  card: CardType
  title: string
  isChecked: boolean
  onChangeChecked: (isActive: AnswerStatuses, grade: number) => void
  onNext: () => void
  onShowAnswer: () => void
}

export const LearnCardItem = memo(
  ({ card, title, isChecked, onChangeChecked, onNext, onShowAnswer }: FormWrapperType) => {
    return (
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.innerWrapper}>
            <h3 className={s.title}>{`Learn "${title}"`}</h3>

            <div className={s.blockQueAns}>
              <div className={s.questionBlock}>
                <h3>Question:</h3>
                <div className={s.questionItem}>
                  {card.questionImg ? (
                    <div
                      className={s.img}
                      style={{ backgroundImage: `url(${card.questionImg})` }}
                    />
                  ) : (
                    <div className={s.question}>{card.question}</div>
                  )}
                </div>
              </div>
              <div className={s.answerBlock}>
                <h3>Answer:</h3>
                <div className={s.answerItem}>
                  {isChecked ? (
                    <AnswerResult card={card} />
                  ) : (
                    <Button title={'Show answer'} callBack={onShowAnswer} isValid={true} />
                  )}
                </div>
              </div>
            </div>
            <div className={s.discriptionBlock}>
              <div className={s.questionDescription}>
                Number of attempts to answer the question: <b>{card.shots}</b>
              </div>
              {isChecked && (
                <>
                  <GradesItem onChangeChecked={onChangeChecked} />
                  <Button title={'Next'} callBack={onNext} isValid={true} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

type AnswerType = {
  card: CardType
}

const AnswerResult: FC<AnswerType> = memo(({ card }) => {
  return (
    <>
      {card.answerImg ? (
        <div className={s.img} style={{ backgroundImage: `url(${card.answerImg})` }} />
      ) : (
        <div className={s.answer}>{card.answer}</div>
      )}
    </>
  )
})
