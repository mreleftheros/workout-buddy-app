import { createContext, useContext, createSignal, createEffect } from "solid-js";
import { useNavigate } from "solid-start";

const AuthContext = createContext();

const AuthProvider = props => {
  const stored = localStorage.auth ? JSON.parse(localStorage.getItem("auth")) : null;
  const [auth, setAuth] = createSignal(stored);

  const navigate = useNavigate();

  createEffect(() => {
    if (auth()) {
      localStorage.setItem("auth", JSON.stringify(auth()));
      navigate("/workouts");
    } else {
      localStorage.removeItem("auth");
      navigate("/login");
    }
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>
    {props.children}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);