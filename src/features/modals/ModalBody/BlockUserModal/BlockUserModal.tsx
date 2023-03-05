import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { blockUserTC } from '../../../auth/authSlice'
import { userBlockIDSelector } from '../../modalSelectors'

import s from './BlockUserModal.module.scss'

import { InputModal } from 'common/components/InputModal/InputModal'
import { PATH } from 'common/constans/path'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import ModalButtons from 'features/modals/ModalButtons/ModalButtons'

const BlockUserModal = () => {
  const userBlockID = useAppSelector(userBlockIDSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [blockReason, setBlockReason] = useState('')

  const onClickHandler = () => {
    dispatch(
      blockUserTC({
        id: userBlockID,
        blockReason: blockReason,
      })
    ).then(() => navigate(PATH.PACK_LIST))
    resetModalValues(dispatch)
  }

  const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setBlockReason(e.currentTarget.value)
  }
  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickHandler()
    }
  }

  const resetName = () => {
    setBlockReason('')
  }

  return (
    <div>
      <div className={s.description}>
        <div>
          <InputModal
            label={'Block reason'}
            placeholder={'Enter reason'}
            onKeyDown={onEnterHandler}
            value={blockReason}
            onChange={onChangePackName}
            reset={resetName}
            focus={true}
          />
        </div>
      </div>

      <ModalButtons onSuccess={onClickHandler} successBtnName={'Block'} />
    </div>
  )
}

export default BlockUserModal
