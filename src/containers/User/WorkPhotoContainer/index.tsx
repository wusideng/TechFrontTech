import { useState } from "react";
import { useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import { ImageUploader, Button, Toast, Image, ImageViewer } from "antd-mobile";

import { updateTechWorkPhotoApi } from "@/api/applyApi";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import styles from "./style.module.less";

const WorkPhotoContainer = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const [loading, setLoading] = useState(false);
  const [fileImg, setFileImg] = useState();
  const [viewImageUrl, setViewImageUrl] = useState("");
  const [viewImageVisable, setViewImageVisable] = useState(false);

  const uploadFile = async (file) => {
    // 在这里添加自定义上传逻辑
    setFileImg(file);
    // 模拟异步上传
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
    if (!fileImg) {
      Toast.show({
        content: "请上传工作照",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("photo_work", fileImg);
    try {
      await updateTechWorkPhotoApi(formData, user.openid);
      Toast.show({
        content: '上传工作照成功。可在 "申请状态"  查看审核进度',
        duration: 5000,
      });
      setLoading(false);
      navigate(-1);
    } catch (err) {
      setLoading(false);
      const detail = err?.response?.data?.detail;
      detail &&
        Toast.show({
          content: detail,
          duration: 5000,
        });
    }
  };
  const viewImage = (imgUrl) => {
    setViewImageUrl(imgUrl);
    setViewImageVisable(true);
  };
  return (
    <MiddleContentHeader
      title={"工作照上传"}
      withFooter={false}
      loading={loading}
      className={styles.photo_upload_container_wrapper}
    >
      <div className={styles.content_outer_wrapper}>
        <div className={styles.content_inner_wrapper}>
          <p style={{ fontWeight: "bold" }}>线上工作照</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Image
              src={user?.photo_work ?? "empty-image"}
              width={"108px"}
              height={"108px"}
              fit="contain"
              style={{ padding: "2px" }}
              onClick={() => {
                viewImage(user?.photo_work);
              }}
            />
          </div>
          <p style={{ fontWeight: "bold" }}>新的工作照</p>
          <ImageUploader
            upload={uploadFile}
            maxCount={1}
            style={{ "--cell-size": "120px", marginTop: 10 }}
          />
          <p>1）穿着标准的按摩工作服，确保整洁、干净。</p>
          <p>2）相机应与被摄者的眼睛平齐，避免仰拍或俯拍。</p>
          <p>3）保持适当拍摄距离，确保膝盖以上部分完整入镜。</p>
          <p>4）避免佩戴过于显眼的配饰，以保持专业形象。</p>
          <p>5）尽量利用自然光，避免强烈阴影。</p>
          <p>无法上传或者无法提交联系客服处理</p>

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
        </div>
        <div className={styles.bottom_button_wrapper}>
          <Button color="primary" block onClick={submitHandler}>
            提交工作照
          </Button>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default WorkPhotoContainer;
