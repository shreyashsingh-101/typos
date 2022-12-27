import React, { useEffect } from 'react';
import router from 'next/router';
import { getAuth } from 'firebase/auth';
import { app } from '../config';


const auth = getAuth(app);

const withAuth = Component => props => {
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        router.push('/signin');
      }
    });
  }, []);

  return (
    <div>
      <Component {...props} />
    </div>
  )
};

export default withAuth;