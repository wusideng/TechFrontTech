import RouterComponent from "@/router";
import useInitUser from "@/hooks/useInitUser";
import usePrevLocationPath from "@/hooks/usePrevLocationPath";
import useAddressSave from "@/hooks/useAddressSave";
import useRouterGuard from "@/hooks/useRouterGuard";

const App = () => {
  usePrevLocationPath();
  useInitUser();
  useRouterGuard();
  useAddressSave();
  return <RouterComponent />;
};

export default App;
