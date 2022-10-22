import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";

const index = () => {
  const [workouts, setWorkouts] = createSignal([
    { id: 0, name: "bench press", reps: 12, load: 50, done: true },
    { id: 1, name: "shoulder press", reps: 15, load: 20, done: false },
  ]);

  return <section className="workouts">
    <h1 class="workouts-title">Workouts List</h1>
    <Show when={workouts().length > 0} fallback={<p class="workouts-fallback">They are currently no workouts added.</p>}>
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
            <li class="workouts-item" classList={{ done: w.done }}>
              <div class="workouts-item-details">
                <h2 class="workouts-item-name">{w?.id}. {w?.name}</h2>
                <h2 class="workouts-item-reps">{w?.reps}</h2>
                <h2 class="workouts-item-load">{w?.load}kg</h2>
              </div>
              <div className="workouts-item-tools">
                <button class="workouts-item-tool toggle">{w.done ? "❌" : "☑"}</button>
                <button class="workouts-item-tool edit">🖊</button>
                <button class="workouts-item-tool trash">🗑</button>
                🔎
              </div>
            </li>
          )}
        </For>
      </ul>
    </Show>

  </section>;
};

export default index;