import { A } from "solid-start";
import { useAuthContext } from "~/context/auth";
import { CgGym, CgLogOut } from "solid-icons/cg";
import { FaRegularUser, FaSolidCircleInfo } from "solid-icons/fa";
import { VsAdd } from "solid-icons/vs";

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
            <h3 class="header-link">
              <FaRegularUser size={25} />
              <span></span>
              <span class="header-title">{auth()?.username}</span>
            </h3>
          </Show>
          <A end class="header-link" href="/workouts">
            <CgGym size={25} />
            <span>Workouts</span>
          </A>
          <A end class="header-link" href="/about">
            <FaSolidCircleInfo size={25} />
            <span>About</span>
          </A>
          <A end class="header-link" href="/workouts/add">
            <VsAdd size={25} />
            <span>New Workout</span>
          </A>
          <Show when={auth()}>
            <button
              class="header-btn header-link"
              onClick={logout}
              type="button"
              aria-label="logout"
            >
              <CgLogOut size={25} />
              <span>Logout</span>
            </button>
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;
