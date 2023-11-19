import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { LOGIN, REGISTER, LOGOUT } from "src/graphql/mutations";
import { CHECK_AUTH, USER } from "src/graphql/queries";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: !!user,
      isLoading: false,
      user,
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const [login] = useMutation(LOGIN);
  const [register] = useMutation(REGISTER);
  const [logout] = useMutation(LOGOUT);

  const { data: checkAuth } = useQuery(CHECK_AUTH);
  const { data } = useQuery(USER, {
    variables: checkAuth?.user.id,
  });

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const isAuthenticated = checkAuth && checkAuth.checkAuth;

    if (isAuthenticated) {
      try {
        const { data } = await useQuery(USER, {
          variables: {
            id: checkAuth?.userID,
          },
        });

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: data && data.user,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (email, password) => {
    try {
      const { data } = await login({
        variables: { email, password },
      });
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: data.login.user,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (email, name, password) => {
    try {
      const { data } = await register({
        variables: { email, name, password },
      });

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: data.register.user,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
