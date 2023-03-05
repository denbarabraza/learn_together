import React from 'react'

import { AccountMenu } from '../../AccountMenu/AccountMenu'

import s from './HeaderProfile.module.scss'

import { useAppSelector } from 'common/hooks/useAppSelector'
import { userNameHandler } from 'common/utils/userNameHandler'
import { authUserInfoSelector } from 'features/auth/authSelectors'

export const HeaderProfile = () => {
  const user = useAppSelector(authUserInfoSelector)
  const userName = userNameHandler(user.name)

  return (
    <div className={s.profileContainer}>
      <div className={s.userName}>{userName}</div>
      <AccountMenu />
    </div>
  )
}
