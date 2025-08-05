import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ImageUploader, Button, Toast } from "antd-mobile";

import { updateOrderStatusExportApi } from "@/api/orderApi";
import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import orderStatusCodeDict from "@/lib/statusCodeDict.json";
import styles from "./style.module.less";
const techStatusCodeDict = orderStatusCodeDict.tech;

const OrderDetailDepartContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const [loading, setLoading] = useState(false);

  const lastSegment = pathSegments[pathSegments.length - 1];
  const getStatusCodeAndText = () => {
    if (lastSegment === "departEnd") {
      return techStatusCodeDict.has_left;
    } else {
      return techStatusCodeDict.has_on_the_way;
    }
  };

  const [fileImg, setFileImg] = useState<File>();

  const uploadFile = async (file: File) => {
    // 在这里添加自定义上传逻辑
    const compressedFile = await compressImage(file, 0.8, 1080);
    setFileImg(compressedFile);
    // 模拟异步上传
    const formData = new FormData();
    formData.append("file", compressedFile);
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
        content: "请上传图片",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", fileImg);
    const orderStatus = {
      order_id: parseInt(id),
      order_status_type_code: getStatusCodeAndText().code,
      order_status_type: getStatusCodeAndText().text,
      order_operator: "tech",
    };
    // const res = await dispatch(updateOrderStatusExport(formData, orderStatus));
    try {
      setLoading(true);
      await updateOrderStatusExportApi(formData, orderStatus);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      Toast.show({
        content: "提交失败，请重试",
      });
    } finally {
      setLoading(false);
    }
  };
  const compressImage = (
    file,
    quality = 0.8,
    maxWidth = 1080
  ): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // 计算新的尺寸
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // 绘制压缩后的图片
        ctx.drawImage(img, 0, 0, width, height);

        // 转换为 Blob
        canvas.toBlob(
          (blob) => {
            // 创建新的 File 对象，保持原始文件名
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };
  return (
    <MiddleContentHeader
      loading={loading}
      withFooter={false}
      title={"拍照报备"}
      className={styles.wrapper}
    >
      <ImageUploader
        columns={1}
        maxCount={1}
        value={[]}
        onChange={() => {}}
        upload={uploadFile}
        capture={true} // 只允许使用相机
      />
      {lastSegment === "departEnd" ? (
        <>
          <span>服务完成需要拍摄正面上身照，穿黑色裤子</span>
          <span>无法上传或者无法提交联系客服处理</span>
        </>
      ) : (
        <>
          <span>出发后拍照，需要拍摄出门照，或者车内照</span>
          <span>无法上传或者无法提交联系客服处理</span>
        </>
      )}

      <Button color="primary" block onClick={submitHandler}>
        {lastSegment === "departEnd" ? "确认离开" : "我已出发"}
      </Button>
    </MiddleContentHeader>
  );
};

export default OrderDetailDepartContainer;
