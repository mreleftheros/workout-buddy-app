import { A } from "solid-start";
import { useAuth } from "~/context/auth";

const index = () => {
  const { auth } = useAuth();

  return <section className="hero">
    <h1 class="hero-title">Welcome to <strong>Workout Buddy App 👐</strong></h1>
    <h2 class="hero-subtitle">Track and manage your workout sessions easily and don't lose a single workout ever again.</h2>
    <div className="hero-cta">
      <A class="hero-cta-btn active" href="/workouts">View Workouts</A>
      <Show when={!auth()}>
        <span>or</span>
        <A class="hero-cta-btn" href="/login">Login</A>
      </Show>
    </div>
  </section>
}

export default index;