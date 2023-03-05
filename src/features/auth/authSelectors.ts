import { RootStateType } from 'store/store'

export const isLoggedInSelector = (state: RootStateType) => state.auth.isLoggedIn

export const isRegisteredSelector = (state: RootStateType) => state.auth.isRegistered

export const isMessageSendSelector = (state: RootStateType) => state.auth.isMessageSend

export const isPasswordChangedSelector = (state: RootStateType) => state.auth.isPasswordChanged

export const getRecoveryEmailSelector = (state: RootStateType) => state.auth.emailInRecovery
export const authUserIdSelector = (state: RootStateType) => state.auth.user._id
export const authUserInfoSelector = (state: RootStateType) => state.auth.user

export const authUserAvatarSelector = (state: RootStateType) => state.auth.user.avatar
