import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CHECK_AUTH } from "src/graphql/queries";
import { LOGIN, LOGOUT } from "src/graphql/mutations";
const AuthContext = createContext();
import { useApolloClient } from "@apollo/client";

export const useAuth = () => useContext(AuthContext);
const fetchUserData = async (id) => {
  const { data } = await client.query({
    query: CHECK_AUTH,
    variables: { id },
  });

  return data;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoading: true,
  });
  const { data: authData } = useQuery(CHECK_AUTH);
  const [loginMutation] = useMutation(LOGIN);
  const [logoutMutation] = useMutation(LOGOUT);
  const client = useApolloClient();

  useEffect(() => {
    const initializeAuth = async () => {
      if (authData && authData.checkAuth) {
        // user authenticated
        try {
          const userData = await fetchUserData(authData.checkAuth.id, client);
          setAuth({
            user: userData,
            token: authData.checkAuth.token,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // user not authenticated
        setAuth({
          user: null,
          token: null,
          isLoading: false,
        });
      }
    };
    initializeAuth();
  }, [authData]);

  const signIn = async (email, password) => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });
      setAuth({
        user: data.login.user,
        token: data.login.token,
        isLoading: false,
      });
      console.log("Login successful", data.login);
    } catch (error) {
      console.error("Error during login:", error);
      setAuth({
        user: null,
        token: null,
        isLoading: false,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logoutMutation();
      setAuth({
        user: null,
        token: null,
        isLoading: false,
      });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ ...auth, signIn, signOut }}>
      {children(auth)}
    </AuthContext.Provider>
  );
};
