import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { packsAPI } from './packsAPI'
import {
  CreatePackRequestType,
  GetPacksResponseType,
  PacksQueryParamsType,
  PackType,
  UpdatePackRequestType,
} from './packsType'

import { setAppStatus } from 'app/appSlice'
import { errorUtils } from 'common/utils/errorHandler'
import { RootStateType } from 'store/store'

export type SearchParamsType = {
  packName: string
  user_id: string
  page: number
  pageCount: number
  min: number
  max: number
  sortPack: string
  totalPagesCount: number
  minCardsCount: number
  maxCardsCount: number
}

type InititalStateType = {
  cardPacks: PackType[]
  searchParams: SearchParamsType
}

const initialState: InititalStateType = {
  cardPacks: [],
  searchParams: {
    user_id: '',
    packName: '',
    page: 1,
    pageCount: 10,
    min: 0,
    max: 0,
    sortPack: '',
    totalPagesCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
  },
}

export const fetchPacksTC = createAsyncThunk('fetchPacks', async (_, { dispatch, getState }) => {
  const state = getState() as RootStateType
  const params = state.packs.searchParams

  dispatch(setAppStatus('loading'))
  try {
    const res = await packsAPI.getPacks(params)

    dispatch(setState(res.data))
    dispatch(setAppStatus('success'))
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

export const createPackTC = createAsyncThunk(
  'createPack',
  async (data: CreatePackRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))
    try {
      const res = await packsAPI.createPack(data)

      dispatch(fetchPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

export const deletePackTC = createAsyncThunk('deletePack', async (id: string, { dispatch }) => {
  dispatch(setAppStatus('loading'))
  try {
    const res = await packsAPI.deletePack(id)

    if (!document.location.hash.includes('cards')) {
      dispatch(fetchPacksTC())
    }
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
})

export const updatePackTC = createAsyncThunk(
  'updatePack',
  async (data: UpdatePackRequestType, { dispatch }) => {
    dispatch(setAppStatus('loading'))

    try {
      const res = await packsAPI.updatePack(data)

      dispatch(fetchPacksTC())
    } catch (e: any) {
      errorUtils(e, dispatch)
    }
  }
)

const packsSlice = createSlice({
  name: 'packsList',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<GetPacksResponseType>) => {
      state.cardPacks = action.payload.cardPacks
      state.searchParams.page = action.payload.page
      state.searchParams.pageCount = action.payload.pageCount
      state.searchParams.minCardsCount = action.payload.minCardsCount
      state.searchParams.maxCardsCount = action.payload.maxCardsCount
      state.searchParams.totalPagesCount = Math.ceil(
        action.payload.cardPacksTotalCount / action.payload.pageCount
      )
    },
    setSearchParams: (state, action: PayloadAction<PacksQueryParamsType>) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    },
    resetAll: state => {
      state.searchParams = initialState.searchParams
    },
    resetMinMax: state => {
      state.searchParams.min = 0
      state.searchParams.max = 0
      state.searchParams.page = 1
    },
  },
})

export const { setState, setSearchParams, resetAll } = packsSlice.actions

const packsReducer = packsSlice.reducer

export default packsReducer
