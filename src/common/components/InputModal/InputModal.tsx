import React, { ChangeEvent, KeyboardEvent, FC, memo } from 'react'

import clearInput from '../../../assets/clearInput.png'

import s from './InputModal.module.scss'

type InputType = {
  label: string
  placeholder: string
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  reset: () => void
  focus?: boolean
}

export const InputModal: FC<InputType> = memo(
  ({ label, placeholder, onKeyDown, value, onChange, reset, focus }) => {
    return (
      <label className={s.labelInput}>
        {label}
        <div>
          <input
            className={s.input}
            onKeyDown={onKeyDown}
            value={value && value}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus={focus}
          />
          <img className={s.delIcon} src={clearInput} alt="clear icon" onClick={reset} />
        </div>
      </label>
    )
  }
)
