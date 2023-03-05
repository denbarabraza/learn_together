import React, { memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { DeleteIcon } from '../../Icon/DeleteIcon/Delete'
import { EditIcon } from '../../Icon/EditIcon/EditIcon'
import { TeachIcon } from '../../Icon/TeachIcon/TeachIcon'

import s from './Tbody.module.scss'

import defaultCover from 'assets/defaultPackCover.png'
import { PATH } from 'common/constans/path'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { dateHandler } from 'common/utils/dateHandler'
import { userNameHandler } from 'common/utils/userNameHandler'
import { authUserIdSelector } from 'features/auth/authSelectors'
import { fetchCardTC } from 'features/cards/cardSlice'
import { setChangedPack, setModal } from 'features/modals/modalSlice'
import { PackType } from 'features/packs/packsType'

type TbodyType = {
  packs?: PackType[]
}

export const Tbody: React.FC<TbodyType> = memo(({ packs }) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(authUserIdSelector)
  const navigate = useNavigate()

  return (
    <tbody>
      {packs?.map(t => {
        const dateUpdate = dateHandler(t.updated)
        const userName = userNameHandler(t.user_name)
        const getCardsPack = () => {
          return navigate(`${PATH.CARD_LIST}/${t._id}`)
        }

        const deletePack = () => {
          dispatch(setModal('deletePack'))
          dispatch(setChangedPack(t))
        }

        const updatePack = () => {
          dispatch(setModal('updatePack'))
          dispatch(setChangedPack(t))
        }

        const teachPack = () => {
          dispatch(fetchCardTC(t._id)).then(() => navigate(PATH.CARD_LEARN))
        }

        let resClass = t.cardsCount === 0 ? '#908c8c' : ''
        const teachIcon = resClass ? (
          <TeachIcon stroke={resClass} />
        ) : (
          <TeachIcon onClick={teachPack} stroke={resClass} />
        )

        return (
          <tr key={t._id} className={s.tr}>
            <td onClick={getCardsPack} className={`${s.td} ${s.packTitle}`}>
              <div className={s.packInfo}>
                {t.deckCover ? (
                  <div className={s.img} style={{ backgroundImage: `url(${t.deckCover})` }} />
                ) : (
                  <img src={defaultCover} alt="default cover" className={s.img} />
                )}
                <span className={s.title}>{t.name}</span>
              </div>
            </td>
            <td className={s.td}>{t.cardsCount}</td>
            <td className={s.td}>{dateUpdate}</td>
            <td className={s.td}>{userName}</td>
            <td className={s.td}>
              {t.user_id === userId ? (
                <div className={s.iconContainer}>
                  {teachIcon}

                  <EditIcon onClick={updatePack} />
                  <DeleteIcon onClick={deletePack} />
                </div>
              ) : (
                teachIcon
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
})
