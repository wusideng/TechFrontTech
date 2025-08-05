import { RefObject, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  TextArea,
  Space,
  Card,
  Toast,
  PickerRef,
  Picker,
} from "antd-mobile";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { bankTypeOptions } from "./pickerOptions";
import { baseUrl } from "@/util/config";
import { createApplyStatus } from "@/store/slices/applyStatusSlice";
import { ApplyStatus } from "@/types/ApplyStatus";
import { getOpenCitiesApi } from "@/api/addressApi";
import useRouterGuard from "@/hooks/useRouterGuard";

const JoinUsContainer = () => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const [loading, setLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState<any>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const { previous } = useRouterGuard();
  useEffect(() => {
    const init = async () => {
      setLoadingCities(true);
      const citys = await getOpenCitiesApi();
      setLoadingCities(false);
      const cityOptions = citys.map((city) => {
        return { label: city, value: city };
      });
      setCityOptions(cityOptions);
    };
    init();
  }, []);
  const handleSubmit = async (values) => {
    let techUserInfo: ApplyStatus = {
      ...values,
      user_city: values.user_city[0],
      bank_card_type: values.bank_card_type ? values.bank_card_type[0] : null,
      apply_type: "tech_join",
      apply_status: "apply",
      tech_id: user.openid,
    };
    try {
      await dispatch(createApplyStatus(techUserInfo)).unwrap();
      Toast.show({
        content: '申请已提交，可在 "申请状态"  查看审核进度',
      });
      navigate(-1);
    } catch (err) {
      // 这里已经没必要了，因为我们在usercontainer堵住了入口
      // 不让技师重复填写了，所以这里不需要处理错误信息了。
      const detail = err?.response?.data?.detail;
      setLoading(false);
      detail &&
        Toast.show({
          content: detail,
        });
    }
  };

  const handleFinishFailed = (errorInfo) => {
    const errorfield = errorInfo.errorFields[0].errors[0];
    Toast.show({
      content: errorfield,
    });
    return;
  };

  return (
    <MiddleContentHeader
      title="申请上线"
      withFooter={false}
      loading={loading || loadingCities}
      className={styles.join_us_container}
    >
      <div className={styles.wrapper}>
        <div className={styles.form_card_wrapper}>
          <div className={styles.advertising}>
            <p>欢迎加入尚达元!!</p>
            <p>加入我们，成为专业技师！</p>
          </div>

          {/* 表单区域 */}
          <Card className={styles.form_card}>
            <Form
              className="custom-form"
              style={{ "--border-bottom": "none" }}
              form={form}
              onFinish={handleSubmit}
              onFinishFailed={handleFinishFailed}
              layout="vertical"
              initialValues={{
                user_nickname: user?.user_nickname,
                work_phone: user?.work_phone,
                // user_phone: user?.user_phone,
                user_sex: user?.user_sex || "女",
                user_age: user?.user_age,
                user_city: [user?.user_city],
                user_desc: user?.user_desc,
                bank_card_type: [user?.bank_card_type],
                // bank_card_id: user?.bank_card_id,
              }}
            >
              <Form.Item
                name="user_city"
                label="选择城市"
                rules={[{ required: true, message: "请选择城市" }]}
                trigger="onConfirm"
                onClick={(e, pickerRef: RefObject<PickerRef>) => {
                  pickerRef.current?.open();
                }}
              >
                <Picker columns={[cityOptions]}>
                  {(value) => {
                    return value[0]?.value ? (
                      value[0]?.value
                    ) : (
                      <div className={styles.placeholder}>请选择城市</div>
                    );
                  }}
                </Picker>
              </Form.Item>
              {/* <Form.Item
                name="user_phone"
                label="个人电话"
                rules={[
                  { required: true, message: "请输入个人手机号码" },
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: "请输入正确的个人手机号码",
                  },
                ]}
              >
                <Input type="tel" clearable placeholder="请输入个人手机号码" />
              </Form.Item> */}
              <Form.Item
                name="work_phone"
                label="接单电话"
                rules={[
                  { required: true, message: "请输入接单手机号码" },
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: "请输入正确的接单手机号码",
                  },
                ]}
              >
                <Input type="tel" clearable placeholder="请输入接单手机号码" />
              </Form.Item>
              <Form.Item
                name="emergency_contact"
                label="紧急联系人"
                rules={[
                  { required: true, message: "请输入紧急联系人电话" },
                  {
                    pattern: /^1[3-9]\d{9}$/,
                    message: "请输入正确的紧急联系人电话",
                  },
                ]}
              >
                <Input type="tel" clearable placeholder="请输入接单手机号码" />
              </Form.Item>
              <Form.Item
                name="user_nickname"
                label="艺名"
                rules={[{ required: true, message: "请输入姓名" }]}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item
                name="user_age"
                label="年龄"
                rules={[{ required: true, message: "请输入年龄" }]}
              >
                <Input type="number" placeholder="请输入年龄" />
              </Form.Item>
              <Form.Item
                name="user_sex"
                label="性别"
                rules={[{ required: true, message: "请选择性别" }]}
              >
                <Radio.Group defaultValue={"女"}>
                  <Space>
                    <Radio value="女">女</Radio>
                    <Radio value="男">男</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="user_desc"
                label="个人介绍"
                className={styles.custom_form_item}
                rules={[{ required: true, message: "请输个人介绍" }]}
              >
                <div className={styles.text_area_wrapper}>
                  <TextArea
                    placeholder="请输个人介绍"
                    rows={4}
                    maxLength={500}
                    // showCount
                    className={styles.formTextarea}
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="bank_card_type"
                label="银行卡类型"
                rules={[{ required: false, message: "请选择银行卡类型" }]}
                trigger="onConfirm"
                onClick={(e, pickerRef: RefObject<PickerRef>) => {
                  pickerRef.current?.open();
                }}
              >
                <Picker columns={[bankTypeOptions]}>
                  {(value) => {
                    return value[0]?.value ? (
                      value[0]?.value
                    ) : (
                      <div className={styles.placeholder}>请选择银行卡类型</div>
                    );
                  }}
                </Picker>
              </Form.Item>
              <Form.Item
                layout="vertical"
                name="bank_card_id"
                label="银行卡号"
                rules={[
                  {
                    pattern: /^[0-9]{16,19}$/,
                    message: "请输入有效的银行卡号（16-19位数字）",
                  },
                ]}
              >
                <Input type="number" placeholder="请输入银行卡号" />
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className={styles.submit_button_wrapper}>
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            onClick={() => {
              form.submit();
            }}
          >
            提交申请
          </Button>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default JoinUsContainer;
