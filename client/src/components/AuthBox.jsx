import { A } from "@solidjs/router";
import { CgLogIn } from "solid-icons/cg";
import { FaSolidUsersLine } from "solid-icons/fa";
import { mergeProps, createSignal, onMount, batch } from "solid-js";
import { useAuthContext } from "~/context/auth";

const initialErrors = {
  error: "",
  usernameError: "",
  passwordError: "",
};

const AuthBox = props => {
  const merged = mergeProps({ login: true }, props);
  const [form, setForm] = createSignal({ username: "", password: "" });
  const [loading, setLoading] = createSignal(false);
  const [errors, setErrors] = createSignal(initialErrors);
  const { signup, login } = useAuthContext();
  let inputRef;

  onMount(() => inputRef.select());

  const updateForm = ({ target }) =>
    setForm(prev => ({ ...prev, [target.name]: target.value }));

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form().username || !form().password) return;

    try {
      batch(() => {
        setErrors(initialErrors);
        setLoading(true);
      });

      if (merged.login) {
        const { error } = await login(form().username, form().password);

        if (error) {
          return setErrors(prev => ({ ...prev, error }));
        }
      } else {
        const { error, errors } = await signup(
          form().username,
          form().password
        );

        if (error) {
          setErrors(prev => ({ ...prev, ...errors, error }));
        }
      }
    } catch (err) {
      setErrors(prev => ({ ...prev, error: err.message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form class="auth" autocomplete="off" onSubmit={handleSubmit}>
      <h2 class="auth-title">{merged.login ? "Login" : "Signup"} form</h2>
      <div className="auth-group">
        <label htmlFor="username" className="auth-label">
          Username
        </label>
        <input
          type="text"
          className="auth-input"
          id="username"
          name="username"
          placeholder="Enter username here..."
          required
          value={form().username}
          onInput={updateForm}
          ref={inputRef}
          disabled={loading()}
        />
        <p className="auth-error">{errors()?.usernameError}</p>
      </div>
      <div className="auth-group">
        <label htmlFor="password" className="auth-label">
          Password
        </label>
        <input
          type="password"
          className="auth-input"
          id="password"
          name="password"
          placeholder="Enter password here..."
          required
          value={form().password}
          onInput={updateForm}
          disabled={loading()}
        />
        <p className="auth-error">{errors()?.passwordError}</p>
      </div>
      <p className="auth-error">{errors()?.error}</p>
      <button
        disabled={loading() || !form().username || !form().password}
        class="auth-btn"
      >
        {merged.login ? (
          <>
            {loading() ? <span class="loader loader-s"></span> : <CgLogIn />}
            <span>Login</span>
          </>
        ) : (
          <>
            {loading() ? (
              <span class="loader loader-s"></span>
            ) : (
              <FaSolidUsersLine />
            )}
            <span>Sign up</span>
          </>
        )}
      </button>
      <Show when={!loading()} fallback={<p class="auth-msg"></p>}>
        <Show
          when={merged.login}
          fallback={
            <p class="auth-msg">
              Have an account already?
              <A class="auth-link" href="/login">
                Login
              </A> {" "} now!
            </p>
          }
        >
          <p class="auth-msg">
            Don't have an account?
            <A class="auth-link" href="/signup">
              Join
            </A> {" "} the club!
          </p>
        </Show>
      </Show>
    </form>
  );
};

export default AuthBox;
