import React, { FC, memo } from 'react'

import s from './Logo.module.scss'

type LogoType = {
  img: string
}

export const Logo: FC<LogoType> = memo(({ img }) => {
  return (
    <div className={s.logoContainer}>
      <a
        className={s.logoLink}
        href={'https://github.com/Pikadorius/project_cards'}
        target={'_blank'}
        rel="noreferrer"
      >
        <img src={img} alt="logo it-incubator" className={s.logo} />
      </a>
    </div>
  )
})
