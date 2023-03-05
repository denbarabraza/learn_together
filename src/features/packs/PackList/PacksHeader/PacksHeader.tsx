import React, { FC, memo } from 'react'

import s from './PacksHeader.module.scss'

type PacksHeaderType = {
  title: string
  buttonTitle: string
  onClick: () => void
}

export const PacksHeader: FC<PacksHeaderType> = memo(({ title, buttonTitle, onClick }) => {
  return (
    <div className={s.innerWrapper}>
      <h2 className={s.title}>{title}</h2>
      <button onClick={onClick} className={s.btn}>
        {buttonTitle}
      </button>
    </div>
  )
})
