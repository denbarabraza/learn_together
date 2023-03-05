import React, { ChangeEvent } from 'react'

import s from './AvatarLoader.module.scss'

import { setAppError } from 'app/appSlice'
import camera from 'assets/cameraIcon.svg'
import { useAppDispatch } from 'common/hooks'
import { convertFileToBase64 } from 'common/utils'
import { updateAvatarTC } from 'features/auth/authSlice'

const AvatarLoader = () => {
  const dispatch = useAppDispatch()
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 400000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(updateAvatarTC(file64))
        })
      } else {
        dispatch(setAppError('File is too big'))
      }
    }
  }

  return (
    <label className={s.cameraIconLabel}>
      <input
        type="file"
        style={{ display: 'none' }}
        accept={'.png, .jpg, .jpeg, .gif'}
        onChange={uploadHandler}
      />
      <img className={s.cameraIcon} src={camera} alt="camera icon" />
    </label>
  )
}

export default AvatarLoader
