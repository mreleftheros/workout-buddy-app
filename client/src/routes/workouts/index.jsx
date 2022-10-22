import { createResource } from "solid-js";
import { fetchWorkouts } from "~/lib/workouts";

const index = () => {
  const [workouts, { mutate }] = createResource(fetchWorkouts);

  return <section className="workouts">
    <h1 class="workouts-title">Workouts List</h1>
    <Switch fallback={<p class="workouts-fallback">They are currently no workouts added.</p>}>
      <Match when={workouts.loading}>
        <p>Loading...</p>
      </Match>
      <Match when={workouts.error}>
        <p>{workouts.error}</p>
      </Match>
      <Match when={workouts()?.length > 0}>
        <ul class="workouts-list">
          <li class="workouts-item">
            <div class="workouts-item-details">
              <h2 class="workouts-item-name">Name</h2>
              <h2 class="workouts-item-reps">Reps</h2>
              <h2 class="workouts-item-load">Load</h2>
            </div>
            <div className="workouts-item-tools"></div>
          </li>
          <For each={workouts()}>
            {w => (
              <li class="workouts-item" classList={{ done: w?.done }}>
                <div class="workouts-item-details">
                  <h2 class="workouts-item-name">{w?.id}. {w?.name}</h2>
                  <h2 class="workouts-item-reps">{w?.reps}</h2>
                  <h2 class="workouts-item-load">{w?.load}kg</h2>
                </div>
                <div className="workouts-item-tools">
                  <button class="workouts-item-tool toggle">{w?.done ? "❌" : "☑"}</button>
                  <button class="workouts-item-tool edit">🖊</button>
                  <button class="workouts-item-tool trash">🗑</button>
                  🔎
                </div>
              </li>
            )}
          </For>
        </ul>
      </Match>
    </Switch>
  </section >;
};

export default index;