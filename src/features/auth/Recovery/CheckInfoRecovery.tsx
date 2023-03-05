import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import sendMessage from '../../../assets/sendMessage.png'
import s from '../../../common/components/Header/HeaderSignIn/HeaderSignIn.module.scss'
import { getRecoveryEmailSelector } from '../authSelectors'
import { isMessageSend } from '../authSlice'

import style from './CheckInfoRecovery.module.css'

import { FormWrapper } from 'common/components/Form/FormWrapper/FormWrapper'
import { PATH } from 'common/constans/path'
import { useAppDispatch, useAppSelector } from 'common/hooks'

export const CheckInfoRecovery = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(isMessageSend(false))
  }, [])

  const email = useAppSelector(getRecoveryEmailSelector)

  const onClickInInfoHandler = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <FormWrapper title={'Check Email'}>
      <img src={sendMessage} alt={'sen message'} />
      <div className={style.discription}>
        We’ve sent an Email with instructions to <div>{email}</div>
      </div>
      <button className={s.btn} onClick={onClickInInfoHandler}>
        Back to login
      </button>
    </FormWrapper>
  )
}
