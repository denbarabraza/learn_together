import { RootStateType } from 'store/store'

export const modalTypeSelector = (state: RootStateType) => state.modal.modalType

export const userBlockIDSelector = (state: RootStateType) => state.modal.userBlockID
export const isPackDeletedSelector = (state: RootStateType) => state.modal.isPackDeleted
export const changedCardSelector = (state: RootStateType) => state.modal.card
export const changedPackSelector = (state: RootStateType) => state.modal.pack
export const cardsPackIdSelector = (state: RootStateType) => state.modal.pack._id
