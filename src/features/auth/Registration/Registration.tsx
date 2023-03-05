import { useEffect } from 'react'

import { FieldValues } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { isLoggedInSelector, isRegisteredSelector } from '../authSelectors'
import { isRegistred, registerTC } from '../authSlice'

import { Button } from 'common/components/Button/Button'
import { FormWrapper } from 'common/components/Form/FormWrapper/FormWrapper'
import s from 'common/components/Form/FormWrapper/FormWrapper.module.scss'
import { Input } from 'common/components/Input/Input'
import { PATH } from 'common/constans/path'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { formHandler } from 'common/utils'

export const Registration = () => {
  const isRegistered = useAppSelector(isRegisteredSelector)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const dispacth = useAppDispatch()

  useEffect(() => {
    dispacth(isRegistred(false))
  }, [])

  const { errorEmail, errorPassword, errorConfirmPwd, handleSubmit, isValid, register } =
    formHandler('email', 'password', 'confirmPwd')
  const onSubmit = (data: FieldValues) => {
    const { email, password } = data

    dispacth(registerTC({ email, password }))
  }

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN} />
  }

  if (isLoggedIn) {
    return <Navigate to={PATH.PACK_LIST} />
  }

  return (
    <FormWrapper
      linkTitle={'Sign In'}
      linkPath={PATH.LOGIN}
      title={'Sign Up'}
      questionText={'Already have an account?'}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={'email'}
          label={'Email'}
          nameForValidate={'email'}
          placeholder={'example@gmail.com'}
          register={register}
          error={errorEmail}
        />

        <Input
          type={'password'}
          label={'Password'}
          nameForValidate={'password'}
          placeholder={'example12'}
          register={register}
          error={errorPassword}
        />

        <Input
          type={'password'}
          label={'Confirm password'}
          nameForValidate={'confirmPwd'}
          placeholder={'********'}
          register={register}
          error={errorConfirmPwd}
        />

        <Button isValid={isValid} type={'submit'} title={'Create account'} />
      </form>
    </FormWrapper>
  )
}
