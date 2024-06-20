

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const USER_VERIFY='USER_VERIFY';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const userVerify = () => ({
  type: USER_VERIFY,
})

export const logout = () => ({
  type: LOGOUT,
});

// export const login =(payload) => {
//   return (dispatch) => {
//       dispatch((payload));
//       userTransactionService.fetchUserTransactionList(payload).then((userTransactionListData) => {
//         if (!userTransactionListData.isError) {
//           dispatch(userTransactionListFetchSuccess(userTransactionListData));
//         } else {
//           dispatch(userTransactionListFetchError(userTransactionListData));
//         }
//       });
//     };
// }