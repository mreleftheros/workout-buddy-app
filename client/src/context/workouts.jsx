import { createContext, useContext, createResource } from "solid-js";
import { useAuthContext } from "./auth";
import {
  idParam_delete,
  idParam_patch,
  idParam_toggle,
  index_get,
  index_post,
} from "~/lib/workouts";

const WorkoutContext = createContext();

const WorkoutProvider = props => {
  const { auth } = useAuthContext();
  const [workouts, { mutate, refetch }] = createResource(auth, index_get);

  const addWorkout = async body => {
    const { error, errors, data } = await index_post(auth()?.token, body);
    if (error) {
      return { error, errors };
    } else {
      mutate(prev => [data, ...prev]);
      return {};
    }
  };

  const deleteWorkout = async id => {
    const ok = await idParam_delete(auth()?.token, id);
    if (ok) {
      mutate(prev => prev.filter(w => w._id !== id));
    }
    return ok;
  };

  const toggleWorkout = async (id, done) => {
    const ok = await idParam_toggle(auth()?.token, id, done);
    if (ok) {
      mutate(prev =>
        prev.map(w => (w._id === id ? { ...w, done: !w.done } : w))
      );
    }
    return ok;
  };

  const updateWorkout = async (id, body) => {
    const result = await idParam_patch(auth()?.token, id, body);
    if (result.error) {
      return { error: result.error, errors: result.errors };
    } else {
      mutate(prev => prev.map(w => (w._id === id ? { ...w, body } : w)));
      refetch();
      return {};
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        addWorkout,
        deleteWorkout,
        toggleWorkout,
        updateWorkout,
      }}
    >
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;

export const useWorkoutContext = () => useContext(WorkoutContext);
