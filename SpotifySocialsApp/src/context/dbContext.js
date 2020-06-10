import React from 'react';

const DBContext = React.createContext();

export const DBProvider = ({ children }) => {

  const initialiseUser = () => {
    
  };

  const getUsers = () => {
    return ["Joe", "Em"]
  };

  const compareUsers = () => {

  };

  return (
    <DBContext.Provider value={{ initialiseUser, getUsers, compareUsers }}>
      {children}
    </DBContext.Provider>
  );
};

export default DBContext;
