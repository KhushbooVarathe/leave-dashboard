import {jwtDecode} from 'jwt-decode'; // Use default import for jwt-decode
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateComponent() {

  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('accesstoken'); // Fetch auth only once
    if (auth) {
      try {
        const decodedData = jwtDecode(auth);
        setDecoded(true);
      } catch (error) {
        setDecoded(false);
      }
    } else {
      setDecoded(false);
    }
  }, []); 

  if (decoded === null) {
    return <div>Loading...</div>;
  }

  return decoded ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateComponent;
