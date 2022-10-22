import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const WorkoutContext = createContext();

export default WorkoutProvider = props => {
  const [workouts, setWorkouts] = createStore([]);

  return <WorkoutContext.Provider >
    {props.children}
  </WorkoutContext.Provider>
}

export const useWorkouts = () => useContext(WorkoutContext);