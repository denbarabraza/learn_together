import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import s from './HeaderSignIn.module.scss'

import { PATH } from 'common/constans/path'

export const HeaderSignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const disable = location.pathname === '/login'

  return (
    <button disabled={disable} className={s.btn} onClick={() => navigate(PATH.LOGIN)}>
      Sign In
    </button>
  )
}
