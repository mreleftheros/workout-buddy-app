import { createContext, useContext, createResource } from "solid-js";
import { useAuth } from "./auth";
import { get_workouts } from "~/api/workouts";

const WorkoutContext = createContext();

const WorkoutProvider = props => {
  const { auth } = useAuth();
  const [workouts, { mutate, refetch }] = createResource(auth, get_workouts);

  const addWorkout = () => { };

  return <WorkoutContext.Provider value={{ workouts, addWorkout }} >
    {props.children}
  </WorkoutContext.Provider>
}

export default WorkoutProvider;

export const useWorkouts = () => useContext(WorkoutContext);