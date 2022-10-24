import { useNavigate } from "solid-start";
import WorkoutForm from "~/components/WorkoutForm";
import { useAuth } from "~/context/auth";

const add = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  if (!auth()) {
    return navigate("/login");
  }

  return <WorkoutForm />
}

export default add;

