import { A } from "solid-start";
import { useWorkouts } from "~/context/workouts";

const index = () => {
  const { workouts } = useWorkouts();

  return <section className="workouts">
    <h1 class="workouts-title">Workouts List</h1>
    <Switch fallback={<p class="workouts-fallback">They are currently no workouts added.</p>}>
      <Match when={workouts.loading}>
        <p class="workouts-loading">Loading...</p>
      </Match>
      <Match when={workouts.error}>
        <p class="workouts-error">There was some error</p>
        {workouts.error}
        <p>Please <button class="workouts-error-btn" onClick={refetch}>Try again</button> or contact the developer to fix the issue.</p>
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
                  <h2 class="workouts-item-name">{w?.name}</h2>
                  <h2 class="workouts-item-reps">{w?.reps}</h2>
                  <h2 class="workouts-item-load">{w?.load}kg</h2>
                </div>
                <div className="workouts-item-tools">
                  <A href={`/workouts/${w._id}`} class="workouts-item-tool edit">🔎</A>
                  <button class="workouts-item-tool toggle">{w?.done ? "❌" : "☑"}</button>
                  <button class="workouts-item-tool edit">🖊</button>
                  <button class="workouts-item-tool trash">🗑</button>
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