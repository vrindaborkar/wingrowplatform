import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'primereact/toast'

const SEVERITY = {
  INFO: 'info',
  ERROR: 'error',
  WARN: 'warn',
  SUCCESS: 'success',
}

export const DEFAULT_TOAST_LIFE = 3000

const MzToast = props => {
  const { life, toastTitle, toastBody, shouldShowToast, severity, position } =
    props

  const toastRef = useRef(null)
  const showToast = () => {
    toastRef.current.show({
      severity,
      life,
      summary: toastTitle,
      detail: toastBody,
      position,
    })
  }
  useEffect(() => {
    shouldShowToast && showToast()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowToast])
  return <Toast ref={toastRef} />
}

MzToast.defaultProps = {
  life: DEFAULT_TOAST_LIFE,
  position: 'top-right',
  shouldShowToast: false,
  severity: SEVERITY.INFO,
  toastTitle: '',
  toastBody: '',
}

MzToast.propTypes = {
  life: PropTypes.number,
  position: PropTypes.string,
  shouldShowToast: PropTypes.bool,
  severity: PropTypes.oneOf([
    SEVERITY.INFO,
    SEVERITY.SUCCESS,
    SEVERITY.WARN,
    SEVERITY.ERROR,
  ]),
  toastTitle: PropTypes.string,
  toastBody: PropTypes.string,
}

export { MzToast, SEVERITY as TOAST_SEVERITY }
