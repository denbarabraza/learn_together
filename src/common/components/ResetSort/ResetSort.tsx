import React from 'react'

import s from './ResetSort.module.scss'

import { resetSort, setAppError } from 'app/appSlice'
import sort from 'assets/filterRemove.svg'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import {
  packsCountOnPageSelector,
  packsMaxSelector,
  packsMinSelector,
  packsNameSelector,
  packsPageSelector,
  packsSortSelector,
  packsUserIdSelector,
} from 'features/packs/packsSelectors'
import { resetAll, setSearchParams } from 'features/packs/packsSlice'

export const ResetSort = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(packsUserIdSelector)
  const packName = useAppSelector(packsNameSelector)
  const page = useAppSelector(packsPageSelector)
  const min = useAppSelector(packsMinSelector)
  const max = useAppSelector(packsMaxSelector)
  const pageCount = useAppSelector(packsCountOnPageSelector)
  const sortPack = useAppSelector(packsSortSelector)
  const onClick = () => {
    if (
      packName.length > 0 ||
      page !== 1 ||
      min !== 0 ||
      max !== 0 ||
      pageCount !== 10 ||
      sortPack !== ''
    ) {
      dispatch(resetAll())
      dispatch(resetSort())
      dispatch(setSearchParams({ user_id: userId }))
    } else {
      dispatch(setAppError('Nothing to reset...'))
    }
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>Reset Sort</h3>
      <div className={s.sort}>
        <img className={s.sortIcon} src={sort} alt="reset sort" onClick={onClick} />
      </div>
    </div>
  )
}
