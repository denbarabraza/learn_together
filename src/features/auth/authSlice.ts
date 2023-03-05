import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form'

import { authApi, BlockUserType, RegistrationRequestType, SetNewPasswordType } from './authApi'

import { isInitialized, setAppError, setAppStatus } from 'app/appSlice'
import { errorUtils } from 'common/utils'

export type UserType = {
  _id: string
  email: string
  avatar?: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}

type InitialStateType = {
  isLoggedIn: boolean
  isRegistered: boolean
  user: UserType
  emailInRecovery: string
  isPasswordChanged: boolean
  isMessageSend: boolean
}

export const authMeTC = createAsyncThunk('isLoggedIn', async (_, { dispatch }) => {
  dispatch(isInitialized(false))
  try {
    const res = await authApi.authMe()

    dispatch(isLoggedIn(true))
    dispatch(setUser(res.data))
  } catch (e: any) {
    // errorUtils(e, dispatch)
  } finally {
    dispatch(isInitialized(true))
  }
})

export const registerTC = createAsyncThunk(
  'isRegistred',
  async (data: RegistrationRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authApi.register(data)

      dispatch(isRegistred(true))
      dispatch(setAppError('Account created'))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(isRegistred(false))
    }
  }
)

export const loginTC = createAsyncThunk('login', async (data: FieldValues, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await authApi.loggedIn(data)

    dispatch(isLoggedIn(true))
    dispatch(setUser(res.data))
    dispatch(setAppStatus('success'))
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

export const logoutTC = createAsyncThunk('logout', async (_, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await authApi.logout()

    dispatch(isLoggedIn(false))
    dispatch(setAppError(res.data.info))
    dispatch(setAppStatus('success'))
  } catch (e: any) {
    errorUtils(e, dispatch)
  } finally {
    dispatch(isInitialized(true))
  }
})

export const recoveryTC = createAsyncThunk('recovery', async (email: string, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await authApi.recoveryPassword(email)

    dispatch(setEmailInRecovery(email))
    dispatch(setAppError('Message has been sent'))
    dispatch(isMessageSend(true))
    dispatch(setAppStatus('success'))
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

export const setNewPasswordTC = createAsyncThunk(
  'newPassword',
  async (data: SetNewPasswordType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authApi.setNewPassword(data)

      dispatch(isPasswordChanged(true))
      dispatch(setAppError('Password changed'))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const blockUserTC = createAsyncThunk(
  'blockUser',
  async (data: BlockUserType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authApi.blockUser(data)

      dispatch(setAppError('User has been blocked'))

      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const updateNameTC = createAsyncThunk(
  'updateName',
  async (newName: string, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authApi.update({ name: newName })

      dispatch(updateUserName(res.data.updatedUser.name))
      dispatch(setAppError('Name changed'))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const updateAvatarTC = createAsyncThunk(
  'updateAvatar',
  async (newAvatar: string, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await authApi.update({ avatar: newAvatar })

      dispatch(updateUserAvatar(res.data.updatedUser.avatar))
      dispatch(setAppError('Avatar changed'))
      dispatch(setAppStatus('success'))
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isRegistered: false,
    user: {},
    emailInRecovery: '',
    isPasswordChanged: false,
    isMessageSend: false,
  } as InitialStateType,
  reducers: {
    isLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    isRegistred: (state, action: PayloadAction<boolean>) => {
      state.isRegistered = action.payload
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    logout: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload
    },
    setEmailInRecovery: (state, action: PayloadAction<string>) => {
      state.emailInRecovery = action.payload
    },
    isMessageSend: (state, action: PayloadAction<boolean>) => {
      state.isMessageSend = action.payload
    },
    isPasswordChanged: (state, action: PayloadAction<boolean>) => {
      state.isPasswordChanged = action.payload
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload
    },
    updateUserAvatar: (state, action: PayloadAction<string | undefined>) => {
      state.user.avatar = action.payload
    },
  },
})

export const {
  isLoggedIn,
  isRegistred,
  setUser,
  isPasswordChanged,
  isMessageSend,
  setEmailInRecovery,
  updateUserName,
  updateUserAvatar,
} = authSlice.actions
export const authReducer = authSlice.reducer
