import { UseAppDispatch } from '../hooks/useAppDispatch'

import { CardType } from 'features/cards/cardType'
import {
  setChangedCard,
  setChangedPack,
  setIsPackDeleted,
  setModal,
  setUserID,
} from 'features/modals/modalSlice'
import { PackType } from 'features/packs/packsType'

export const resetModalValues = (dispatch: UseAppDispatch) => {
  dispatch(setUserID(''))
  dispatch(setModal('idle'))
  dispatch(setIsPackDeleted(false))
  dispatch(setChangedPack({} as PackType))
  dispatch(setChangedCard({} as CardType))
}
