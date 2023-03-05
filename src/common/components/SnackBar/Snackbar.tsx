import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'

import { appErrorSelector } from 'app/appSelectors'
import { setAppError } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'common/hooks'

export default function SimpleSnackbar() {
  const error = useAppSelector(appErrorSelector)
  const dispatch = useAppDispatch()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError(null))
  }

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
      message={error}
      action={action}
    />
  )
}
