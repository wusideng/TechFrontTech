import { useState } from "react";
import { ImageUploader, Button, Toast, Image, ImageViewer } from "antd-mobile";

import { submitCertificateApi } from "@/api/applyApi";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.less";

// 从业资格证书
const CertificateContainer = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const [loading, setLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const [viewImageVisable, setViewImageVisable] = useState(false);

  const [fileBusiness, setFileBusiness] = useState(); //商户执照
  const [fileTechnician, setFileTechnician] = useState();
  const [fileHealth, setFileHealth] = useState();

  const uploadFile = async (file, filetype) => {
    if (filetype == "businessLicense") {
      setFileBusiness(file);
    } else if (filetype == "technicianCertificate") {
      setFileTechnician(file);
    } else if (filetype == "healthCertificate") {
      setFileHealth(file);
    } else {
      Toast.show("上传文件错误");
      return;
    }
    // 下面代码是必须的，异步上传也需要前端上传后才能成功
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // 处理上传成功后的逻辑
      if (data.success) {
        return {
          url: data.url, // 返回上传后的文件 URL
          id: data.id, // 可选，返回文件 ID
        };
      } else {
        throw new Error("上传失败");
      }
    } catch (error) {
      console.error("上传出错", error);
      throw error; // 抛出错误以防止文件添加到列表
    }
  };

  const submitHandler = async () => {
    if (!fileBusiness) {
      Toast.show({
        content: "请上传营业执照",
      });
      return;
    }
    if (!fileTechnician) {
      Toast.show({
        content: "请上传技师证",
      });
      return;
    }
    if (!fileHealth) {
      Toast.show({
        content: "请上传健康证",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("business_license_file", fileBusiness);
    formData.append("technician_certificate_file", fileTechnician);
    formData.append("health_certificate_file", fileHealth);
    try {
      await submitCertificateApi(formData, user.openid);
      Toast.show({
        content: "提交成功",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      detail &&
        Toast.show({
          content: detail,
        });
    }
    setLoading(false);
    navigate(-1);
  };
  const viewImage = (imgUrl) => {
    setViewImageUrl(imgUrl);
    setViewImageVisable(true);
  };
  return (
    <MiddleContentHeader
      title={"提交从业资格证书"}
      loading={loading}
      withFooter={false}
      className={styles.photo_upload_container_wrapper}
    >
      <div className={styles.content_outer_wrapper}>
        <div className={styles.content_inner_wrapper}>
          <p style={{ fontWeight: "bold" }}>上传商户执照</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Image
              src={user.business_license ?? "empty-image"}
              width={"108px"}
              height={"108px"}
              fit="contain"
              style={{ padding: "2px" }}
              onClick={() => {
                viewImage(user.business_license);
              }}
            />
            <ImageUploader
              upload={(file) => uploadFile(file, "businessLicense")}
              maxCount={1}
              style={{ "--cell-size": "110px", marginLeft: 10 }}
            />
          </div>
          <p style={{ fontWeight: "bold" }}>上传技师证</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            {/* {user.photo_work ? ( */}
            <Image
              src={user.technician_certificate ?? "empty-image"}
              width={"108px"}
              height={"108px"}
              fit="contain"
              style={{ padding: "2px" }}
              onClick={() => {
                viewImage(user.technician_certificate);
              }}
            />
            {/* ) : null} */}
            <ImageUploader
              upload={(file) => uploadFile(file, "technicianCertificate")}
              maxCount={1}
              style={{ "--cell-size": "110px", marginLeft: 10 }}
            />
          </div>
          <p style={{ fontWeight: "bold" }}>
            {/* <span style={{ color: "#ff0000" }}>*</span> */}
            上传健康证
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Image
              src={user.health_certificate ?? "empty-image"}
              width={"108px"}
              height={"108px"}
              fit="contain"
              style={{ padding: "2px" }}
              onClick={() => {
                viewImage(user.health_certificate);
              }}
            />
            <ImageUploader
              upload={(file) => uploadFile(file, "healthCertificate")}
              maxCount={1}
              style={{ "--cell-size": "110px", marginLeft: 10 }}
            />
          </div>

          <ImageViewer
            classNames={{
              mask: "customize-mask",
              body: "customize-body",
            }}
            image={viewImageUrl}
            visible={viewImageVisable}
            onClose={() => {
              setViewImageVisable(false);
            }}
          />
          <p>1）技师上线前需要上传：商户执照、技师证、健康证。</p>
          <p>2）如缺少部分证件可以联系城市管理员协助办理。</p>
          <p>3）上传证件照片要求字迹清晰，并拍全证件全部内容。</p>
        </div>
        <div className={styles.bottom_button_wrapper}>
          <Button color="primary" block onClick={submitHandler}>
            提交从业资格证
          </Button>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default CertificateContainer;
