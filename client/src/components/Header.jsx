import { A } from "solid-start";
import { useAuth } from "~/context/auth";

const Header = () => {
  const { auth, setAuth } = useAuth();

  return <header class="header">
    <nav className="header-nav">
      <A end class="header-logo" href="/">Workout Buddy App</A>
      <div className="header-links">
        <Show when={auth()} fallback={<A end class="header-link" href="/login">Login</A>}>
          <h2>Welcome, <span class="header-title">{auth()?.username}</span></h2>
        </Show>
        <A end class="header-link" href="/workouts">Workouts</A>
        <A end class="header-link" href="/about">About</A>
        <A end class="header-link" href="/workouts/add">New Workout</A>
        <Show when={auth()}>
          <button class="header-btn" onClick={() => setAuth(null)} type="button" aria-label="logout">Logout</button>
        </Show>
      </div>
    </nav>
  </header>
}

export default Header;