import React, { memo, useEffect } from 'react'

import Delete from '../../../../assets/Delete.svg'
import edit from '../../../../assets/Edit.svg'
import { CardsRating } from '../../Rating/Rating'

import s from './TbodyCard.module.scss'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { dateHandler } from 'common/utils'
import { CardType } from 'features/cards/cardType'
import { setChangedCard, setChangedPack, setModal } from 'features/modals/modalSlice'
import { PackType } from 'features/packs/packsType'

type TbodyType = {
  cards?: CardType[]
  pack?: PackType
}

export const TbodyCard: React.FC<TbodyType> = memo(({ cards, pack }) => {
  const userId = useAppSelector(state => state.auth.user._id)
  const packUserId = useAppSelector(state => state.card.searchParams.packUserId)
  const dispatch = useAppDispatch()

  let isMyCard = userId === packUserId

  const onClickDeleteHandler = (card: CardType) => {
    dispatch(setModal('deleteCard'))
    dispatch(setChangedCard(card))
  }
  const onClickUpdateHandler = (card: CardType) => {
    dispatch(setModal('updateCard'))
    dispatch(setChangedCard(card))
    dispatch(setChangedPack(pack || ({} as PackType)))
  }

  useEffect(() => {}, [packUserId])

  return (
    <tbody>
      {cards?.map(t => {
        const update = dateHandler(t.updated)

        return isMyCard ? (
          <tr key={t._id} className={s.tr}>
            {t.questionImg ? (
              <td className={s.td}>
                <div className={s.img} style={{ backgroundImage: `url(${t.questionImg})` }} />
              </td>
            ) : (
              <td className={s.td}>{t.question}</td>
            )}
            {t.answerImg ? (
              <td className={s.td}>
                <div className={s.img} style={{ backgroundImage: `url(${t.answerImg})` }} />
              </td>
            ) : (
              <td className={s.td}>{t.answer}</td>
            )}

            <td className={s.td}>{update}</td>
            <td className={s.td}>
              <div className={s.gradeColumn}>
                <div className={s.grade}>
                  <CardsRating value={t.grade} />
                </div>
                <div className={s.iconContainer}>
                  <img
                    className={s.icon}
                    onClick={() => onClickUpdateHandler(t)}
                    src={edit}
                    alt="edit"
                  />
                  <img
                    className={s.icon}
                    onClick={() => onClickDeleteHandler(t)}
                    src={Delete}
                    alt="delete"
                  />
                </div>
              </div>
            </td>
          </tr>
        ) : (
          <tr key={t._id} className={s.tr}>
            <td className={s.td}>{t.question}</td>
            <td className={s.td}>{t.answer}</td>
            <td className={s.td}>{update}</td>
            <td className={s.td}>
              <CardsRating value={t.grade} />
            </td>
          </tr>
        )
      })}
    </tbody>
  )
})
