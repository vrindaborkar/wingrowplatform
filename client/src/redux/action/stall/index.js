// import {
//   INIT_STALL,
//   FETCH_STALL_LIST,
//   FETCH_STALL_RECORD_BY_ID,
//   FETCH_STALL_RECORD_BY_MARKET,
// } from "../../../constant/actionTypes/stall";
// import { stallService } from "../../../services";


// export const initialStallScreen = () => {
//   return {
//     type: INIT_STALL,
//   };
// };

// export const stallFetchListStart = (payload) => {
//   return {
//     type: FETCH_STALL_LIST.START,
//     payload,
//   };
// };

// export const stallFetchListSuccess = (payload) => {
//   return {
//     type: FETCH_STALL_LIST.SUCCESS,
//     payload,
//   };
// };

// export const stallFetchListError = (payload) => {
//   return {
//     type: FETCH_STALL_LIST.ERROR,
//     payload,
//   };
// };

// // export const fetchStallList = (payload) => {
// //   return (dispatch) => {
// //     dispatch(stallFetchListStart(payload));
// //     stallService.fetchStall(payload).then((stallData) => {
// //       if (!stallData.isError) {
// //         dispatch(stallFetchListSuccess(stallData));
// //       } else {
// //         dispatch(stallFetchListError(stallData));
// //       }
// //     });
// //   };
// // };



// export const stallRecordFetchStart = (payload) => {
//     return {
//       type: FETCH_STALL_RECORD_BY_ID.START,
//       payload,
//     };
//   };
  
//   export const stallRecordFetchSuccess = (payload) => {
//     return {
//       type: FETCH_STALL_RECORD_BY_ID.SUCCESS,
//       payload,
//     };
//   };
  
//   export const stallRecordFetchError = (payload) => {
//     return {
//       type: FETCH_STALL_RECORD_BY_ID.ERROR,
//       payload,
//     };
//   };
  
// export const fetchStallRecordById = (payload) => {
//   return (dispatch) => {
//     dispatch(stallRecordFetchStart(payload));
//     stallService.fetchStallRecordById(payload).then((stallRecordData) => {
//       if (!stallRecordData.isError) {
//         dispatch(stallRecordFetchSuccess(stallRecordData));
//       } else {
//         dispatch(stallRecordFetchError(stallRecordData));
//       }
//     });
//   };
// };


// export const stallListByMarketFetchStart = (payload) => {
//     return {
//       type: FETCH_STALL_RECORD_BY_MARKET.START,
//       payload,
//     };
//   };
  
//   export const stallListByMarketFetchSuccess = (payload) => {
//     return {
//       type: FETCH_STALL_RECORD_BY_MARKET.SUCCESS,
//       payload,
//     };
//   };
  
//   export const stallListByMarketFetchError = (payload) => {
//     return {
//       type: FETCH_STALL_RECORD_BY_MARKET.ERROR,
//       payload,
//     };
//   };
  

// export const fetchStallListByMarket = (payload) => {
//   return (dispatch) => {
//     dispatch(stallListByMarketFetchStart(payload));
//     stallService.fetchStallListByMarket(payload).then((stallData) => {
//       if (!stallData.isError) {
//         dispatch(stallListByMarketFetchSuccess(stallData));
//       } else {
//         dispatch(stallListByMarketFetchError(stallData));
//       }
//     });
//   };
// };
