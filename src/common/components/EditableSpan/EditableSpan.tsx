import React, { ChangeEvent, useState } from 'react'

import { FieldValues } from 'react-hook-form'

import s from './EditableSpan.module.scss'

import pen from 'assets/pen.svg'
import submit from 'assets/submit.svg'
import { useAppDispatch } from 'common/hooks'
import { formHandler } from 'common/utils'
import { updateNameTC } from 'features/auth/authSlice'

type EditableSpanType = {
  value: string
  onChange?: (newValue: string) => void
}

const EditableSpan: React.FC<EditableSpanType> = ({ value }) => {
  const dispatch = useAppDispatch()

  const [isEditMode, setEditMode] = useState(false)
  const [userName, setUserName] = useState(value)
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
  }
  const { errorName, register, reset, isValid, handleSubmit } = formHandler('name')
  const onSubmit = (data: FieldValues) => {
    dispatch(updateNameTC(data.name))
    setEditMode(false)
  }

  return isEditMode ? (
    <div className={s.inputWrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.labelInput}>
          Nickname
          <input
            {...register('name')}
            value={userName}
            onChange={onChangeName}
            className={errorName ? `${s.input} ${s.errorInput}` : s.input}
          />
          <button disabled={!isValid} type={'submit'} className={s.confirmName}>
            <img className={s.updateIcon} src={submit} alt="submit icon" />
          </button>
        </label>
      </form>
      {errorName && <div className={s.errorName}>{errorName}</div>}
    </div>
  ) : (
    <div className={s.userNameContainer}>
      <h3 className={s.userName}>{value}</h3>
      <img
        onClick={() => setEditMode(true)}
        className={s.iconPen}
        src={pen}
        alt="icon pen for redaction name"
      />
    </div>
  )
}

export default EditableSpan
