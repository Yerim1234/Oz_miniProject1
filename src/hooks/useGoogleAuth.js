// src/hooks/useGoogleAuth.js
import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const useGoogleAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return { user, error, signInWithGoogle };
};

export default useGoogleAuth;
