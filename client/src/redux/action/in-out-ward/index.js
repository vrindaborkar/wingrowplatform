import {
  INIT_INWARD,
  FETCH_INWARD_LIST,
  FETCH_INWARD_RECORD,
  CREATE_INWARD_RECORD,
  DELETE_INWARD,
  UPDATE_INWARD_RECORD,
  INIT_OUTWARD,
  FETCH_OUTWARD_LIST,
  FETCH_OUTWARD_RECORD,
  CREATE_OUTWARD_RECORD,
  DELETE_OUTWARD,
  UPDATE_OUTWARD_RECORD,
} from '../../../constant/actionTypes/in-out-ward'
import { inOutwardService } from '../../../services'

export const initInward = () => ({
  type: INIT_INWARD,
})

export const fetchInwardListStart = payload => ({
  type: FETCH_INWARD_LIST.START,
  payload,
})

export const fetchInwardListSuccess = inwards => ({
  type: FETCH_INWARD_LIST.SUCCESS,
  payload: inwards,
})

export const fetchInwardListError = error => ({
  type: FETCH_INWARD_LIST.ERROR,
  payload: { error },
})

export const fetchInwardList = () => {
  return dispatch => {
    dispatch(fetchInwardListStart())
    inOutwardService.fetchInwardList().then(inwardData => {
      if (!inwardData.isError) {
        dispatch(fetchInwardListSuccess(inwardData))
      } else {
        dispatch(fetchInwardListError(inwardData))
      }
    })
  }
}

export const fetchInwardRecordStart = () => ({
  type: FETCH_INWARD_RECORD.START,
})

export const fetchInwardRecordSuccess = inward => ({
  type: FETCH_INWARD_RECORD.SUCCESS,
  payload: inward,
})

export const fetchInwardRecordError = error => ({
  type: FETCH_INWARD_RECORD.ERROR,
  payload: { error },
})

export const fetchInwardRecord = payload => {
  return dispatch => {
    dispatch(fetchInwardRecordStart(payload))
    inOutwardService.fetchInwardRecord(payload).then(inwardData => {
      if (!inwardData.isError) {
        dispatch(fetchInwardRecordSuccess(inwardData))
      } else {
        dispatch(fetchInwardRecordError(inwardData))
      }
    })
  }
}

export const createInwardRecordStart = () => ({
  type: CREATE_INWARD_RECORD.START,
})

export const createInwardRecordSuccess = newInward => ({
  type: CREATE_INWARD_RECORD.SUCCESS,
  payload: newInward,
})

export const createInwardRecordError = error => ({
  type: CREATE_INWARD_RECORD.ERROR,
  payload: { error },
})

export const createInwardRecord = payload => {
  return dispatch => {
    dispatch(createInwardRecordStart(payload))
    inOutwardService.createInwardRecord(payload).then(inwardData => {
      if (!inwardData.isError) {
        dispatch(createInwardRecordSuccess(inwardData))
      } else {
        dispatch(createInwardRecordError(inwardData))
      }
    })
  }
}

export const updateInwardRecordStart = (payload, id) => ({
  type: UPDATE_INWARD_RECORD.START,
  payload,
  id,
})

export const updateInwardRecordSuccess = newInward => ({
  type: UPDATE_INWARD_RECORD.SUCCESS,
  payload: newInward,
})

export const updateInwardRecordError = error => ({
  type: UPDATE_INWARD_RECORD.ERROR,
  payload: { error },
})

export const updateInwardRecord = (payload, id) => {
  return dispatch => {
    dispatch(updateInwardRecordStart(payload, id))
    inOutwardService.updateInwardRecord(payload, id).then(inwardData => {
      if (!inwardData.isError) {
        dispatch(updateInwardRecordSuccess(inwardData))
      } else {
        dispatch(updateInwardRecordError(inwardData))
      }
    })
  }
}

export const deleteInwardStart = () => ({
  type: DELETE_INWARD.START,
})

export const deleteInwardSuccess = inwardId => ({
  type: DELETE_INWARD.SUCCESS,
  payload: { inwardId },
})

export const deleteInwardError = error => ({
  type: DELETE_INWARD.ERROR,
  payload: { error },
})

