import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import s from './Search.module.scss'

import del from 'assets/close.png'
import search from 'assets/search.svg'
import { useDebounce } from 'common/hooks'

type SearchPropsType = {
  initialValue: string
  onChange: (value: string) => void
}

export const Search: FC<SearchPropsType> = memo(({ initialValue, onChange }) => {
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const [value, setValue] = useState<string>(initialValue)

  let debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const onClickDelHandler = () => {
    setValue('')
  }

  useEffect(() => {
    onChange(value)
  }, [debouncedValue])

  return (
    <div className={s.container}>
      <h3 className={s.title}>Search</h3>
      <div className={s.inputContainer}>
        <input
          key={initialValue}
          className={s.search}
          type="text"
          placeholder={'Search by name'}
          value={value}
          onChange={handleChange}
        />
        <img className={s.searchIcon} src={search} alt="search icon" />
        <img className={s.delIcon} src={del} alt="del icon" onClick={onClickDelHandler} />
      </div>
    </div>
  )
})
