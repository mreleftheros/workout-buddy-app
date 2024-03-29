import { A } from "solid-start";
import { useAuthContext } from "~/context/auth";
import workout from "../assets/workout.svg";

const index = () => {
  const { auth } = useAuthContext();

  return (
    <section className="hero">
      <figure class="hero-figure">
        <img class="hero-img" src={workout} width={400} />
      </figure>
      <div class="hero-details">
        <h1 class="hero-title">
          Welcome to <strong>Workout Buddy App 👐</strong>
        </h1>
        <h2 class="hero-subtitle">
          Organize and keep track of your workout sessions easily.
        </h2>
        <div className="hero-cta">
          <Show
            when={!auth()}
            fallback={
              <A class="hero-cta-btn active" href="/workouts">
                View Workouts
              </A>
            }
          >
            <A class="hero-cta-btn" href="/login">
              Login
            </A>
            <span>or</span>
            <A class="hero-cta-btn" href="/signup">
              Sign up
            </A>
          </Show>
        </div>
      </div>
    </section>
  );
};

export default index;
