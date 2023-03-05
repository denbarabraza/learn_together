import React, { FC } from 'react'

import { MenuItem } from '@mui/material'

import { CardType } from '../../../cardType'

import blockUser from 'assets/blockUser.svg'
import teacher from 'assets/teacher.svg'
import s from 'common/components/PackMenu/PackMenu.module.scss'

type FriendMenuItemType = {
  blockUserHandler: () => void
  learnHandler: () => void
  cards: CardType[]
}

export const FriendMenuItem: FC<FriendMenuItemType> = ({
  blockUserHandler,
  learnHandler,
  cards,
}) => {
  return (
    <>
      <MenuItem onClick={blockUserHandler}>
        <img className={s.icon} src={blockUser} alt="blockUser" /> Block
      </MenuItem>
      <MenuItem onClick={learnHandler} disabled={cards.length === 0}>
        <img className={s.icon} src={teacher} alt="learn pack" /> Learn
      </MenuItem>
    </>
  )
}
