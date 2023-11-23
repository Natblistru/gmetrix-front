const ReducerData = (state, action) => {
  switch (action.type) {
    case "FETCH_DISCIPLINE":
    console.log(action)
    return {
      ...state,
      disciplineAni: action.payload
    }
    case "FETCH_CAPITOLE":
      return {
        ...state,
        capitole: action.payload
      }
    default: 
    return state
  }
}
export default ReducerData