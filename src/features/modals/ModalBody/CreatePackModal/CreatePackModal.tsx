import React, { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState } from 'react'

import defaultCover from '../../../../assets/defaultPackCover.png'
import ModalButtons from '../../ModalButtons/ModalButtons'
import { changedPackSelector } from '../../modalSelectors'

import s from './CreatePackModal.module.scss'

import CustomCheckbox from 'common/components/CustomCheckbox/CustomCheckbox'
import { InputModal } from 'common/components/InputModal/InputModal'
import { InputTypeFile } from 'common/components/InputTypeFile/InputTypeFile'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { resetModalValues } from 'common/utils'
import { createPackTC, updatePackTC } from 'features/packs/packsSlice'

type CreateModalType = {
  type: 'create' | 'update'
}
const CreatePackModal: FC<CreateModalType> = memo(({ type }) => {
  const dispatch = useAppDispatch()
  const changedPack = useAppSelector(changedPackSelector)
  const [packName, setPackName] = useState(type === 'create' ? '' : changedPack.name)
  const [isPrivate, setPrivate] = useState(false)
  const [packCover, setPackCover] = useState(changedPack.deckCover || defaultCover)

  const onChangePackName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }, [])

  const onClickHandler = useCallback(() => {
    type === 'create'
      ? dispatch(
          createPackTC({ cardsPack: { name: packName, private: isPrivate, deckCover: packCover } })
        )
      : dispatch(
          updatePackTC({
            cardsPack: {
              name: packName,
              _id: changedPack._id,
              deckCover: packCover,
            },
          })
        )
    resetModalValues(dispatch)
  }, [packName, isPrivate, packCover, changedPack])

  const onEnterHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickHandler()
    }
  }, [])

  const resetName = useCallback(() => {
    setPackName('')
  }, [])

  return (
    <div>
      <div className={s.cover}>
        <InputTypeFile label={'Pack cover'} callback={setPackCover} defaultFile={packCover} />
      </div>
      <div className={s.description}>
        <div>
          <InputModal
            label={'Pack name'}
            placeholder={'Pack name'}
            onKeyDown={onEnterHandler}
            value={packName}
            onChange={onChangePackName}
            reset={resetName}
            focus={true}
          />
        </div>
        <CustomCheckbox checked={isPrivate} onChange={setPrivate} title={'Private pack'} />
      </div>

      <ModalButtons
        onSuccess={onClickHandler}
        successBtnName={type === 'create' ? 'Add' : 'Save'}
      />
    </div>
  )
})

export default CreatePackModal
