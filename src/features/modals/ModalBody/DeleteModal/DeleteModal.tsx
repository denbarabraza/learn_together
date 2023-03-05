import React, { FC, memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../../common/constans/path'
import ModalButtons from '../../ModalButtons/ModalButtons'
import { changedCardSelector, changedPackSelector } from '../../modalSelectors'

import s from './DeleteModal.module.scss'

import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { deleteCardTC } from 'features/cards/cardSlice'
import { setIsPackDeleted } from 'features/modals/modalSlice'
import { deletePackTC } from 'features/packs/packsSlice'

type DeleteModalType = {
  type: 'card' | 'pack'
}
const DeleteModal: FC<DeleteModalType> = memo(({ type }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const deletedPack = useAppSelector(changedPackSelector)
  const deletedCard = useAppSelector(changedCardSelector)

  const deleteModal = () => {
    if (deletedPack._id) {
      dispatch(setIsPackDeleted(true))
      dispatch(deletePackTC(deletedPack._id)).then(() => navigate(PATH.PACK_LIST))
    }
    if (deletedCard._id) {
      debugger
      dispatch(setIsPackDeleted(true))
      dispatch(deleteCardTC(deletedCard._id))
    }
    resetModalValues(dispatch)
  }

  return (
    <div>
      <div className={s.description}>
        <p>
          Do you really want to remove{' '}
          <span className={s.itemName}>
            {type === 'pack' ? deletedPack.name : deletedCard.question}
          </span>
          ?
        </p>
        {type === 'pack' ? <p>All cards will be deleted.</p> : <p>This card will be deleted.</p>}
      </div>
      <ModalButtons onSuccess={deleteModal} successBtnName={'Delete'} />
    </div>
  )
})

export default DeleteModal
