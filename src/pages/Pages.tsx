import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import RequireAuth from './RequireAuth'

import { UserAccount } from 'common/components/UserAccount/UserAccount'
import { PATH } from 'common/constans/path'
import { Login } from 'features/auth/Login/Login'
import { CheckInfoRecovery } from 'features/auth/Recovery/CheckInfoRecovery'
import { NewPassword } from 'features/auth/Recovery/NewPassword'
import { Recovery } from 'features/auth/Recovery/Recovery'
import { Registration } from 'features/auth/Registration/Registration'
import { CardList } from 'features/cards/CardList/CardList'
import { LearnCardPage } from 'features/cards/LearnCardPage/LearnCardPage'
import { PackList } from 'features/packs/PackList/PackList'

const Pages = () => {
  return (
    <Routes>
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTER} element={<Registration />} />
      <Route path={PATH.RECOVERY} element={<Recovery />} />
      <Route path={PATH.NEW_PASSWORD} element={<NewPassword />}>
        <Route path="*" element={<Navigate to={PATH.NEW_PASSWORD} />} />
        <Route path=":resetPasswordToken" element={<NewPassword />} />
      </Route>
      <Route path={PATH.RECOVERY_INFO} element={<CheckInfoRecovery />} />
      <Route element={<RequireAuth />}>
        <Route path={'/'} element={<Navigate to={PATH.PACK_LIST} />} />
        <Route path={PATH.PACK_LIST} element={<PackList />} />
        <Route path={PATH.CARD_LIST} element={<CardList />} />
        <Route path={PATH.CARD_LIST_ID} element={<CardList />} />
        <Route path={PATH.ACCOUNT} element={<UserAccount />} />
        <Route path={PATH.CARD_LEARN} element={<LearnCardPage />} />
      </Route>
    </Routes>
  )
}

export default Pages
