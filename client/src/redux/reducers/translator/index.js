import {
  INIT_LANGUAGE,
  LANGUAGE_CHANGE,
  LANGUAGE
} from "../../../constant/actionTypes/translator";
// const { t } = useTranslation();

const INIT_STATE = {
  language: LANGUAGE.MARATHI,
  isLoading: false,
  error: null,
  
};

const translatorReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_LANGUAGE:
      return {
        ...state,
      };
    case LANGUAGE_CHANGE.START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LANGUAGE_CHANGE.SUCCESS:
      return {
        ...state,
        language: action.payload,
        isLoading: false,
      };
    case LANGUAGE_CHANGE.FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default translatorReducer;
