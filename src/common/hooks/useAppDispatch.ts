import { useDispatch } from 'react-redux'

import { store } from 'store/store'

export type UseAppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<UseAppDispatch>()
