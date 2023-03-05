import { RootStateType } from 'store/store'

export const cardsListSelector = (state: RootStateType) => state.app.cardList
export const cardSelector = (state: RootStateType) => state.card.cards
export const pageCardSelector = (state: RootStateType) => state.card.searchParams.page
export const pageCountCardSelector = (state: RootStateType) => state.card.searchParams.pageCount
export const packUserIdCardSelector = (state: RootStateType) => state.card.searchParams.packUserId
export const packNameCardSelector = (state: RootStateType) => state.card.searchParams.packName
export const pagesTotalCountCardSelector = (state: RootStateType) =>
  state.card.searchParams.totalPagesCount
export const cardQuestionCardSelector = (state: RootStateType) =>
  state.card.searchParams.cardQuestion
export const cardAnswerCardSelector = (state: RootStateType) => state.card.searchParams.cardAnswer
export const sortCardsSelector = (state: RootStateType) => state.card.searchParams.sortCards
export const cardsTotalCountSelector = (state: RootStateType) =>
  state.card.searchParams.cardsTotalCount
