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

const formFieldValueMap = {
  inward: '',
  name: '',
}

const initialState = {
  inwardList: [],
  selectedInward: null,
  isLoading: false,
  error: null,
  formFieldValueMap,
  isCreateInwardSuccess: false,
  isEditInwardSuccess: false,
  isInwardDetailSuccess: false,
  isDeleteInwardSuccess: false,
  isDeleteInwardError: false,
  isInwardDetailError: false,
  isCreateInwardError: false,
  isEditInwardError: false,
  isCreateOutwardSuccess: false,
  isEditOutwardSuccess: false,
  isOutwardDetailSuccess: false,
  isDeleteOutwardSuccess: false,
  isDeleteOutwardError: false,
  isOutwardDetailError: false,
  isCreateOutwardError: false,
  isEditOutwardError: false,
}

const in_out_wardReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_INWARD:
    case INIT_OUTWARD:
      return {
        ...state,
        inwardList: [],
        outwardList: [],
        selectedOutward: null,
        formFieldValueMap: null,
        selectedInward: null,
        isLoading: false,
        error: null,
        isCreateInwardSuccess: false,
        isEditInwardSuccess: false,
        isInwardDetailSuccess: false,
        isDeleteInwardSuccess: false,
        isDeleteInwardError: false,
        isInwardDetailError: false,
        isCreateInwardError: false,
        isEditInwardError: false,
        isCreateOutwardSuccess: false,
        isEditOutwardSuccess: false,
        isOutwardDetailSuccess: false,
        isDeleteOutwardSuccess: false,
        isDeleteOutwardError: false,
        isOutwardDetailError: false,
        isCreateOutwardError: false,
        isEditOutwardError: false,
      }
    case FETCH_INWARD_LIST.START:
    case FETCH_INWARD_RECORD.START:
    case CREATE_INWARD_RECORD.START:
    case DELETE_INWARD.START:
    case UPDATE_INWARD_RECORD.START:
      return {
        ...state,
        isLoading: true,
        error: null,
        isCreateInwardSuccess: false,
        isEditInwardSuccess: false,
        isInwardDetailSuccess: false,
        isDeleteInwardSuccess: false,
        isDeleteInwardError: false,
        isInwardDetailError: false,
        isCreateInwardError: false,
        isEditInwardError: false,
        isCreateOutwardSuccess: false,
        isEditOutwardSuccess: false,
        isOutwardDetailSuccess: false,
        isDeleteOutwardSuccess: false,
        isDeleteOutwardError: false,
        isOutwardDetailError: false,
        isCreateOutwardError: false,
        isEditOutwardError: false,
      }
    case FETCH_INWARD_LIST.SUCCESS:
      return {
        ...state,
        inwardList: action.payload,
        isLoading: false,
        error: null,
      }
    case FETCH_INWARD_RECORD.SUCCESS:
      let otherLinks = action.payload.otherLinks ?? ''
      let linkobj = {}

      if (otherLinks) {
        try {
          // eslint-disable-next-line
          linkobj = JSON.parse(otherLinks)
        } catch (error) {
         
        }
      }

      return {
        ...state,

        isLoading: false,
        error: null,
        isInwardDetailSuccess: true,
      }
    case CREATE_INWARD_RECORD.SUCCESS:
      return {
        ...state,
        inwardList: [...state.inwardList, action.payload],
        isLoading: false,
        error: null,
        isCreateInwardSuccess: true,
      }
    case UPDATE_INWARD_RECORD.SUCCESS:
      return {
        ...state,
        inwardList: state.inwardList.map(inward =>
          inward.id === action.payload.id ? action.payload : inward
        ),
        isLoading: false,
        error: null,
        isEditInwardSuccess: true,
      }
    case DELETE_INWARD.SUCCESS:
      return {
        ...state,
        inwardList: state.inwardList.filter(
          inward => inward.id !== action.payload.inwardId
        ),
        isLoading: false,
        error: null,
        isDeleteInwardSuccess: true,
      }
    case FETCH_INWARD_LIST.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    case FETCH_INWARD_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isInwardDetailError: true,
      }
    case CREATE_INWARD_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isCreateInwardError: true,
      }
    case UPDATE_INWARD_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isEditInwardError: true,
      }

    case DELETE_INWARD.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isDeleteInwardError: true,
      }

    case FETCH_OUTWARD_LIST.SUCCESS:
      return {
        ...state,
        outwardList: action.payload,
        isLoading: false,
        error: null,
      }
    case FETCH_OUTWARD_RECORD.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        isOutwardDetailSuccess: true,
      }
    case CREATE_OUTWARD_RECORD.SUCCESS:
      return {
        ...state,
        outwardList: [...state.outwardList, action.payload],
        isLoading: false,
        error: null,
        isCreateOutwardSuccess: true,
      }
    case UPDATE_OUTWARD_RECORD.SUCCESS:
      return {
        ...state,
        outwardList: state.outwardList.map(outward =>
          outward.id === action.payload.id ? action.payload : outward
        ),
        isLoading: false,
        error: null,
        isEditOutwardSuccess: true,
      }
    case DELETE_OUTWARD.SUCCESS:
      return {
        ...state,
        outwardList: state.outwardList.filter(
          outward => outward.id !== action.payload.outwardId
        ),
        isLoading: false,
        error: null,
        isDeleteOutwardSuccess: true,
      }
    case FETCH_OUTWARD_LIST.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    case FETCH_OUTWARD_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isOutwardDetailError: true,
      }
    case CREATE_OUTWARD_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isCreateOutwardError: true,
      }
    case UPDATE_OUTWARD_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isEditOutwardError: true,
      }

    case DELETE_OUTWARD.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isDeleteOutwardError: true,
      }
    default:
      return state
  }
}

export default in_out_wardReducer
