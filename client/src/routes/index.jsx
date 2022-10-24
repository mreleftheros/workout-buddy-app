import { A } from "solid-start";
import { useAuth } from "~/context/auth";

const index = () => {
  const { auth } = useAuth();

  return <section className="hero">
    <h1 class="hero-title">Welcome to <strong>Workout Buddy App 👐</strong></h1>
    <h2 class="hero-subtitle">Track and manage your workout sessions easily and don't lose a single workout ever again.</h2>
    <div className="hero-cta">
      <Show when={!auth()} fallback={<A class="hero-cta-btn active" href="/workouts">View Workouts</A>}>
        <A class="hero-cta-btn" href="/login">Login</A>
        <span>or</span>
        <A class="hero-cta-btn" href="/signup">Sign up</A>
      </Show>
    </div>
  </section>
}

export default index;