import { A } from "solid-start";

const Header = () => {

  return <header class="header">
    <nav className="header-nav">
      <A end class="header-logo" href="/">Workout Buddy App</A>
      <div className="header-links">
        <A end class="header-link" href="/workouts">Workouts</A>
        <A end class="header-link" href="/about">About</A>
        <A end class="header-link" href="/workouts/add">Add Workout</A>
      </div>
    </nav>
  </header>
}

export default Header;