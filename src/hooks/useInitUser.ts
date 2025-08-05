import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl, isDev } from "@/util/config";
import { useEffect, useState } from "react";
import {
  getUserInfoByWxCode,
  getUserInfoByOpenId,
} from "@/store/slices/userSlice";
import { getCookie } from "@/util/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { TechUser } from "@/types/TechUser";
const loginExemptRoutes = [
  `/${baseUrl}/login`,
  `/${baseUrl}/agreement/privacy`,
  `/${baseUrl}/register`,
];

const useInitUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, loadUserInfoFailure, loadingUser } = useAppSelector(
    (state) => state.user
  );
  const [hasJumped, setHasJumped] = useState(false);
  // const prevLocationPath = usePrevLocationPath();
  const { routerLocation } = useAppSelector((state) => state.router);
  const { previous: prevLocationPath } = routerLocation;
  const searchParams = new URLSearchParams(location.search);
  // 获取特定的查询参数
  const code = searchParams.get("code");
  const isAuth = () => {
    if (isDev) {
      return isLogin();
    }
    return getCookie("openid");
  };
  const isLogin = () => {
    if (process.env.auto_login_id && isDev) {
      document.cookie = `openid=${process.env.auto_login_id}; path=/; max-age=7200; domain=${window.location.hostname}`;
      return true;
    }
    return user !== null;
  };
  useEffect(() => {
    if (isLogin() && user) {
      if (user?.joinStatus == "unapplied" && !hasJumped) {
        setHasJumped(true);
        navigate(`/${baseUrl}/`);
        navigate(`/${baseUrl}/joinUs`);
      } else {
        setHasJumped(true);
      }
    } else {
      navigate(`/${baseUrl}/`);
    }
  }, [user]);

  useEffect(() => {
    //跳转login条件
    //从首页跳转至其他页面，并且cookie里没有openid或者 得到了用户数据发现没有电话
    //还有这个其他页面只是功能页，不包括注册页面之类的
    if (
      // prevLocationPath == `/${baseUrl}/` &&
      !loginExemptRoutes.includes(location.pathname)
    ) {
      if (!isAuth() && !code) {
        navigate(`/${baseUrl}/`, { replace: true });
        navigate(`/${baseUrl}/login`);
      }
    }
  }, [location.pathname, user]);

  //有cookie但从cookie的openid没有查到用户，这种情况直接跳转login
  useEffect(() => {
    if (loadUserInfoFailure) {
      navigate(`/${baseUrl}/`, { replace: true });
      navigate(`/${baseUrl}/login`);
    }
  }, [loadUserInfoFailure]);

  useEffect(() => {
    const init = async () => {
      //根据cookie登录
      if (isAuth()) {
        dispatch(getUserInfoByOpenId());
      }
      //根据微信code登录,微信登录后跳转会自动加code参数，微信给加的
      if (code) {
        const res: TechUser = await dispatch(
          getUserInfoByWxCode({ code })
        ).unwrap();

        // navigate(`/${baseUrl}/`);
      }
    };
    if (!user) {
      init();
    }
  }, [user]);
};
export default useInitUser;
