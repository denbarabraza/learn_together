import React, { memo } from 'react'

import sort from '../../../../assets/sortTable.svg'

import s from './Thead.module.scss'

import { CardListType, PackListType, setSortStatusCards, setSortStatusPack } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { setSearchCardParams } from 'features/cards/cardSlice'
import { setSearchParams } from 'features/packs/packsSlice'

type TheadType = {
  packList?: PackListType
  cardList?: CardListType
}

export const Thead: React.FC<TheadType> = memo(({ packList, cardList }) => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(state => state.packs.searchParams)
  const sortParam = packList ? packList : cardList

  const thList = sortParam?.map((el, i) => {
    const sortHandler = () => {
      const status = el.status === 0 ? 1 : 0

      if (packList) {
        const newPacksList = packList.map(p =>
          p.title === el.title ? { ...p, status: status } : p
        )

        dispatch(setSortStatusPack(newPacksList))
        dispatch(setSearchParams({ ...params, sortPack: `${status}${el.sortName}` }))
      }
      if (cardList) {
        const newPacksList = cardList.map(p =>
          p.title === el.title ? { ...p, status: status } : p
        )

        dispatch(setSortStatusCards(newPacksList))
        dispatch(setSearchCardParams({ ...params, sortCards: `${status}${el.sortName}` }))
      }
    }

    return (
      <th key={i + 1} className={s.th}>
        {i < 4 ? (
          <div className={s.titleContainer}>
            <span className={s.sortText}>{el.title}</span>
            <img
              onClick={sortHandler}
              className={el.status === 1 ? s.iconSort : `${s.iconSort} ${s.rotate}`}
              src={sort}
              alt="sort"
            />
          </div>
        ) : (
          <div className={s.titleContainer}>
            <span className={s.sortText}>{el.title}</span>
          </div>
        )}
      </th>
    )
  })

  return (
    <thead className={s.header}>
      <tr className={s.tr}>{thList}</tr>
    </thead>
  )
})
