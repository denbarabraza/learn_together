import React, { FC, memo } from 'react'

import s from './Button.module.scss'

type ButtonType = {
  type?: 'submit'
  title: string
  isValid?: boolean
  callBack?: () => void
}

export const Button: FC<ButtonType> = memo(({ type, title, isValid, callBack }) => {
  return (
    <button
      onClick={callBack}
      disabled={isValid ? !isValid : false}
      className={s.btn}
      type={type ? type : undefined}
    >
      {title}
    </button>
  )
})
