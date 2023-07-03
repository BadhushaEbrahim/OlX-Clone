import React, { createContext, useState } from "react";

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);
export const PostContext = createContext(null);

export default function Context({ children }) {
  const [user, setUser] = useState('');
  const [postDetails, setPostDetails] = useState('');

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <PostContext.Provider value={{ postDetails, setPostDetails }}>
        {children}
      </PostContext.Provider>
    </AuthContext.Provider>
  );
}
