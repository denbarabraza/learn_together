import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from 'app/appSlice'
import { loadState, saveState } from 'common/utils'
import { authReducer } from 'features/auth/authSlice'
import { cardReducer } from 'features/cards/cardSlice'
import { learnCardReducer } from 'features/cards/LearnCardPage/learnCardSlice'
import { modalReducer } from 'features/modals/modalSlice'
import packsReducer from 'features/packs/packsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    packs: packsReducer,
    card: cardReducer,
    learnCard: learnCardReducer,
    modal: modalReducer,
  },
  preloadedState: loadState(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootStateType = ReturnType<typeof store.getState>

store.subscribe(() => {
  saveState(store.getState())
})
