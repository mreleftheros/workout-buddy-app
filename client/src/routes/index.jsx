import { A } from "solid-start";

const index = () => {

  return <section className="hero">
    <h1 class="hero-title">Welcome to <strong>Workout Buddy App 👐</strong></h1>
    <h2 class="hero-subtitle">Track and manage your workout sessions easily and don't lose a single workout ever again.</h2>
    <div className="hero-cta">
      <A class="hero-cta-btn active" href="/workouts">View Workouts</A>
      <span>or</span>
      <A class="hero-cta-btn" href="/signup">Signup</A>
    </div>
  </section>
}

export default index;