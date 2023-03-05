import React from 'react'

import { NavLink } from 'react-router-dom'

import error404 from './404.svg'
import s from './Error404.module.css'

const Error404 = () => {
  return (
    <div id={'hw5-page-404'}>
      <div className={s.wrapper}>
        <NavLink to={'/'}>Go to main</NavLink>
        <img src={error404} alt={'404'} className={s.error404} />
      </div>
    </div>
  )
}

export default Error404
