import {
  INIT_STALL,
  FETCH_STALL_LIST,
  FETCH_STALL_RECORD,
  CREATE_STALL_RECORD,
  DELETE_STALL,
  UPDATE_STALL_RECORD,
  FETCH_BOOKED_STALL_LIST,
  FETCH_BOOKED_STALL_LIST_BY_USER,
  SELECT_STALL,
} from '../../../constant/actionTypes/stall'

const formFieldValueMap = {
  stall: '',
  name: '',
}

const initialState = {
  stallList: [],
  stallBookList: [],
  selectedStalls: [],
  isLoading: false,
  error: null,
  formFieldValueMap,
  isCreateStallSuccess: false,
  isEditStallSuccess: false,
  isStallDetailSuccess: false,
  isDeleteStallSuccess: false,
  isDeleteStallError: false,
  isStallDetailError: false,
  isCreateStallError: false,
  isEditStallError: false,
  isPageLevelError: false,
}

const stallReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STALL:
      return {
        ...state,
        stallList: [],
        stallBookList: [],
        formFieldValueMap: null,
        selectedStalls: [],
        isLoading: false,
        error: null,
      }
    case FETCH_STALL_LIST.START:
    case FETCH_STALL_RECORD.START:
    case CREATE_STALL_RECORD.START:
    case DELETE_STALL.START:
    case UPDATE_STALL_RECORD.START:
    case FETCH_BOOKED_STALL_LIST.START:
    case FETCH_BOOKED_STALL_LIST_BY_USER.START:
      return {
        ...state,
        isLoading: true,
        stallList: [],
        stallBookList: [],
        selectedStalls: [],
        error: null,
        isCreateStallSuccess: false,
        isEditStallSuccess: false,
        isStallDetailSuccess: false,
        isDeleteStallSuccess: false,
        isDeleteStallError: false,
        isStallDetailError: false,
        isCreateStallError: false,
        isEditStallError: false,
      }
    case FETCH_STALL_LIST.SUCCESS:
      return {
        ...state,
        stallList: action.payload,
        isLoading: false,
        error: null,
      }
    case FETCH_BOOKED_STALL_LIST.SUCCESS:
      return {
        ...state,
        stallBookList: action.payload,
        isLoading: false,
        error: null,
        isStallDetailSuccess: true,
      }

    case FETCH_BOOKED_STALL_LIST_BY_USER.SUCCESS:
      return {
        ...state,
        stallBookList: action.payload,
        isLoading: false,
        error: null,
        isStallDetailSuccess: true,
      }

    case FETCH_STALL_RECORD.SUCCESS:
      return {
        ...state,
        stallList: action.payload,
        isLoading: false,
        error: null,
        isStallDetailSuccess: true,
      }
    case CREATE_STALL_RECORD.SUCCESS:
      return {
        ...state,
        stallList: [...state.stallList, action.payload],
        isLoading: false,
        error: null,
        isCreateStallSuccess: true,
      }
    case UPDATE_STALL_RECORD.SUCCESS:
      return {
        ...state,
        stallList: state.stallList.map(stall =>
          stall.id === action.payload.id ? action.payload : stall
        ),
        isLoading: false,
        error: null,
        isEditStallSuccess: true,
      }
    case DELETE_STALL.SUCCESS:
      return {
        ...state,
        stallBookList: state.stallBookList.filter(
          stall => stall.id !== action.payload.stallId
        ),
        isLoading: false,
        error: null,
        isDeleteStallSuccess: true,
      }

    case SELECT_STALL:
      return {
        ...state,
        selectedStalls: action.payload,
      }
    case FETCH_STALL_LIST.ERROR:
    case FETCH_BOOKED_STALL_LIST.ERROR:
    case FETCH_BOOKED_STALL_LIST_BY_USER.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    case FETCH_STALL_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isStallDetailError: true,
      }
    case CREATE_STALL_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isCreateStallError: true,
      }
    case UPDATE_STALL_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isEditStallError: true,
      }

    case DELETE_STALL.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isDeleteStallError: true,
      }
    case 'UPDATE_SELECTED_STALLS':
      return {
        ...state,
        selectedStalls: action.payload,
      }
    default:
      return state
  }
}

export default stallReducer
