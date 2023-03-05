import React, { ChangeEvent, FC } from 'react'

import s from '../CheckBox/CheckBox.module.scss'

type PropsType = {
  checked: boolean
  onChange: (checked: boolean) => void
  title?: string
}
const CustomCheckbox: FC<PropsType> = ({ checked, onChange, title }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked)
  }

  return (
    <label className={s.labelCheckbox} style={{ marginTop: '20px' }}>
      <input
        className={s.checkbox}
        type={'checkbox'}
        checked={checked}
        onChange={onChangeHandler}
      />
      <span>{title}</span>
    </label>
  )
}

export default CustomCheckbox
