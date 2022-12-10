import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Custom hook to get Auth Status. Will return loggedIn status as well as loading status
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      // Use onAuthStateChanged method to check if logged in.
      // Returns a user object if they are logged in
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setLoading(false);
      });
    }
    // Cleanup function to set isMounted to false when unmounts.
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);
  return { loggedIn, loading };
};
export default useAuthStatus;

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks
