import { RootStateType } from 'store/store'

export const appStatusSelector = (state: RootStateType) => state.app.appStatus
export const appErrorSelector = (state: RootStateType) => state.app.appError
export const isInitializedSelector = (state: RootStateType) => state.app.isInitialized
