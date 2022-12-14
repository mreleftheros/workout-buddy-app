import { A } from "@solidjs/router";
import { mergeProps, createSignal, onMount, batch } from "solid-js";
import { useAuth } from "~/context/auth";
import { login_post, signup_post } from "~/lib/auth";

const initialErrors = {
  error: null,
  usernameError: null,
  passwordError: null
};

const AuthBox = props => {
  const merged = mergeProps({ login: true }, props);
  const [form, setForm] = createSignal({ username: "", password: "" });
  const [loading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal(initialErrors);
  const { setAuth } = useAuth();
  let inputRef;

  onMount(() => inputRef.select());

  const updateForm = ({ target }) => setForm(prev => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form().username || !form().password) return;

    try {
      batch(() => {
        setErrors(initialErrors);
        setLoading(true);
      });

      const { error, data, errors } = merged.login ? await login_post(form().username, form().password) : await signup_post(form().username, form().password);
      
      if (errors) {
        setErrors(prev => ({ ...prev, ...errors }));
      }
      if (error) {
        return setErrors(prev => ({ ...prev, error: error }));
      }
      setAuth(data);
    } catch (err) {
      setErrors(prev => ({ ...prev, error: err.message }));
    } finally {
      setLoading(false);
    }
  }

  return <form class="auth" autocomplete="off" onSubmit={handleSubmit}>
    <h2 class="auth-title">{merged.login ? "Login" : "Signup"} form</h2>
    <div className="auth-group">
      <label htmlFor="username" className="auth-label">Username</label>
      <input type="text" className="auth-input" id="username" name="username" placeholder="Enter username here..." required value={form().username} onInput={updateForm} ref={inputRef} />
      <p className="auth-error">{errors()?.usernameError}</p>
    </div>
    <div className="auth-group">
      <label htmlFor="password" className="auth-label">Password</label>
      <input type="password" className="auth-input" id="password" name="password" placeholder="Enter password here..." required value={form().password} onInput={updateForm} />
      <p className="auth-error">{errors()?.passwordError}</p>
    </div>
    <p className="auth-error">{errors()?.error}</p>
    <button disabled={loading() || !form().username || !form().password} class="auth-btn">{loading() ? "Loading..." : merged.login ? "Login" : "Sign up"}</button>
    <Show when={merged.login} fallback={<p class="auth-msg">Have an account?<A class="auth-link" href="/login">Login</A></p>}>
      <p class="auth-msg">Don't have an account?<A class="auth-link" href="/signup">Sign up</A></p>
    </Show>
  </form>
};

export default AuthBox;