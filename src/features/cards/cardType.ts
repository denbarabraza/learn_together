import { AnswerStatuses } from './LearnCardPage/learnCardSlice'

export type InititalStateCardType = {
  cards: CardType[]
  searchParams: SearchParamsCardType
}

export type CardType = {
  answer: string
  answerImg: string
  question: string
  questionImg: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}

export type SearchParamsCardType = {
  cardAnswer: string
  cardQuestion: string
  cardsPack_id: string
  min: number
  max: number
  sortCards: string
  page: number
  pageCount: number
  packName: string
  packUserId: string
  cardsTotalCount: number
  totalPagesCount: number
}

export type GetCardResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packCreated: string
  packDeckCover: string
  packUserId: string
  packName: string
  packPrivate: string
  packUpdated: string
  token: string
  tokenDeathTime: string
}

export type CreateCardRequestType = {
  card: CreateCardType
}

export type CreateCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateCardObjType = {
  updateCard: {
    card: Omit<CreateCardType, 'cardsPack_id'> & { _id: string }
  }
  cardsPackID: string
}

export type CardQueryParamsType = {
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
  user_id?: string
  cardAnswer?: string
  cardsPack_id?: string
  packName?: string
  packUserId?: string
}

export type RatingValueType = 1 | 2 | 3 | 4 | 5

export type InititalStateLearnCardType = {
  id: RatingValueType
  title: string
  status: AnswerStatuses
}

export type CardGradeDataType = {
  grade: number
  card_id: string
}

export type CardGradeResponseType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
