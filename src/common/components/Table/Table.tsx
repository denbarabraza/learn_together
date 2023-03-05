import React, { memo } from 'react'

import s from './Table.module.scss'

type TableType = {
  children: React.ReactNode
}

export const Table: React.FC<TableType> = memo(({ children }) => {
  return (
    <div className={s.container}>
      <table className={s.table}>{children}</table>
    </div>
  )
})
