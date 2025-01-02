import { SET_IS_FORM_DIRTY } from '../../../constants/actionType/common/form'

const INITIAL_STATE = {
  isFormDirty: false,
}

const formStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_IS_FORM_DIRTY:
      return {
        ...state,
        isFormDirty: action.payload.isFormDirty,
      }
    default:
      return state
  }
}
export default formStateReducer
