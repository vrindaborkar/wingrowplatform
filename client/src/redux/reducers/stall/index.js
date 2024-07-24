import {
  INIT_STALL,
  FETCH_STALL_LIST,
  FETCH_STALL_RECORD,
  CREATE_STALL_RECORD,
  DELETE_STALL,
  UPDATE_STALL_RECORD,
} from "../../../constant/actionTypes/stall";

const formFieldValueMap = {
  stall: "",
  name: "",
};

const initialState = {
  stallList: [],
  selectedStall: null,
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
  isPageLevelError:false,
};

const stallReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STALL:
      return {
        ...state,
        stallList: [],
        formFieldValueMap: null,
        selectedStall: null,
        isLoading: false,
        error: null,
      };
    case FETCH_STALL_LIST.START:
    case FETCH_STALL_RECORD.START:
    case CREATE_STALL_RECORD.START:
    case DELETE_STALL.START:
    case UPDATE_STALL_RECORD.START:
      return {
        ...state,
        isLoading: true,
        error: null,
        isCreateStallSuccess: false,
        isEditStallSuccess: false,
        isStallDetailSuccess: false,
        isDeleteStallSuccess: false,
        isDeleteStallError: false,
        isStallDetailError: false,
        isCreateStallError: false,
        isEditStallError: false,
      };
    case FETCH_STALL_LIST.SUCCESS:
      return {
        ...state,
        stallList: action.payload,
        isLoading: false,
        error: null,
      };
      case FETCH_STALL_RECORD.SUCCESS:
        let otherLinks = action.payload.otherLinks ?? "";
        let linkobj = {};
        
        if (otherLinks) {
          try {
            linkobj = JSON.parse(otherLinks);
          } catch (error) {
            console.log("Error parsing otherLinks:", error);
          }
        }
      console.log(linkobj);
        return {
          ...state,
          formFieldValueMap: {
            id: action.payload.id ?? "",
            companyName: action.payload.companyName ?? "",
            email: action.payload.stallConfigDTO?.email ?? "",
            phoneNumber: action.payload.phoneNumber ?? "",
            baseUrl: action.payload.stallConfigDTO?.baseUrl ?? "",
            contactPerson: action.payload.contactPerson ?? "",
            h1Font: action.payload.h1Font ?? "",
            h2Font: action.payload.h2Font ?? "",
            h3Font: action.payload.h3Font ?? "",
            headerColor: action.payload.headerColor ?? "",
            footerColor: action.payload.footerColor ?? "",
            bgColor: action.payload.bgColor ?? "",
            iconColor: action.payload.iconColor ?? "",
            bandColor: action.payload.bandColor ?? "",
            facebookLink: linkobj.facebook ?? "",
            instagramLink: linkobj.instagram ?? "",
            twitterLink: linkobj.twitter ?? "",
            linkedinLink: linkobj.linkedin ?? "",
            websiteLink: linkobj.website ?? "",
            companyLogo:action.payload.companyLogo ?? "",
            companyIntro:action.payload.companyIntro ??"",
          },
          selectedStall:{
            id: action.payload.id ?? "",
            companyName: action.payload.companyName ?? "",
            email: action.payload.stallConfigDTO?.email ?? "",
            phoneNumber: action.payload.phoneNumber ?? "",
            baseUrl: action.payload.stallConfigDTO?.baseUrl ?? "",
            contactPerson: action.payload.contactPerson ?? "",
            h1Font: action.payload.h1Font ?? "",
            h2Font: action.payload.h2Font ?? "",
            h3Font: action.payload.h3Font ?? "",
            headerColor: action.payload.headerColor ?? "",
            footerColor: action.payload.footerColor ?? "",
            bgColor: action.payload.bgColor ?? "",
            iconColor: action.payload.iconColor ?? "",
            bandColor: action.payload.bandColor ?? "",
            facebookLink: linkobj.facebook ?? "",
            instagramLink: linkobj.instagram ?? "",
            twitterLink: linkobj.twitter ?? "",
            linkedinLink: linkobj.linkedin ?? "",
            websiteLink: linkobj.website ?? "",
            companyLogo:action.payload.companyLogo ?? "",
            companyIntro:action.payload.companyIntro ??"",
          },
          isLoading: false,
          error: null,
          isStallDetailSuccess: true,
        };
       case CREATE_STALL_RECORD.SUCCESS:
      return {
        ...state,
        stallList: [...state.stallList, action.payload],
        isLoading: false,
        error: null,
        isCreateStallSuccess: true,
      };
    case UPDATE_STALL_RECORD.SUCCESS:
      return {
        ...state,
        stallList: state.stallList.map((stall) =>
          stall.id === action.payload.id ? action.payload : stall
        ),
        isLoading: false,
        error: null,
        isEditStallSuccess: true,
      };
    case DELETE_STALL.SUCCESS:
      return {
        ...state,
        stallList: state.stallList.filter(
          (stall) => stall.id !== action.payload.stallId
        ),
        isLoading: false,
        error: null,
        isDeleteStallSuccess: true,
      };
    case FETCH_STALL_LIST.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case FETCH_STALL_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isStallDetailError: true,
      };
    case CREATE_STALL_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isCreateStallError: true,
      };
    case UPDATE_STALL_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        isEditStallError: true,
      };

    case DELETE_STALL.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        isDeleteStallError: true,
      };
    default:
      return state;
  }
};

export default stallReducer;
