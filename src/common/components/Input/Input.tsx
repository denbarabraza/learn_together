import React, { FC, memo, useState } from 'react'

import { FieldValues, UseFormRegister } from 'react-hook-form'

import s from './Input.module.scss'

import noEye from 'assets/eye-close.svg'
import eye from 'assets/eye.svg'

type InputType = {
  label: string
  type: string
  placeholder?: string
  error?: string
  register: UseFormRegister<FieldValues>
  nameForValidate: string
}

export const Input: FC<InputType> = memo(
  ({ type, label, placeholder, error, register, nameForValidate }) => {
    const [typeInput, setTypeInput] = useState<string>(type)
    const showPasswordHandler = () => {
      typeInput === 'password' ? setTypeInput('text') : setTypeInput('password')
    }

    const iconPas = typeInput === 'password' ? eye : noEye

    return (
      <label className={s.labelInput}>
        {label}
        <input
          {...register(nameForValidate)}
          className={error ? `${s.input} ${s.errorInput}` : s.input}
          type={typeInput}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <img
            onClick={showPasswordHandler}
            className={s.iconShowPassword}
            src={iconPas}
            alt={'icon eye'}
          />
        )}
        {error && <div className={s.errorText}>{error}</div>}
      </label>
    )
  }
)
