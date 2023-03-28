import { useNavigate } from "solid-start";
import WorkoutForm from "~/components/WorkoutForm";
import { useAuthContext } from "~/context/auth";

const add = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  if (!auth()) {
    return navigate("/login");
  }

  return <WorkoutForm />;
};

export default add;
