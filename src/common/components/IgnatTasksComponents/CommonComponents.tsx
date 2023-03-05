import React, { useState } from 'react'

import SuperInputText from './c1-SuperInputText/SuperInputText'
import SuperSort from './c10-SuperSort/SuperSort'
import SuperButton from './c2-SuperButton/SuperButton'
import SuperCheckbox from './c3-SuperCheckbox/SuperCheckbox'
import SuperEditableSpan from './c4-SuperEditableSpan/SuperEditableSpan'
import SuperSelect from './c5-SuperSelect/SuperSelect'
import SuperRadio from './c6-SuperRadio/SuperRadio'
import SuperRange from './c7-SuperRange/SuperRange'
import SuperDebouncedInput from './c8-SuperDebouncedInput/SuperDebouncedInput'
import s from './CommonComponents.module.css'

import SuperPagination from 'common/components/Pagination/SuperPagination'

const CommonComponents = () => {
  const arr = [
    { id: 1, value: 'x' },
    { id: 2, value: 'y' },
    { id: 3, value: 'z' },
  ]

  const [value, setValue] = useState<string>('Test')
  const [selected, setSelected] = useState(1)

  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)

  return (
    <div className={s.itemsField}>
      <div className={s.item}>
        Input
        <SuperInputText />
      </div>

      <div className={s.item}>
        Button<SuperButton>Test</SuperButton>
      </div>

      <div className={s.item}>
        Checkbox
        <SuperCheckbox />
      </div>

      <div className={s.item}>
        Span
        <SuperEditableSpan value={value} onChangeText={setValue} />
      </div>

      <div className={s.item}>
        Select
        <SuperSelect value={selected} options={arr} onChangeOption={setSelected} />
      </div>

      <div className={s.item}>
        Radio
        <SuperRadio value={selected} options={arr} onChangeOption={setSelected} />
      </div>

      <div className={s.item}>
        Range
        <SuperRange />
      </div>

      <div className={s.item}>
        DebouncedInput
        <SuperDebouncedInput />
      </div>

      <div className={s.item}>
        Pagination
        <SuperPagination page={page} itemsCountForPage={10} totalCount={100} onChange={setPage} />
      </div>

      <div className={s.item}>
        Sort
        <SuperSort value={''} sort={sort} onChange={setSort} />
      </div>
    </div>
  )
}

export default CommonComponents
