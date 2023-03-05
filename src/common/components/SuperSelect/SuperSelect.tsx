import React, { DetailedHTMLProps, FC, memo, SelectHTMLAttributes } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
}

export const SuperSelect: FC<SuperSelectPropsType> = memo(
  ({ options, className, onChange, onChangeOption, value, ...restProps }) => {
    const mappedOptions: any[] = options
      ? options.map(o => (
          <MenuItem key={o.id} value={o.id}>
            {o.value}
          </MenuItem>
        ))
      : []

    const onChangeCallback = (e: SelectChangeEvent) => {
      onChangeOption?.(e.target.value)
    }

    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">rows</InputLabel>
        <Select
          className={s.select}
          value={'' + value}
          labelId="demo-select-small"
          id="demo-select-small"
          label="rows"
          onChange={onChangeCallback}
        >
          {mappedOptions}
        </Select>
      </FormControl>
    )
  }
)
