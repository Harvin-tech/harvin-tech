import React, { useEffect, useState } from 'react';

const useProfile = () => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem('user')) {
      const userData = localStorage.getItem('user');
      setUser(userData);
      setLoading(false);
    }
  }, []);
  return {
    user,
    loading,
  };
};

export default useProfile;
