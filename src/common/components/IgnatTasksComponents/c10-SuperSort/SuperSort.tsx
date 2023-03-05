import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import HeightSharpIcon from '@mui/icons-material/HeightSharp'

// добавить в проект иконки и импортировать
const downIcon = <ArrowDropDownIcon fontSize={'small'} />
const upIcon = <ArrowDropUpIcon fontSize={'small'} />
const noneIcon = <HeightSharpIcon fontSize={'small'} />

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  // return sort === "" ? down : sort === down ? up : sort === up ? "" : down
  if (sort === ``) {
    return down
  } else if (sort === down) {
    return up
  } else if (sort === up) {
    return ``
  }

  return down
}

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'hw15' }) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  let icon

  if (sort === down) {
    icon = downIcon
  } else if (sort === up) {
    icon = upIcon
  } else icon = noneIcon

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      {icon}
    </span>
  )
}

export default SuperSort