export const deleteInward = inwardId => {
  return dispatch => {
    dispatch(deleteInwardStart())
    inOutwardService.deleteInward(inwardId).then(inwardData => {
      if (!inwardData.isError) {
        dispatch(deleteInwardSuccess(inwardData))
      } else {
        dispatch(deleteInwardError(inwardData))
      }
    })
  }
}

export const initOutward = () => ({
  type: INIT_OUTWARD,
})

export const fetchOutwardListStart = payload => ({
  type: FETCH_OUTWARD_LIST.START,
  payload,
})

export const fetchOutwardListSuccess = outwards => ({
  type: FETCH_OUTWARD_LIST.SUCCESS,
  payload: outwards,
})

export const fetchOutwardListError = error => ({
  type: FETCH_OUTWARD_LIST.ERROR,
  payload: { error },
})

export const fetchOutwardList = () => {
  return dispatch => {
    dispatch(fetchOutwardListStart())
    inOutwardService.fetchOutwardList().then(outwardData => {
      if (!outwardData.isError) {
        dispatch(fetchOutwardListSuccess(outwardData))
      } else {
        dispatch(fetchOutwardListError(outwardData))
      }
    })
  }
}

export const fetchOutwardRecordStart = () => ({
  type: FETCH_OUTWARD_RECORD.START,
})

export const fetchOutwardRecordSuccess = outward => ({
  type: FETCH_OUTWARD_RECORD.SUCCESS,
  payload: outward,
})

export const fetchOutwardRecordError = error => ({
  type: FETCH_OUTWARD_RECORD.ERROR,
  payload: { error },
})

export const fetchOutwardRecord = payload => {
  return dispatch => {
    dispatch(fetchOutwardRecordStart(payload))
    inOutwardService.fetchOutwardRecord(payload).then(outwardData => {
      if (!outwardData.isError) {
        dispatch(fetchOutwardRecordSuccess(outwardData))
      } else {
        dispatch(fetchOutwardRecordError(outwardData))
      }
    })
  }
}

export const createOutwardRecordStart = () => ({
  type: CREATE_OUTWARD_RECORD.START,
})

export const createOutwardRecordSuccess = newOutward => ({
  type: CREATE_OUTWARD_RECORD.SUCCESS,
  payload: newOutward,
})

export const createOutwardRecordError = error => ({
  type: CREATE_OUTWARD_RECORD.ERROR,
  payload: { error },
})

export const createOutwardRecord = payload => {
  return dispatch => {
    dispatch(createOutwardRecordStart(payload))
    inOutwardService.createOutwardRecord(payload).then(outwardData => {
      if (!outwardData.isError) {
        dispatch(createOutwardRecordSuccess(outwardData))
      } else {
        dispatch(createOutwardRecordError(outwardData))
      }
    })
  }
}

export const updateOutwardRecordStart = (payload, id) => ({
  type: UPDATE_OUTWARD_RECORD.START,
  payload,
  id,
})

export const updateOutwardRecordSuccess = newOutward => ({
  type: UPDATE_OUTWARD_RECORD.SUCCESS,
  payload: newOutward,
})

export const updateOutwardRecordError = error => ({
  type: UPDATE_OUTWARD_RECORD.ERROR,
  payload: { error },
})

export const updateOutwardRecord = (payload, id) => {
  return dispatch => {
    dispatch(updateOutwardRecordStart(payload, id))
    inOutwardService.updateOutwardRecord(payload, id).then(outwardData => {
      if (!outwardData.isError) {
        dispatch(updateOutwardRecordSuccess(outwardData))
      } else {
        dispatch(updateOutwardRecordError(outwardData))
      }
    })
  }
}

export const deleteOutwardStart = () => ({
  type: DELETE_OUTWARD.START,
})

export const deleteOutwardSuccess = outwardId => ({
  type: DELETE_OUTWARD.SUCCESS,
  payload: { outwardId },
})

export const deleteOutwardError = error => ({
  type: DELETE_OUTWARD.ERROR,
  payload: { error },
})

export const deleteOutward = outwardId => {
  return dispatch => {
    dispatch(deleteOutwardStart())
    inOutwardService.deleteOutward(outwardId).then(outwardData => {
      if (!outwardData.isError) {
        dispatch(deleteOutwardSuccess(outwardData))
      } else {
        dispatch(deleteOutwardError(outwardData))
      }
    })
  }
}
