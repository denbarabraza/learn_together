import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { InititalStateLearnCardType } from '../cardType'

export enum AnswerStatuses {
  IsNoActive = 0,
  IsActive = 1,
}

let initialState: InititalStateLearnCardType[] = [
  { id: 1, title: 'Did not know', status: AnswerStatuses.IsNoActive },
  { id: 2, title: 'Forgot', status: AnswerStatuses.IsNoActive },
  { id: 3, title: 'A lot of thought', status: AnswerStatuses.IsNoActive },
  { id: 4, title: 'Сonfused', status: AnswerStatuses.IsNoActive },
  { id: 5, title: 'Knew the answer', status: AnswerStatuses.IsNoActive },
]

const cardSlice = createSlice({
  name: 'learnCardPage',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<{ id: number; status: AnswerStatuses }>) => {
      const cardIndex = state.findIndex(e => e.id === action.payload.id)

      if (cardIndex !== -1) {
        state[cardIndex].status = action.payload.status
      }
    },
    resetStatus: state => (state = initialState),
  },
})

export const { changeStatus, resetStatus } = cardSlice.actions

export const learnCardReducer = cardSlice.reducer
