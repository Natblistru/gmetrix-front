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
    case 'ADD_BREADCRUMB':
      const exists = state.breadcrumb.some(item => (
        item.name === action.payload.name && item.path === action.payload.path
      ));
      return {
        ...state,
        breadcrumb: exists ? [...state.breadcrumb] : [...state.breadcrumb, action.payload]
      };    
    case "UPDATE_BREADCRUMB":
      return {
        ...state,
        breadcrumb: action.payload
      };
    case "UPDATE_SUBJECT_BREADCRUMB":
      if (state.breadcrumb.length = 1) {
        return {
          ...state,
          breadcrumb: [...state.breadcrumb, action.payload]
        }; 
      }
      else if (state.breadcrumb.length = 2) {
        const updatedBreadcrumb = [...state.breadcrumb];
        updatedBreadcrumb[1] = action.payload;
        return {
          ...state,
        breadcrumb: updatedBreadcrumb
        };
      }
    case "UPDATE_CURRENT_SUBJECT":
      return {
        ...state,
        currentSubject: action.payload
      };
      case "UPDATE_SUBJECTNAME":
        return {
          ...state,
          currentSubjectName: action.payload
        };
      
    default: 
    return state
  }
}
export default ReducerData