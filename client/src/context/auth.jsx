import { createContext, useContext, createSignal } from "solid-js";

const AuthContext = createContext();

const AuthProvider = props => {
  const [auth, setAuth] = createSignal(true);

  return <AuthContext.Provider value={{ auth, setAuth }}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);