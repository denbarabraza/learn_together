import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from 'common/constans/path'
import { useAppSelector } from 'common/hooks'
import { isLoggedInSelector } from 'features/auth/authSelectors'

const RequireAuth = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector)

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

  return <Outlet />
}

export default RequireAuth
