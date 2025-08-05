import React from "react";
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, TabBar } from "antd-mobile";
import { baseUrl } from "@/util/config";
import { useAppSelector } from "@/store";
const TodoOrdersCount = () => {
  const { todoOrderCount } = useAppSelector((state) => state.order);

  return (
    <Badge
      content={todoOrderCount}
      style={{ "--right": "-10px", "--top": "-22px" }}
    >
      订单
    </Badge>
  );
};
const tabs = [
  {
    key: "home",
    title: "首页",
    icon: <AppOutline />,
    badge: Badge.dot,
  },
  {
    key: "order",
    title: <TodoOrdersCount />,
    icon: <UnorderedListOutline />,
    badge: "5",
  },
  {
    key: "user",
    title: "我的",
    icon: <UserOutline />,
  },
];

// export default function FooterBar() {
//   const { wxuser, user } = useAppSelector((state) => state.user);
//   const { todoOrder } = useAppSelector((state) => state.common);

//   const navigate = useNavigate();

//   // 登陆认证
//   function isLogin() {
//     if (wxuser.openid == "" || wxuser.openid == undefined) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   // 绑定手机号
//   function isBindPhone() {
//     if (
//       user.user_phone == "" ||
//       user.user_phone == "string" ||
//       user.user_phone == undefined
//     ) {
//       return false;
//     } else {
//       return true;
//     }
//   }
//   const location = useLocation();
//   const tabs = getMenu(todoOrder);
//   const renderMenu = () => {
//     return tabs.map((item) => (
//       <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
//     ));
//   };
//   return (
//     <TabBar
//       style={{ marginTop: "auto", borderTop: "0.5px solid #ececec" }}
//       defaultActiveKey={"home"}
//       activeKey={
//         tabs.map((item) => item.key).includes(location.pathname.split("/")[2])
//           ? location.pathname.split("/")[2]
//           : "home"
//       }
//       onChange={(menuItem) => {
//         if (menuItem == "home") {
//           // 首页不进行身份验证
//           navigate(`/${baseUrl}/${menuItem}`); // 替换为目标路由
//         }
//         if (isLogin() && isBindPhone()) {
//           // 路由跳转到指定路径
//           navigate(`/${baseUrl}/${menuItem}`); // 替换为目标路由
//         } else if (!isLogin()) {
//           navigate(`/${baseUrl}/login`);
//         } else if (!isBindPhone()) {
//           navigate(`/${baseUrl}/phoneLogin`);
//         }
//       }}
//     >
//       {renderMenu()}
//     </TabBar>
//   );
// }

export default function FooterBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <TabBar
      style={{ marginTop: "auto" }}
      defaultActiveKey={"home"}
      activeKey={
        tabs.map((item) => item.key).includes(location.pathname.split("/")[2])
          ? location.pathname.split("/")[2]
          : "home"
      }
      onChange={(menuItem: any) => {
        navigate(`/${baseUrl}/${menuItem}`);
      }}
    >
      {tabs.map((item: any) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
}
