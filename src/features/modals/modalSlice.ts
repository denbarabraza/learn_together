import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CardType } from 'features/cards/cardType'
import { PackType } from 'features/packs/packsType'

export type ModalType =
  | 'createPack'
  | 'deletePack'
  | 'updatePack'
  | 'updateCard'
  | 'createCard'
  | 'deleteCard'
  | 'blockUser'
  | 'idle'

const initialState = {
  modalType: 'idle' as ModalType,
  changedItemId: '',
  changedItemName: '',
  changedItemAnswer: '',
  changedItemCardsId: '',
  userBlockID: '',
  isPackDeleted: false,
  changedPackCover: '',
  pack: {} as PackType,
  card: {} as CardType,
}

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalType>) => {
      state.modalType = action.payload
    },
    setIsPackDeleted: (state, action: PayloadAction<boolean>) => {
      state.isPackDeleted = action.payload
    },
    setUserID: (state, action: PayloadAction<string>) => {
      state.userBlockID = action.payload
    },
    setChangedPack: (state, action: PayloadAction<PackType>) => {
      state.pack = action.payload
    },
    setChangedCard: (state, action: PayloadAction<CardType>) => {
      state.card = action.payload
    },
  },
})

export const { setModal, setIsPackDeleted, setUserID, setChangedPack, setChangedCard } =
  modalSlice.actions

export const modalReducer = modalSlice.reducer
