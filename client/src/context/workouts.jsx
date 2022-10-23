import { createContext, useContext, createResource } from "solid-js";
import { useAuth } from "./auth";
import { get_workouts } from "~/lib/workouts";

const WorkoutContext = createContext();

const WorkoutProvider = props => {
  const { auth } = useAuth();
  const [workouts, { mutate, refetch }] = createResource(auth, get_workouts);

  const addWorkout = obj => mutate(prev => [obj, ...prev]);

  const deleteWorkout = id => mutate(prev => prev.filter(w => w._id !== id));

  const toggleWorkout = id => mutate(prev => prev.map(w => w._id === id ? ({ ...w, done: !w.done }) : w));

  const updateWorkout = (id, data) => mutate(prev => prev.map(w => w._id === id ? ({...w, ...data}) : w));

  return <WorkoutContext.Provider value={{ workouts, addWorkout, deleteWorkout, toggleWorkout, updateWorkout }} >
    {props.children}
  </WorkoutContext.Provider>
}

export default WorkoutProvider;

export const useWorkouts = () => useContext(WorkoutContext);