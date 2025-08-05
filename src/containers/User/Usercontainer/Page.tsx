import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Button, Card, Toast } from "antd-mobile";
import { SetOutline, UnorderedListOutline } from "antd-mobile-icons";
import { baseUrl } from "@/util/config";
import MiddleContentTab from "@/components/layout/MiddleContentTab";
import { useAppDispatch, useAppSelector } from "@/store";
import styles from "./style.module.less";
import { Link } from "react-router-dom";
const size = "small";
const Page = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const { address } = useAppSelector((state) => state.address);
  const { sum } = useAppSelector((state) => state.bill);
  const { applyingStatus } = useAppSelector((state) => state.applyStatus);

  function turoToLogin() {
    navigate(`/${baseUrl}/login`);
  }
  function turnToWorkTimeHandler() {
    navigate(`/${baseUrl}/user/worktime`);
  }

  return (
    <MiddleContentTab
      className={styles.user_container_wrapper}
      loading={loading}
    >
      <Card className="card-style user-head-card">
        <div className={styles.user_header}>
          <SetOutline
            color={"var(--theme-color-secondary)"}
            style={{ position: "absolute", right: 12, top: 12 }}
            fontSize={22}
            onClick={() => {
              navigate(`/${baseUrl}/user/settings`);
            }}
          />
          <div className={styles.photo}>
            <Image
              src={
                user.photo_work
                  ? user.photo_work
                  : user.headimgurl?.replace("https://thirdwx", "https://wx")
              }
              width={100}
              height={100}
              fit="fill"
            />
          </div>
          <div className={styles.control}>
            <div className={styles.nickname}>{user.user_nickname}</div>
            <div className={styles.control_line}>
              <div>注册城市:</div>
              <div> {user.user_city ? user.user_city : "暂无"}</div>
            </div>
            <div className={styles.control_line}>
              <div>当前城市:</div>
              <div>{address?.city ? address.city : "暂无，请打开手机定位"}</div>
            </div>
            {!user ? (
              <Button color="primary" size={size} onClick={turoToLogin}>
                登陆/注册
              </Button>
            ) : null}
          </div>
        </div>
        {/* <p>
          {address?.work_position ? address?.work_position : "暂未设定接单位置"}
        </p> */}
      </Card>
      <Card title={"上线状态"} className="card-style">
        <div className={styles.online_status_wrapper}>
          <div className={styles.online_status_first_line}>
            <div>上线状态:</div>
            {user.user_online_status == "online" ? (
              <div style={{ color: "#00b578" }}>已上线</div>
            ) : (
              <div className={styles.online_status}>
                <div style={{ color: "#ff0000" }}>未上线</div>
              </div>
            )}
          </div>
          {user.user_online_status != "online" && (
            <div style={{ color: "#ff0000" }}>请咨询城市管理员,并申请上线</div>
          )}
        </div>
      </Card>
      <Card title={"我的钱包"} className="card-style">
        <div className={styles.pay_card}>
          <div className={styles.pay_count}>
            <span>账户收益：</span>
            <span className="money-color">¥</span>
            <span className="money-color">
              {sum.total_product_unpaid_income + sum.total_product_paid_income}
            </span>
          </div>
          <div className={styles.pay_remind}>
            <div>待提取：¥ {sum.total_product_unpaid_income} 元</div>
            <div>已提取：¥ {sum.total_product_paid_income}元</div>
          </div>
          {/* <div className="pay_remind">
            <div>车费：待提取：¥ {sum.total_travel_unpaid} 元</div>
            <div>已提取：¥ {sum.total_travel_paid}元</div>
          </div> */}
          <div className={styles.pay_remind}>
            <div>每周五发放收益</div>
            <div>
              <Link to={`/${baseUrl}/user/benefit_detail_info`}>收益详情</Link>
            </div>
          </div>
        </div>
      </Card>
      <Card title={"上线管理"} className="card-style">
        <div className={styles.user_item_line}>
          <div>申请状态查看</div>
          <Button
            color="primary"
            size={size}
            onClick={() => {
              navigate(`/${baseUrl}/user/apply`);
            }}
          >
            申请状态
          </Button>
        </div>
        <div className={styles.user_item_line}>
          <div>修改基本信息</div>
          <Button
            color="primary"
            size={size}
            onClick={async () => {
              if (
                applyingStatus.find(
                  (as) =>
                    as.apply_type == "tech_join" && as.apply_status == "apply"
                )
              ) {
                Toast.show(
                  "您已提交申请，请耐心等待审核结果，如需加急，请联系城市管理员。"
                );
                return;
              }
              navigate(`/${baseUrl}/joinUs`);
            }}
          >
            基本信息
          </Button>
        </div>
        <div className={styles.user_item_line}>
          <div>工作照专业规范</div>
          <Button
            color="primary"
            size={size}
            onClick={() => {
              if (
                applyingStatus.find(
                  (as) =>
                    as.apply_type == "tech_workphoto" &&
                    as.apply_status == "apply"
                )
              ) {
                Toast.show(
                  "您已提交申请，请耐心等待审核结果，如需加急，请联系城市管理员。"
                );
                return;
              }
              navigate(`/${baseUrl}/user/workphoto`);
            }}
          >
            工作照上传
          </Button>
        </div>
        <div className={styles.user_item_line}>
          <div>生活照清新自然</div>
          <Button
            color="primary"
            size={size}
            onClick={() => {
              if (
                applyingStatus.find(
                  (as) =>
                    as.apply_type == "tech_lifephoto" &&
                    as.apply_status == "apply"
                )
              ) {
                Toast.show(
                  "您已提交申请，请耐心等待审核结果，如需加急，请联系城市管理员。"
                );
                return;
              }
              navigate(`/${baseUrl}/user/lifephoto`);
            }}
          >
            生活照上传
          </Button>
        </div>
        <div className={styles.user_item_line}>
          <div>证件齐全素质过硬</div>
          <Button
            color="primary"
            size={size}
            onClick={() => {
              if (
                applyingStatus.find(
                  (as) =>
                    as.apply_type == "tech_certificate" &&
                    as.apply_status == "apply"
                )
              ) {
                Toast.show(
                  "您已提交申请，请耐心等待审核结果，如需加急，请联系城市管理员。"
                );
                return;
              }
              navigate(`/${baseUrl}/user/certificate`);
            }}
          >
            从业资格证
          </Button>
        </div>
      </Card>
      <Card title={"接单设置"} className="card-style">
        <div className={styles.user_item_line}>
          <div>随心设置接单时间</div>
          <Button color="primary" size={size} onClick={turnToWorkTimeHandler}>
            设置接单时间
          </Button>
        </div>
        <div className={styles.user_item_line}>
          <div>灵活指定接单位置</div>
          <Button
            color="primary"
            size={size}
            onClick={() => {
              navigate(`/${baseUrl}/user/addressmanagement`);
            }}
          >
            管理接单位置
          </Button>
        </div>
        {/* <div className={styles.user_item_line}>
          <div>查看我的接单轨迹</div>
          <Button
            color="primary"
            size={size}
            onClick={() => {
              navigate(`/${baseUrl}/user/historyLocal`);
            }}
          >
            查看历史轨迹
          </Button>
        </div> */}
      </Card>
      <Card title={"合约线上签订"} className="card-style">
        <p
          onClick={() => {
            navigate(`/${baseUrl}/user/contract/techportrait`);
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <UnorderedListOutline />
          </span>
          肖像权合约
        </p>
        <p
          onClick={() => {
            navigate(`/${baseUrl}/user/contract/techlaw`);
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <UnorderedListOutline />
          </span>
          遵纪守法承诺书
        </p>
        <p
          onClick={() => {
            navigate(`/${baseUrl}/user/contract/techtraining`);
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <UnorderedListOutline />
          </span>
          技师培训协议
        </p>
        <p
          onClick={() => {
            navigate(`/${baseUrl}/user/contract/techdealer`);
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <UnorderedListOutline />
          </span>
          商家入驻合作协议
        </p>
      </Card>
      <Card title={"平台信息"} className="card-style">
      <div>版本号：V1.05.0723</div>

      </Card>
    </MiddleContentTab>
  );
};

export default Page;
