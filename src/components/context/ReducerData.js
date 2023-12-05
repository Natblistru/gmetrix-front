const ReducerData = (state, action) => {
  switch (action.type) {
    case "FETCH_DISCIPLINE":
    return {
      ...state,
      disciplineAni: action.payload
    }
    case "FETCH_CAPITOLE":
      return {
        ...state,
        capitole: action.payload
      }
    case "FETCH_TOPICS":
      return {
        ...state,
        topics: action.payload
      }
    case "FETCH_EVALUATIONS_1":
      return {
        ...state,
        evaluations1: action.payload
      }  
    case "FETCH_EVALUATIONS_2":
      return {
        ...state,
        evaluations2: action.payload
      } 
    case "FETCH_EVALUATIONS_3":
      return {
        ...state,
        evaluations3: action.payload
      } 
    case "FETCH_EVALUATIONS":
        return {
          ...state,
          evaluations: action.payload
        } 
    case "FETCH_THEME_VIDEO":
      return {
        ...state,
        themeVideo: action.payload
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
      case "UPDATE_TOPIC_BREADCRUMB":
        if (state.breadcrumb.length = 2) {
          return {
            ...state,
            breadcrumb: [...state.breadcrumb, action.payload]
          }; 
        }
        else if (state.breadcrumb.length = 3) {
          const updatedBreadcrumb = [...state.breadcrumb];
          updatedBreadcrumb[2] = action.payload;
          return {
            ...state,
          breadcrumb: updatedBreadcrumb
          };
        }
    case "UPDATE_SUBTOPIC_BREADCRUMB":
      if (state.breadcrumb.length = 3) {
        return {
          ...state,
          breadcrumb: [...state.breadcrumb, action.payload]
        }; 
      }
      else if (state.breadcrumb.length = 4) {
        const updatedBreadcrumb = [...state.breadcrumb];
        updatedBreadcrumb[3] = action.payload;
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
    case "UPDATE_CURRENT_THEME":
      return {
        ...state,
        currentTheme: action.payload
      };
    case "UPDATE_CURRENT_TOPIC":
      return {
        ...state,
        currentTopic: action.payload
      };
    case "FETCH_CURRENT_TESTS":
      return {
        ...state,
        currentTests: action.payload
      } 
    case "FETCH_CURRENT_SUMMATIVE_TESTS":
      return {
        ...state,
        currentSummativeTests: action.payload
      } 
    case "FETCH_CURRENT_INDEX_TEST":
      return {
        ...state,
        currentIndexTest: action.payload
      } 
    default: 
    return state
  }
}
export default ReducerData