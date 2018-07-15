import { 
  FETCH_CURRENT_USER,
  LOGIN_GUEST,
  USER_BUY_MOVIE
} from '../constants';

const initialState = {
  currentUser: {
    name: null,
    token: null,
    userBalance: null
  },
  currentAmount: 0, 
  isFetch: false,
  isLogin: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${USER_BUY_MOVIE}_PENDING`: {
      return {
        ...state,
        currentAmount: 0,
        isFetch: true
      }
    }
    case `${USER_BUY_MOVIE}`: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser, userBalance: parseInt(state.currentUser.userBalance) - parseInt(action.payload)
        },
        currentAmount: action.payload,
        isFetch: false
      }
    }
    case `${LOGIN_GUEST}`: {
      const { name, user_balance, data } = action.payload;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
            name,
            userBalance: user_balance,
            token: data.guest_session_id
        },
        isLogin: true
      }
    }
    case `${FETCH_CURRENT_USER}_PENDING`: {
      return {
        ...state, isFetch: true
      }
    }
    case FETCH_CURRENT_USER: {
      const { name, token, userBalance } = action.payload;
      return {
        ...state,
          currentUser: {
            ...state.currentUser, 
              name,
              token,
              userBalance
          },
          isFetch: false
      }
    }
    default: return state;  
  }
}

export default userReducer;
