import { A } from "solid-start";
import { useAuthContext } from "~/context/auth";

const Header = () => {
  const { auth, logout } = useAuthContext();

  return (
    <header class="header">
      <nav className="header-nav">
        <A end class="header-logo" href="/">
          Workout Buddy App
        </A>
        <div className="header-links">
          <Show
            when={auth()}
            fallback={
              <A end class="header-link" href="/login">
                Login
              </A>
            }
          >
            <h3>
              Welcome, <span class="header-title">{auth()?.username}</span>
            </h3>
          </Show>
          <A end class="header-link" href="/workouts">
            Workouts
          </A>
          <A end class="header-link" href="/about">
            About
          </A>
          <A end class="header-link" href="/workouts/add">
            New Workout
          </A>
          <Show when={auth()}>
            <button
              class="header-btn"
              onClick={logout}
              type="button"
              aria-label="logout"
            >
              Logout
            </button>
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;
