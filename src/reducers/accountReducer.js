export const accountReducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE_ACCOUNT':
      return [...state, {
        userName: action.username, 
        password: action.password
      }]
    default:
      return state
  } 
}