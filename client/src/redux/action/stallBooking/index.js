// import {
//     INIT_STALL_BOOKING,
//     FETCH_STALL_BOOKING_LIST,
//     FETCH_STALL_BOOKING_RECORD,
//     CREATE_STALL_BOOKING_RECORD,
//     DELETE_STALL_BOOKING,
//     UPDATE_STALL_BOOKING_RECORD,
//   } from "../../../constant/actionTypes/stallBooking";
//   import { stallBookingService } from "../../../services";
  
//   export const initTenant = () => ({
//     type: INIT_STALL_BOOKING,
//   });
  
//   export const fetchTenantListStart = (payload) => ({
//     type: FETCH_STALL_BOOKING_LIST.START,
//     payload,
//   });
  
//   export const fetchTenantListSuccess = (stallBookings) => ({
//     type: FETCH_STALL_BOOKING_LIST.SUCCESS,
//     payload: stallBookings,
//   });
  
//   export const fetchTenantListError = (error) => ({
//     type: FETCH_STALL_BOOKING_LIST.ERROR,
//     payload: { error },
//   });
  
//   export const fetchTenantList = (payload) => {
//     console.log(payload);
//     return (dispatch) => {
//       dispatch(fetchTenantListStart(payload));
//       stallBookingService.fetchTenantList(payload).then((stallBookingData) => {
//         if (!stallBookingData.isError) {
//           dispatch(fetchTenantListSuccess(stallBookingData));
//         } else {
//           dispatch(fetchTenantListError(stallBookingData));
//         }
//       });
//     };
//   };
  
//   export const fetchTenantRecordStart = () => ({
//     type: FETCH_STALL_BOOKING_RECORD.START,
//   });
  
//   export const fetchTenantRecordSuccess = (stallBooking) => ({
//     type: FETCH_STALL_BOOKING_RECORD.SUCCESS,
//     payload: stallBooking,
//   });
  
//   export const fetchTenantRecordError = (error) => ({
//     type: FETCH_STALL_BOOKING_RECORD.ERROR,
//     payload: { error },
//   });
  
//   export const fetchTenantRecord = (payload) => {
//     return (dispatch) => {
//       dispatch(fetchTenantRecordStart(payload));
//       stallBookingService.fetchTenantRecord(payload).then((stallBookingData) => {
//         if (!stallBookingData.isError) {
//           dispatch(fetchTenantRecordSuccess(stallBookingData));
//         } else {
//           dispatch(fetchTenantRecordError(stallBookingData));
//         }
//       });
//     };
//   };
  
//   export const createTenantRecordStart = () => ({
//     type: CREATE_STALL_BOOKING_RECORD.START,
//   });
  
//   export const createTenantRecordSuccess = (newTenant) => ({
//     type: CREATE_STALL_BOOKING_RECORD.SUCCESS,
//     payload: newTenant,
//   });
  
//   export const createTenantRecordError = (error) => ({
//     type: CREATE_STALL_BOOKING_RECORD.ERROR,
//     payload: { error },
//   });
  
//   export const createTenantRecord = (payload) => {
//     return (dispatch) => {
//       dispatch(createTenantRecordStart(payload));
//       stallBookingService.createTenantRecord(payload).then((stallBookingData) => {
//         if (!stallBookingData.isError) {
//           dispatch(createTenantRecordSuccess(stallBookingData));
//         } else {
//           dispatch(createTenantRecordError(stallBookingData));
//         }
//       });
//     };
//   };
  
//   export const updateTenantRecordStart = (payload,id) => ({
//     type: UPDATE_STALL_BOOKING_RECORD.START,
//     payload,id
//   });
  
//   export const updateTenantRecordSuccess = (newTenant) => ({
//     type: UPDATE_STALL_BOOKING_RECORD.SUCCESS,
//     payload: newTenant,
//   });
  
//   export const updateTenantRecordError = (error) => ({
//     type: UPDATE_STALL_BOOKING_RECORD.ERROR,
//     payload: { error },
//   });
  
//   export const updateTenantRecord = (payload,id) => {
//     return (dispatch) => {
//       dispatch(updateTenantRecordStart(payload,id));
//       stallBookingService.updateTenantRecord(payload,id).then((stallBookingData) => {
//         if (!stallBookingData.isError) {
//           dispatch(updateTenantRecordSuccess(stallBookingData));
//         } else {
//           dispatch(updateTenantRecordError(stallBookingData));
//         }
//       });
//     };
//   };
  
//   export const deleteTenantStart = () => ({
//     type: DELETE_STALL_BOOKING.START,
//   });
  
//   export const deleteTenantSuccess = (stallBookingId) => ({
//     type: DELETE_STALL_BOOKING.SUCCESS,
//     payload: { stallBookingId },
//   });
  
//   export const deleteTenantError = (error) => ({
//     type: DELETE_STALL_BOOKING.ERROR,
//     payload: { error },
//   });
  
//   export const deleteTenant = (stallBookingId) => {
//     return (dispatch) => {
//       dispatch(deleteTenantStart());
//       stallBookingService.deleteTenant(stallBookingId).then((stallBookingData) => {
//         if (!stallBookingData.isError) {
//           dispatch(deleteTenantSuccess(stallBookingData));
//         } else {
//           dispatch(deleteTenantError(stallBookingData));
//         }
//       });
//     };
//   };
  