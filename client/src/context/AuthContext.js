import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props)=> {
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(null);


  return (
    <AuthContext.Provider value={{isStudentLoggedIn, setIsStudentLoggedIn}}>
      {props.children}
    </AuthContext.Provider>
  );
}

