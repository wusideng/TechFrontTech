// WeChatCallback.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WeChatCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      // 用 code 交换 access_token 和用户信息
      console.log("code:", code);
      fetchUserInfo(code);
    }
  }, []);

  const fetchUserInfo = async (code) => {
    const appId = "wxfa6035d95514257e"; // 替换为你的 AppID
    const appSecret = "372414c4d175f744237633bfb2432ef8"; // 替换为你的 AppSecret

    // 交换 access_token
    const tokenResponse = await fetch(
      `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`
    );
    const tokenData = await tokenResponse.json();

    if (tokenData.access_token) {
      // 使用 access_token 获取用户信息
      const userInfoResponse = await fetch(
        `https://api.weixin.qq.com/sns/userinfo?access_token=${tokenData.access_token}&openid=${tokenData.openid}`
      );
      const userInfo = await userInfoResponse.json();

      console.log("用户信息：", userInfo);
      // 在这里可以将用户信息存储到 Redux 或其他状态管理中
    } else {
      console.error("获取 access_token 失败:", tokenData);
    }

    // 跳转回主页面或其他逻辑
    // navigate('/');
  };

  return <div>加载中...</div>;
};

export default WeChatCallback;
