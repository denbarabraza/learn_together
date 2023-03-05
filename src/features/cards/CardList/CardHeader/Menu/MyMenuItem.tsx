import React, { FC } from 'react'

import { MenuItem } from '@mui/material'

import { CardType } from '../../../cardType'

import Delete from 'assets/Delete.svg'
import edit from 'assets/Edit.svg'
import teacher from 'assets/teacher.svg'
import s from 'common/components/PackMenu/PackMenu.module.scss'

type MyMenuItemType = {
  updatePack: () => void
  deletePack: () => void
  learnHandler: () => void
  cards: CardType[]
}

export const MyMenuItem: FC<MyMenuItemType> = ({ updatePack, deletePack, learnHandler, cards }) => {
  return (
    <>
      <MenuItem onClick={updatePack}>
        <img className={s.icon} src={edit} alt="edit" /> Edit
      </MenuItem>
      <MenuItem onClick={deletePack}>
        <img className={s.icon} src={Delete} alt="delete" /> Delete
      </MenuItem>
      <MenuItem onClick={learnHandler} disabled={cards.length === 0}>
        <img className={s.icon} src={teacher} alt="learn pack" /> Learn
      </MenuItem>
    </>
  )
}
