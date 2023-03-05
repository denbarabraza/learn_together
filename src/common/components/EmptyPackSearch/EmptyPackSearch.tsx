import React, { memo } from 'react'

import s from './EmptyPackSearch.module.scss'

import emptyPack from 'assets/emptyPack.png'

export const EmptyPackSearch = memo(() => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.innerWrapper}>
          <h3 className={s.title}>Nothing found!</h3>
          <img className={s.emptyPack} src={emptyPack} alt="packEmpty" />
          <div className={s.discription}>Change search parameters</div>
        </div>
      </div>
    </div>
  )
})
