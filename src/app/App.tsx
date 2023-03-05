import React, { useEffect } from 'react'

import './App.css'

import { appStatusSelector, isInitializedSelector } from './appSelectors'

import { Header } from 'common/components/Header/Header'
import Loader from 'common/components/Loader/Loader'
import SimpleSnackbar from 'common/components/SnackBar/Snackbar'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { authMeTC } from 'features/auth/authSlice'
import Modal from 'features/modals/Modal'
import { modalTypeSelector } from 'features/modals/modalSelectors'
import Pages from 'pages/Pages'

function App() {
  const dispatch = useAppDispatch()

  const isInitialized = useAppSelector(isInitializedSelector)
  const appStatus = useAppSelector(appStatusSelector)
  const modalType = useAppSelector(modalTypeSelector)

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <div className={modalType !== 'idle' ? 'app modalActive' : 'app'}>
      <Header />
      <Modal modalType={modalType} />
      <Pages />
      <SimpleSnackbar />
      {appStatus === 'loading' && <Loader />}
    </div>
  )
}

export default App
