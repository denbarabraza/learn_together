import React from 'react'

import { Logo } from '../Logo/Logo'

import s from './Header.module.scss'
import { HeaderProfile } from './HeaderProfile/HeaderProfile'
import { HeaderSignIn } from './HeaderSignIn/HeaderSignIn'

import logo from 'assets/logo.png'
import { useAppSelector } from 'common/hooks'
import { isLoggedInSelector } from 'features/auth/authSelectors'

export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  return (
    <header className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <Logo img={logo} />
          {isLoggedIn ? <HeaderProfile /> : <HeaderSignIn />}
        </div>
      </div>
    </header>
  )
}
