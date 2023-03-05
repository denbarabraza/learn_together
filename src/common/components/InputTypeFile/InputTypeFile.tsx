import React, { ChangeEvent, FC, memo, useState } from 'react'

import s from './InputTypeFile.module.scss'

import { setAppError } from 'app/appSlice'
import { useAppDispatch } from 'common/hooks'
import { convertFileToBase64 } from 'common/utils'

type InputType = {
  label: string
  callback: (value: string) => void
  defaultFile?: string
}

export const InputTypeFile: FC<InputType> = memo(({ callback, defaultFile, label }) => {
  const dispatch = useAppDispatch()
  const [image, setImage] = useState(defaultFile || '')

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 400000) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
          setImage(file64)
        })
      } else {
        dispatch(setAppError('File is too big'))
      }
    }
  }

  return (
    <>
      <label className={s.labelInput}>{label}</label>
      <div className={s.labelContainer}>
        <label className={s.label}>
          <span className={s.labelText}>Change cover</span>

          {image && <div className={s.img} style={{ backgroundImage: `url(${image})` }} />}
          <input
            type="file"
            style={{ display: 'none' }}
            accept={'.png, .jpg, .jpeg, .gif'}
            onChange={uploadHandler}
          />
        </label>
      </div>
    </>
  )
})
