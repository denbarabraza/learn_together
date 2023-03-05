import React, { memo } from 'react'

import s from './SearchPanel.module.scss'

type SearchPanelType = {
  children: React.ReactNode
}

export const SearchPanel: React.FC<SearchPanelType> = memo(({ children }) => {
  return <div className={s.container}>{children}</div>
})
