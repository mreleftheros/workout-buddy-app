import {
  createContext,
  useContext,
  createSignal,
  createEffect,
} from "solid-js";
import { useNavigate } from "solid-start";
import { login_post, signup_post } from "~/lib/auth";

const AuthContext = createContext();

const AuthProvider = props => {
  const stored = localStorage.auth
    ? JSON.parse(localStorage.getItem("auth"))
    : null;
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

  const signup = async (username, password) => {
    const res = await signup_post(username, password);
    const { error, errors, data } = await res.json();
    if (error) {
      return { error, errors };
    } else {
      setAuth(data);
    }
  };

  const login = async (username, password) => {
    const res = await login_post(username, password);
    const { error, data } = await res.json();
    if (error) {
      return { error };
    } else {
      setAuth(data);
    }
  };

  const logout = () => setAuth(null);

  return (
    <AuthContext.Provider value={{ auth, signup, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
