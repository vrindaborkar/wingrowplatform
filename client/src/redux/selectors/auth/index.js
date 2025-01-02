const getAuth = state => state
export const isLoggedIn = state => getAuth(state).loginReducer.isLoggedIn
export const isVerify = state => getAuth(state).msg91Reducer.isVerify
export const userRole = state => getAuth(state).loginReducer.userRole
