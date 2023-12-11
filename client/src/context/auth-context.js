import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CHECK_AUTH } from "src/graphql/queries";
import { LOGIN, LOGOUT, REGISTER, UPDATE_USER } from "src/graphql/mutations";
const AuthContext = createContext();
import { useApolloClient } from "@apollo/client";

export const useAuth = () => useContext(AuthContext);
const fetchUserData = async (id, client) => {
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
  const [registerMutation] = useMutation(REGISTER);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  const client = useApolloClient();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check of user data and token exist in local storage
      const storedUserData = localStorage.getItem("userData");
      const storedToken = localStorage.getItem("token");

      if (storedUserData && storedToken) {
        // User authenticated
        try {
          const userData = JSON.parse(storedUserData);
          setAuth({
            user: userData,
            token: storedToken,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      } else if (authData && authData.checkAuth) {
        // user authenticated but local storage not set up
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
      // Save user data and token to local storage
      localStorage.setItem("userData", JSON.stringify(data.login.user));
      localStorage.setItem("token", data.login.token);
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

  const signUp = async (username, email, password) => {
    try {
      const { data } = await registerMutation({ variables: { username, email, password } });
      // Save user data and token to local storage
      localStorage.setItem("userData", JSON.stringify(data.registerUser.user));
      localStorage.setItem("token", data.registerUser.token);
      setAuth({
        user: data.registerUser.user,
        token: data.registerUser.token,
        isLoading: false,
      });
      console.log("Registered successfully!", data.registerUser);
    } catch (error) {
      console.error("Error durng registration:", error);
    }
  };
  const updateUser = async (updateUserId, username, email, password) => {
    try {
      const { data } = await updateUserMutation({
        variables: { updateUserId, username, email, password },
      });
      // Update the user data in the context
      setAuth((prevAuth) => ({
        ...prevAuth,
        user: data.updateUser,
      }));
      console.log("User profile updated successfully!", data.updateUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logoutMutation();
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      setAuth({
        user: null,
        token: null,
        isLoading: false,
      });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ ...auth, signIn, signOut, signUp, updateUser }}>
      {children(auth)}
    </AuthContext.Provider>
  );
};
