import { AxiosResponse } from 'axios'

import {
  CardGradeDataType,
  CardGradeResponseType,
  CreateCardRequestType,
  CreateCardType,
  GetCardResponseType,
  SearchParamsCardType,
} from './cardType'

import { instance } from 'common/constans/instance'

export const cardAPI = {
  getCard: (params: SearchParamsCardType, cardsPackID: string) => {
    return instance.get<GetCardResponseType>('cards/card', {
      params: {
        cardAnswer: params.cardAnswer,
        cardQuestion: params.cardQuestion,
        cardsPack_id: cardsPackID,
        min: params.min,
        max: params.max,
        sortCards: params.sortCards,
        page: params.page,
        pageCount: params.pageCount,
      },
    })
  },
  createCard: (data: CreateCardRequestType) => {
    return instance.post<'', AxiosResponse<GetCardResponseType>, CreateCardRequestType>(
      'cards/card',
      data
    )
  },
  deleteCard: (cardID: string) => {
    return instance.delete<AxiosResponse<GetCardResponseType>>(`cards/card/?id=${cardID}`)
  },
  updateCard: (data: { card: Omit<CreateCardType, 'cardsPack_id'> & { _id: string } }) => {
    return instance.put<
      '',
      AxiosResponse<GetCardResponseType>,
      { card: Omit<CreateCardType, 'cardsPack_id'> & { _id: string } }
    >('cards/card', data)
  },
  updatedCardGrade: (data: CardGradeDataType) => {
    return instance.put<'', AxiosResponse<CardGradeResponseType>, CardGradeDataType>(
      'cards/grade',
      data
    )
  },
}
