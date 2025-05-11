import { useSelector } from "react-redux";
import Tasklist from "./Tasklist";
import LandingPage from "./LandingPage";

const Home = () => {
  const { token, user } = useSelector((store) => store.auth);
  const { loading } = useSelector((store) => store.task);

  if (!token) return <LandingPage />;

  return (
    <div>
      {loading && (
        <p className="flex items-center justify-center text-xl  text-black dark:text-white min-h-screen">
          Loading
        </p>
      )}
      <Tasklist />
    </div>
  );
};

export default Home;
