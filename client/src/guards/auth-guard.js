import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { useAuthContext } from "src/contexts/auth-context";
import { CHECK_AUTH } from "src/graphql/queries";

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { data, loading, error } = useQuery(CHECK_AUTH);
  const { isAuthenticated, isLoading } = useAuthContext();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Redirect if not authenticated and not loading
    if (!data && !loading && !isAuthenticated) {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/auth/login",
          query: router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    }
  }, [router.isReady, loading, error, data]);

  // If Loading or not Authenticated, dont render anything
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
