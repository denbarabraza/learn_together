import React, { useCallback, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import defaultCover from '../../../assets/defaultPackCover.png'
import { fetchCardTC, setSearchCardParams } from '../cardSlice'

import { CardHeader } from './CardHeader/CardHeader'
import s from './CardList.module.scss'
import {
  cardQuestionCardSelector,
  cardSelector,
  cardsListSelector,
  cardsTotalCountSelector,
  pageCardSelector,
  pageCountCardSelector,
  pagesTotalCountCardSelector,
  sortCardsSelector,
} from './cardSelectors'

import arrow from 'assets/arrow.svg'
import { EmptyPack } from 'common/components/EmptyPack/EmptyPack'
import SuperPagination from 'common/components/Pagination/SuperPagination'
import { Search } from 'common/components/Search/Search'
import { SearchPanel } from 'common/components/SearchPanel/SearchPanel'
import { TablePackListWrapper } from 'common/components/Table/TablePackListWrapper/TablePackListWrapper'
import { TbodyCard } from 'common/components/Table/TbodyCard/TbodyCard'
import { Thead } from 'common/components/Table/Thead/Thead'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { setChangedPack, setModal } from 'features/modals/modalSlice'
import { PackType } from 'features/packs/packsType'

export const CardList = () => {
  const dispatch = useAppDispatch()
  let { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const cardsList = useAppSelector(cardsListSelector)
  const card = useAppSelector(cardSelector)
  const page = useAppSelector(pageCardSelector)
  const pageCount = useAppSelector(pageCountCardSelector)
  const pagesTotalCount = useAppSelector(pagesTotalCountCardSelector)
  const cardQuestion = useAppSelector(cardQuestionCardSelector)
  const sortCards = useAppSelector(sortCardsSelector)
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
  const packActive = useAppSelector(state => state.packs.cardPacks.find(p => p._id === id))
  const namePackActive = packActive?.name

  const searchByName = (value: string) => {
    dispatch(setSearchCardParams({ cardQuestion: value }))
  }
  const onChange = (page: number, pageCount: number) => {
    dispatch(setSearchCardParams({ page, pageCount }))
  }

  const createCards = useCallback(() => {
    if (!id) return

    dispatch(setModal('createCard'))
    dispatch(setChangedPack(packActive || ({} as PackType)))
  }, [id])

  useEffect(
    function () {
      if (!id) return

      dispatch(fetchCardTC(id))
    },
    [id, cardQuestion, sortCards, page, pageCount, namePackActive]
  )

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <div onClick={() => navigate(-1)} className={s.linkBackward}>
            <img className={s.arrow} src={arrow} alt="arrow backward" />
            <span className={s.backwardText}>Back to Packs List</span>
          </div>
          <CardHeader onClick={createCards} />

          <div className={s.packCover}>
            {packActive && packActive.deckCover ? (
              <div
                className={s.img}
                style={{
                  backgroundImage: `url(${packActive.deckCover})`,
                }}
              />
            ) : (
              <img src={defaultCover} alt="default cover" className={s.img} />
            )}
          </div>

          <SearchPanel>
            <Search initialValue={cardQuestion} onChange={searchByName} />
          </SearchPanel>
          {cardsTotalCount === 0 ? (
            <EmptyPack />
          ) : (
            <>
              <TablePackListWrapper>
                <Thead cardList={cardsList} />
                <TbodyCard cards={card} pack={packActive} />
              </TablePackListWrapper>
              <SuperPagination
                page={page}
                totalCount={pagesTotalCount}
                itemsCountForPage={pageCount}
                onChange={onChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
