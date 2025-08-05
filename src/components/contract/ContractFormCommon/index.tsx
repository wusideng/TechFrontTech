// components/ContractForm.tsx
import React, { useState, useEffect } from "react";
import {
  Image,
  ImageUploader,
  Form,
  Input,
  Button,
  Toast,
  Card,
} from "antd-mobile";
import SignaturePad from "../SignaturePad";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchContractStatus,
  submitContract,
} from "@/store/slices/contractSlice";
import styles from "./style.module.less";

interface FormField {
  name: string;
  label: string;
  required?: boolean;
  type?: "input" | "imageUpload";
  uploadType?: "front" | "back";
  placeholder?: string;
}

interface ContractFormProps {
  contractType: string;
  contractTypeDisplay: string;
  requiredFiles?: ("photoFront" | "photoBack")[];
  fields: FormField[];
  getInitialValues?: (contractFile: any, user: any) => Record<string, any>;
  //   getSubmitData?: (values: any) => Record<string, any>;
}

const ContractForm: React.FC<ContractFormProps> = ({
  contractType,
  contractTypeDisplay,
  requiredFiles = [],
  fields,
  getInitialValues,
  //   getSubmitData,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const { contractFile } = useAppSelector((state) => state.contract);
  const [photoFront, setPhotoFront] = useState(null);
  const [photoBack, setPhotoBack] = useState(null);
  const [signature, setSignature] = useState(null);
  const [isSignatureFullscreen, setIsSignatureFullscreen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchContractStatus({
        openid: user.openid,
        contract_type: contractTypeDisplay,
      })
    );
  }, [dispatch, user.openid, contractTypeDisplay]);

  const base64ToFile = (base64String: string, filename: string) => {
    const base64Data = base64String.split(",")[1];
    const binaryData = atob(base64Data);
    const uint8Array = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: "image/png" });
    return new File([blob], filename, { type: "image/png" });
  };

  const uploadFile = async (file: File, filetype: "front" | "back") => {
    if (filetype === "front") {
      setPhotoFront(file);
    } else if (filetype === "back") {
      setPhotoBack(file);
    }

    let formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        return {
          url: data.url,
          id: data.id,
        };
      } else {
        throw new Error("上传失败");
      }
    } catch (error) {
      console.error("上传出错", error);
      throw error;
    }
  };

  const handleSubmit = async (values: any) => {
    if (!signature) {
      Toast.show("请先签名");
      return;
    }

    if (requiredFiles.includes("photoFront") && !photoFront) {
      Toast.show("请上传身份证正面照");
      return;
    }

    if (requiredFiles.includes("photoBack") && !photoBack) {
      Toast.show("请上传身份证反面照");
      return;
    }

    let formData = new FormData();
    formData.append("tech_openid", user.openid);

    // 添加自定义字段
    // const customFields = getSubmitData ? getSubmitData(values) : values;
    const customFields = values;
    Object.entries(customFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    // 添加文件
    if (photoFront && requiredFiles.includes("photoFront")) {
      formData.append("photo_front", photoFront);
    }

    if (photoBack && requiredFiles.includes("photoBack")) {
      formData.append("photo_back", photoBack);
    }

    if (signature) {
      const signatureFile = base64ToFile(signature, "signature.png");
      formData.append("signature", signatureFile);
    }

    await dispatch(
      submitContract({ data: formData, contract_type: contractType })
    );
    Toast.show({ content: "提交成功" });
  };

  const toggleSignatureFullscreen = () => {
    setIsSignatureFullscreen(true);
  };

  const clearSignature = () => {
    setSignature("");
  };

  const initialValues = getInitialValues
    ? getInitialValues(contractFile, user)
    : {};

  const renderField = (field: FormField) => {
    if (field.type === "imageUpload") {
      return (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          className={styles.image_form_item}
        >
          <ImageUploader
            maxCount={1}
            style={{ "--cell-size": "120px", marginTop: 10 }}
            upload={(file) => uploadFile(file, field.uploadType!)}
          />
        </Form.Item>
      );
    }

    return (
      <Form.Item
        key={field.name}
        name={field.name}
        label={field.label}
        rules={
          field.required
            ? [{ required: true, message: `请输入${field.label}` }]
            : []
        }
        // layout="horizontal"
      >
        <Input placeholder={field.placeholder} />
      </Form.Item>
    );
  };
  const handleFinishFailed = (errorInfo) => {
    const errorfield = errorInfo.errorFields[0].errors[0];
    Toast.show({
      content: errorfield,
    });
    return;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_wrapper}>
        <Card className={styles.card}>
          <Form
            onFinishFailed={handleFinishFailed}
            className={styles.form_wrapper + " " + "custom-form"}
            initialValues={initialValues}
            onFinish={handleSubmit}
            form={form}
          >
            {fields.map(renderField)}

            <Form.Item name="signature" label={"手写签字"}>
              <div className={styles.button_wrapper2}>
                <Button size="mini" onClick={toggleSignatureFullscreen}>
                  全屏签字
                </Button>
                {signature && (
                  <Button size="mini" onClick={clearSignature}>
                    清除
                  </Button>
                )}
              </div>
            </Form.Item>
            {signature && (
              <Image
                src={signature}
                height={300}
                fit="fill"
                style={{ marginTop: 12 }}
              />
            )}
          </Form>
        </Card>
      </div>
      {isSignatureFullscreen && (
        <SignaturePad
          onCancel={() => {
            setIsSignatureFullscreen(false);
          }}
          onSave={(signature) => {
            setSignature(signature);
            setIsSignatureFullscreen(false);
          }}
        />
      )}
      <div className={styles.button_wrapper}>
        <Button
          block
          type="submit"
          color="primary"
          onClick={() => {
            form.submit();
          }}
        >
          签订合约
        </Button>
      </div>
    </div>
  );
};

export default ContractForm;
