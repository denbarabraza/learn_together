import { FieldValues } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { isLoggedInSelector } from '../authSelectors'
import { loginTC } from '../authSlice'

import { Button } from 'common/components/Button/Button'
import { CheckBox } from 'common/components/CheckBox/CheckBox'
import { FormWrapper } from 'common/components/Form/FormWrapper/FormWrapper'
import s from 'common/components/Form/FormWrapper/FormWrapper.module.scss'
import { Input } from 'common/components/Input/Input'
import { PATH } from 'common/constans/path'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { formHandler } from 'common/utils'

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const { errorEmail, errorPassword, handleSubmit, isValid, register } = formHandler(
    'email',
    'password'
  )
  const onSubmit = (data: FieldValues) => {
    dispatch(loginTC(data))
  }

  if (isLoggedIn) {
    return <Navigate to={PATH.PACK_LIST} />
  }

  return (
    <FormWrapper
      title={'Sign In'}
      forgot={true}
      recoveryPath={PATH.RECOVERY}
      questionText={'Do not have an account?'}
      linkPath={PATH.REGISTER}
      linkTitle={'Sign Up'}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={'email'}
          label={'Email'}
          placeholder={'example@gmail.com'}
          register={register}
          error={errorEmail}
          nameForValidate={'email'}
        />

        <Input
          type={'password'}
          label={'Password'}
          placeholder={'example12'}
          register={register}
          error={errorPassword}
          nameForValidate={'password'}
        />
        <CheckBox label={'Remember Me'} nameForValidate={'rememberMe'} register={register} />
        <Button isValid={isValid} title={'Sign In'} type={'submit'}></Button>
      </form>
    </FormWrapper>
  )
}
