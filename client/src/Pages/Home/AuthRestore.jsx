import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthRestore = () => {
  const { getAccessTokenSilently, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const tryRestoreSession = async () => {
      if (isLoading || isAuthenticated) return;

      try {
        await getAccessTokenSilently({ prompt: "none" });
      } catch (err) {
        if (err.error === "login_required") {
          console.warn("Silent auth failed: login required");
          await loginWithRedirect({
            appState: {
              returnTo: window.location.pathname,
            },
          });
        } else {
          console.error("Silent auth error:", err);
        }
      }
    };

    tryRestoreSession();
  }, [isLoading, isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  return null;
};

export default AuthRestore;
