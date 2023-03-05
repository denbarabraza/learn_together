import React, { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState } from 'react'

import ModalButtons from '../../ModalButtons/ModalButtons'
import { cardsPackIdSelector, changedCardSelector } from '../../modalSelectors'

import s from './CreateCardModal.module.scss'

import { InputModal } from 'common/components/InputModal/InputModal'
import { InputTypeFile } from 'common/components/InputTypeFile/InputTypeFile'
import { OptionsType, SelectModal } from 'common/components/SelectModal/SelectModal'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { createCardTC, updateCardTC } from 'features/cards/cardSlice'

type CreateModalType = {
  type: 'create' | 'update'
}

const CreateCardModal: FC<CreateModalType> = memo(({ type }) => {
  const options: OptionsType[] = ['Text', 'Picture']

  const dispatch = useAppDispatch()
  const changedCard = useAppSelector(changedCardSelector)
  const cardsPackId = useAppSelector(cardsPackIdSelector)

  let selectQuestionValue = changedCard.questionImg ? 'Picture' : 'Text'
  let selectAnswerValue = changedCard.answerImg ? 'Picture' : 'Text'

  const [selectQuestion, setSelectQuestion] = useState<'Text' | 'Picture' | string>(
    type === 'create' ? 'Text' : selectQuestionValue
  )
  const [selectAnswer, setSelectAnswer] = useState<'Text' | 'Picture' | string>(
    type === 'create' ? 'Text' : selectAnswerValue
  )

  let cardQuestionValue = selectQuestion === 'Text' ? changedCard.question : ''
  let cardAnswerValue = selectAnswer === 'Text' ? changedCard.answer : ''
  let questionImgValue = selectQuestion === 'Text' ? '' : changedCard.questionImg
  let answerImgValue = selectAnswer === 'Text' ? '' : changedCard.answerImg

  const [cardQuestion, setCardQuestion] = useState(type === 'create' ? '' : cardQuestionValue)
  const [cardAnswer, setCardAnswer] = useState(type === 'create' ? '' : cardAnswerValue)
  const [questionImg, setQuestionImg] = useState(type === 'create' ? '' : questionImgValue)
  const [answerImg, setAnswerImg] = useState(type === 'create' ? '' : answerImgValue)

  const onChangeCardQuestion = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCardQuestion(e.currentTarget.value)
  }, [])
  const onChangeCardAnswer = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCardAnswer(e.currentTarget.value)
  }, [])

  const onClickHandler = useCallback(() => {
    type === 'create'
      ? dispatch(
          createCardTC({
            card: {
              cardsPack_id: cardsPackId,
              question: cardQuestion,
              answer: cardAnswer,
              questionImg: questionImg,
              answerImg: answerImg,
            },
          })
        )
      : dispatch(
          updateCardTC({
            updateCard: {
              card: {
                _id: changedCard._id,
                question: cardQuestion,
                answer: cardAnswer,
                questionImg: questionImg,
                answerImg: answerImg,
              },
            },
            cardsPackID: cardsPackId,
          })
        )
    resetModalValues(dispatch)
  }, [cardsPackId, cardQuestion, cardAnswer, changedCard._id, questionImg, answerImg])

  const onEnterHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickHandler()
    }
  }, [])

  const resetCardQuestion = useCallback(() => {
    setCardQuestion('')
  }, [])

  const resetCardAnswer = useCallback(() => {
    setCardAnswer('')
  }, [])

  return (
    <div className={s.container}>
      <div className={s.description}>
        <SelectModal
          label={'Choose a question format'}
          selectValue={selectQuestion}
          options={options}
          onChange={setSelectQuestion}
        />
      </div>
      {selectQuestion === 'Text' ? (
        <div className={s.description}>
          <InputModal
            label={'Question'}
            placeholder={'Question'}
            onKeyDown={onEnterHandler}
            value={cardQuestion}
            onChange={onChangeCardQuestion}
            reset={resetCardQuestion}
            focus={true}
          />
        </div>
      ) : (
        <div className={s.description}>
          <InputTypeFile
            label={'Question'}
            callback={setQuestionImg}
            defaultFile={changedCard.questionImg}
          />
        </div>
      )}

      <div className={s.description}>
        <SelectModal
          label={'Choose a answer format'}
          selectValue={selectAnswer}
          options={options}
          onChange={setSelectAnswer}
        />
      </div>
      {selectAnswer === 'Text' ? (
        <div className={s.description}>
          <InputModal
            label={'Answer'}
            placeholder={'Answer'}
            onKeyDown={onEnterHandler}
            value={cardAnswer}
            onChange={onChangeCardAnswer}
            reset={resetCardAnswer}
          />
        </div>
      ) : (
        <div className={s.description}>
          <InputTypeFile
            label={'Answer'}
            callback={setAnswerImg}
            defaultFile={changedCard.answerImg}
          />
        </div>
      )}

      <ModalButtons
        onSuccess={onClickHandler}
        successBtnName={type === 'create' ? 'Add' : 'Save'}
      />
    </div>
  )
})

export default CreateCardModal
