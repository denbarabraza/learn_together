import React from 'react'

import { Slider, SliderProps } from '@mui/material'

import style from './SuperRange.module.css'

const SuperRange: React.FC<SliderProps> = props => {
  return (
    <Slider
      sx={{
        // стили для слайдера // пишет студент
        width: '150px',
        height: '4px',
        color: '#00CC22',
      }}
      className={style.slider}
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  )
}

export default SuperRange
