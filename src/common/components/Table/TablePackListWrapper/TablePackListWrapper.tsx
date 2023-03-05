import React, { memo, ReactNode } from 'react'

import { Table } from '../Table'

import s from './TablePackListWrapper.module.scss'

type TablePackListWrapperType = {
  children: ReactNode
}

export const TablePackListWrapper: React.FC<TablePackListWrapperType> = memo(({ children }) => {
  return (
    <div className={s.container}>
      <Table>{children}</Table>
    </div>
  )
})
