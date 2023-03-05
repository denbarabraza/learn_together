import { SearchParamsType } from './packsSlice'
import { CreatePackRequestType, GetPacksResponseType, UpdatePackRequestType } from './packsType'

import { instance } from 'common/constans/instance'

export const packsAPI = {
  getPacks: (params: SearchParamsType) => {
    return instance.get<GetPacksResponseType>('cards/pack', {
      params: {
        packName: params.packName,
        min: params.min,
        max: params.max,
        sortPacks: params.sortPack,
        page: params.page,
        pageCount: params.pageCount,
        user_id: params.user_id,
      },
    })
  },
  createPack: (data: CreatePackRequestType) => {
    return instance.post('/cards/pack', data)
  },
  deletePack: (id: string) => {
    return instance.delete(`/cards/pack?id=${id}`)
  },
  updatePack: (data: UpdatePackRequestType) => instance.put(`/cards/pack`, data),
}
