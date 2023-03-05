import React from 'react'

import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import { Range } from '../Range/Range'
import { ResetSort } from '../ResetSort/ResetSort'

import s from './Sort.module.scss'

export const Sort = () => {
  return (
    <div className={s.container}>
      <ButtonGroup />
      <Range />
      <ResetSort />
    </div>
  )
}
