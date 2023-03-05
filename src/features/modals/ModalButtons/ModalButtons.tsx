import React, { FC, memo } from 'react'

import s from './ModalButtons.module.scss'

import { useAppDispatch } from 'common/hooks'
import { resetModalValues } from 'common/utils'

type ModalButtonType = {
  onSuccess: () => void
  successBtnName: string
}

const ModalButtons: FC<ModalButtonType> = memo(({ successBtnName, onSuccess }) => {
  const dispatch = useAppDispatch()
  const cancelHandler = () => {
    resetModalValues(dispatch)
  }

  return (
    <div className={s.innerWrapper}>
      <button className={`${s.cancelBtn} ${s.btn}`} onClick={cancelHandler}>
        Cancel
      </button>
      <button className={s.btn} onClick={onSuccess}>
        {successBtnName}
      </button>
    </div>
  )
})

export default ModalButtons
