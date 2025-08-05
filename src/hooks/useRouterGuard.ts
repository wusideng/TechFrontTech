import { useAppDispatch, useAppSelector } from "@/store";
import { getTodoOrderCount } from "@/store/slices/orderSlice";
import { baseUrl } from "@/util/config";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRouterGuard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { routerLocation } = useAppSelector((state) => state.router);
  const { user } = useAppSelector((state) => state.user);
  const { current, previous } = routerLocation;

  useEffect(() => {
    console.log(`${previous}->${current}`);
    if (user) {
      dispatch(getTodoOrderCount(user.openid));
    }
  }, [current, previous]);
  return { previous, current };
};

export default useRouterGuard;
