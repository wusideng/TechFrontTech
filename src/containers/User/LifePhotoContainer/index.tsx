import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image, ImageUploader, ImageViewer, Toast } from "antd-mobile";

import { updateTechLifePhotoApi } from "@/api/applyApi";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { useAppSelector } from "@/store";
import styles from "./style.module.less";

const LifePhotoContainer = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user); // 确保路径正确
  const [loading, setLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const [viewImageVisable, setViewImageVisable] = useState(false);
  const [lifeImg1, setLifeImg1] = useState();
  const [lifeImg2, setLifeImg2] = useState();
  const [lifeImg3, setLifeImg3] = useState();

  const uploadFile = async (file) => {
    if (file.size / 1024 / 1024 > 3) {
      Toast.show(
        `照片过大${Math.ceil(
          file.size / 1024 / 1024
        )}，请重新上传照片不大于3M的照片`
      );
      throw new Error("上传失败");
      return;
    }
    if (lifeImg1 == undefined) {
      setLifeImg1(file);
    } else if (lifeImg2 == undefined) {
      setLifeImg2(file);
    } else if (lifeImg3 == undefined) {
      setLifeImg3(file);
    }
    let formData = new FormData();
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
    if (
      lifeImg1 == undefined ||
      lifeImg2 == undefined ||
      lifeImg3 == undefined
    ) {
      Toast.show({
        content: "请上传三张生活照",
      });
      return;
    }
    setLoading(true);
    let formData = new FormData();
    formData.append("photo_life_1", lifeImg1);
    formData.append("photo_life_2", lifeImg2);
    formData.append("photo_life_3", lifeImg3);
    try {
      await updateTechLifePhotoApi(formData, user.openid);
      Toast.show({
        content: '上传生活照成功。可在 "申请状态"  查看审核进度',
        duration: 5000,
      });
      setLoading(false);
      navigate(-1);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setLoading(false);
      detail &&
        Toast.show({
          content: detail,
        });
    }
  };

  const viewImage = (imgUrl) => {
    setViewImageUrl(imgUrl);
    setViewImageVisable(true);
  };

  return (
    <MiddleContentHeader
      title={"生活照上传"}
      loading={loading}
      withFooter={false}
      className={styles.photo_upload_container_wrapper}
    >
      <div className={styles.content_outer_wrapper}>
        <div className={styles.content_inner_wrapper}>
          <p style={{ fontWeight: "bold" }}>线上生活照</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Image
              src={user.photo_life_1 ?? "empty-image"}
              width={"108px"}
              height={"108px"}
              fit="contain"
              style={{ padding: "2px" }}
              lazy
              onClick={() => {
                viewImage(user.photo_life_1);
              }}
            />
            <Image
              src={user.photo_life_2 ?? "empty-image"}
              width={"108px"}
              height={"108px"}
              fit="contain"
              style={{ padding: "2px" }}
              lazy
              onClick={() => {
                viewImage(user.photo_life_2);
              }}
            />
            <Image
              src={user.photo_life_3 ?? "empty-image"}
              width={"108px"}
              height={"108px"}
              fit="contain"
              style={{ padding: "2px" }}
              lazy
              onClick={() => {
                viewImage(user.photo_life_3);
              }}
            />
          </div>
          <p style={{ fontWeight: "bold" }}>新的生活照</p>
          <p>添加三张新的生活照，进行替换，照片不能大于3M</p>
          <ImageUploader
            columns={3}
            maxCount={3}
            upload={uploadFile}
            style={{ marginTop: "10px" }}
          />
          <p>1）生活照不遮脸，不露胸，衣着整洁得体。</p>
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
            提交生活照
          </Button>
        </div>
      </div>
    </MiddleContentHeader>
  );
};

export default LifePhotoContainer;
