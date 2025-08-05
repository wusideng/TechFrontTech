// WeChatLogin.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Grid, Input } from "antd-mobile";
import { PhonebookFill } from "antd-mobile-icons";

import { baseUrl, isDev } from "@/util/config";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { useAppDispatch } from "@/store";
import { setMockUser } from "@/store/slices/userSlice";

const WeChatLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [wechatModel, setwechatModel] = useState(true);

  const loginHandler = () => {
    const appId = "wxfa6035d95514257e"; // 替换为你的 AppID
    const redirectUri = encodeURIComponent(
      `https://visualstreet.cn/${baseUrl}/`
    ); // 替换为你的重定向 URI
    const state = Math.random().toString(36).substring(7); // 随机生成状态字符串
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    window.location.href = authUrl; // 重定向到微信授权页面
  };

  const mockLogin = () => {
    dispatch(setMockUser());
    // dispatch(setMockWxUser());
    localStorage.setItem("userToken", "mockopenid");
    navigate(`/${baseUrl}/`);
    // dispatch(setMenu("home"));
  };

  const mockLoginPhone = () => {
    dispatch(setMockUser());
    // dispatch(setMockWxUser());
    localStorage.setItem("userToken", "mockopenid");
    navigate(`/${baseUrl}/`);
    // dispatch(setMenu("home"));
  };
  const mockLogOut = () => {
    localStorage.removeItem("userToken");
  };

  const turnToVoice = () => {
    navigate(`/${baseUrl}/voiceDemo/`);
  };
  const wechatLogin = (
    <div>
      <div className="login-title">注册/登录</div>
      <Grid columns={2} gap={8}>
        <Grid.Item span={2}>
          <Button block color="primary" onClick={loginHandler}>
            微信登陆
          </Button>
        </Grid.Item>
        {isDev ? (
          <DevComponent
            mockLogin={mockLogin}
            mockLoginPhone={mockLoginPhone}
            turnToVoice={turnToVoice}
            mockLogOut={mockLogOut}
          />
        ) : null}
      </Grid>
      <div className="contract">
        <Checkbox
          style={{
            "--icon-size": "18px",
            "--font-size": "14px",
            "--gap": "6px",
          }}
          defaultChecked
        >
          阅读并同意
          <Link to={`/${baseUrl}/agreement/privacy`}>《隐私政策》</Link>
        </Checkbox>
      </div>
    </div>
  );
  // 真实信息绑定
  const phtonLogin = (
    <div>
      <div className="login-title">注册/登录</div>
      <Form
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>手机号码登陆</Form.Header>
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[{ required: true, message: "手机号码不能为空" }]}
        >
          <Input onChange={console.log} placeholder="请输入手机号码" />
        </Form.Item>
        {/* <Form.Item
          name='pwd'
          label='密码'
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input onChange={console.log} placeholder='请输入密码' />
        </Form.Item> */}
      </Form>
    </div>
  );
  const phoneLoginBtn = (
    <div
      className="logintype"
      onClick={() => {
        setwechatModel(false);
      }}
    >
      <p>
        <PhonebookFill color="var(--adm-color-primary)" fontSize={30} />
      </p>
      <p>手机号登陆</p>
    </div>
  );

  const wechatLoginBtn = (
    <div
      className="logintype"
      onClick={() => {
        setwechatModel(true);
      }}
    >
      <p>
        <PhonebookFill color="var(--adm-color-primary)" fontSize={30} />
      </p>
      <p>微信登陆</p>
    </div>
  );

  return (
    <MiddleContentHeader title={"登陆"} className="login-wrapper">
      <div className="login">
        <div className="advertising">
          <p>您好，</p>
          <p>欢迎使用尚达元</p>
        </div>
        {wechatModel ? wechatLogin : phtonLogin}
        {/* {wechatModel ? phoneLoginBtn : wechatLoginBtn} */}
      </div>
    </MiddleContentHeader>
  );
};

export default WeChatLogin;

const DevComponent = ({
  mockLogin,
  mockLoginPhone,
  turnToVoice,
  mockLogOut,
}) => {
  return (
    <>
      <Grid.Item>
        <Button block color="primary" onClick={mockLogin}>
          模拟登陆(ocM)
        </Button>
      </Grid.Item>
      <Grid.Item>
        <Button block color="primary" onClick={mockLoginPhone}>
          模拟登陆Ph(ocM)
        </Button>
      </Grid.Item>
      <Grid.Item>
        <Button block color="primary" onClick={turnToVoice}>
          语音模拟
        </Button>
      </Grid.Item>
      <Grid.Item>
        <Button block color="primary" onClick={() => {}}>
          短信模拟
        </Button>
      </Grid.Item>
      <Grid.Item span={2}>
        <Button block color="primary" onClick={mockLogOut}>
          退出
        </Button>
      </Grid.Item>
    </>
  );
};
