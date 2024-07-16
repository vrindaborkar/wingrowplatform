// import {
//   INIT_STALL_BOOKING,
//   FETCH_STALL_BOOKING_LIST,
//   FETCH_STALL_BOOKING_RECORD_BY_ID,
//   FETCH_STALL_BOOKING_RECORD_BY_MARKET,
//   CREATE_STALL_BOOKING,
// } from "../../../constant/actionTypes/stallBooking";
// import { stallBookingService } from "../../../services";


// export const initialStallBookingScreen = () => {
//   return {
//     type: INIT_STALL_BOOKING,
//   };
// };

// export const stallBookingFetchListStart = (payload) => {
//   return {
//     type: FETCH_STALL_BOOKING_LIST.START,
//     payload,
//   };
// };

// export const stallBookingFetchListSuccess = (payload) => {
//   return {
//     type: FETCH_STALL_BOOKING_LIST.SUCCESS,
//     payload,
//   };
// };

// export const stallBookingFetchListError = (payload) => {
//   return {
//     type: FETCH_STALL_BOOKING_LIST.ERROR,
//     payload,
//   };
// };

// export const fetchStallBookingList = (payload) => {
//   return (dispatch) => {
//     dispatch(stallBookingFetchListStart(payload));
//     stallBookingService
//       .fetchStallBookingList(payload)
//       .then((stallBookingData) => {
//         if (!stallBookingData.isError) {
//           dispatch(stallBookingFetchListSuccess(stallBookingData));
//         } else {
//           dispatch(stallBookingFetchListError(stallBookingData));
//         }
//       });
//   };
// };

// export const createStallBookingStart = (payload) => {
//   return {
//     type: CREATE_STALL_BOOKING.START,
//     payload,
//   };
// };
// export const createStallBookingSuccess = (payload) => {
//   return {
//     type: CREATE_STALL_BOOKING.SUCCESS,
//     payload,
//   };
// };

// export const createStallBookingError = (payload) => {
//   return {
//     type: CREATE_STALL_BOOKING.ERROR,
//     payload,
//   };
// };

// export const createStallBooking = (payload) => {
//   return (dispatch) => {
//     dispatch(createStallBookingStart(payload));
//     stallBookingService.createStallBooking(payload).then((stallBookingData) => {
//       if (!stallBookingData.isError) {
//         dispatch(createStallBookingSuccess(stallBookingData));
//       } else {
//         dispatch(createStallBookingError(stallBookingData));
//       }
//     });
//   };
// };

// export const stallBookingFetchByIdStart = (payload) => {
//   return {
//     type: FETCH_STALL_BOOKING_RECORD_BY_ID.START,
//     payload,
//   };
// };

// export const stallBookingFetchByIdSuccess = (payload) => {
//   return {
//     type: FETCH_STALL_BOOKING_RECORD_BY_ID.SUCCESS,
//     payload,
//   };
// };

// export const stallBookingFetchByIdError = (payload) => {
//   return {
//     type: FETCH_STALL_BOOKING_RECORD_BY_ID.ERROR,
//     payload,
//   };
// };

// export const fetchStallBookingById = (payload) => {
//   return (dispatch) => {
//     dispatch(stallBookingFetchByIdStart(payload));
//     stallBookingService
//       .fetchStallBookingById(payload)
//       .then((stallBookingData) => {
//         if (!stallBookingData.isError) {
//           dispatch(stallBookingFetchByIdSuccess(stallBookingData));
//         } else {
//           dispatch(stallBookingFetchByIdError(stallBookingData));
//         }
//       });
//   };
// };
