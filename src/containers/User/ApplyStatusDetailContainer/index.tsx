import MiddleContentHeader from "@/components/layout/MiddleContentHeader";
import { useAppSelector } from "@/store";
import styles from "./style.module.less";
import { useParams } from "react-router-dom";
import { applyStatusDict } from "@/util/utils";
import { Card, Image, ImageViewer } from "antd-mobile";
import { useState } from "react";

const ApplyStatusDetailContainer = () => {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [imageViewerUrl, setImageViewerUrl] = useState<string | null>(null);

  const { applyStatus } = useAppSelector((state) => state.applyStatus);
  const apply = applyStatus.find((as) => as.apply_id === parseInt(id));
  const renderLine = (label: string, value: string) => {
    return (
      <div className={styles.apply_item_line}>
        <span>{label + "："}</span>
        <span>
          {value === "string" || value === null || value == "undefined"
            ? "暂无"
            : value}
        </span>
      </div>
    );
  };
  const renderApplyStatusDetail = () => {
    switch (apply.apply_type) {
      case "tech_join":
        return (
          <div className={styles.apply_item_content}>
            {renderLine("艺名", apply.user_nickname)}
            {renderLine("性别", apply.user_sex)}
            {renderLine("年龄", apply.user_age)}
            {renderLine("申请城市", apply.user_city)}
            {renderLine("工作电话", apply.work_phone)}
            {renderLine("个人介绍", apply.user_desc)}
            {renderLine("银行卡类型", apply.bank_card_type)}
            {renderLine("银行卡号", apply.bank_card_id)}
          </div>
        );
      case "tech_workphoto":
        return renderImages([apply.photo_work]);

      case "tech_lifephoto":
        return renderImages([
          apply.photo_life_1,
          apply.photo_life_2,
          apply.photo_life_3,
        ]);
      case "tech_certificate":
        return renderImages([
          apply.business_license,
          apply.technician_certificate,
          apply.health_certificate,
        ]);
    }
    return;
  };
  const renderImages = (image_urls: string[]) => {
    return (
      <div className={styles.apply_item_content_image}>
        {image_urls.map((url) => {
          return (
            <Image
              src={url}
              width={100}
              height={100}
              lazy
              fit="fill"
              onClick={() => {
                setImageViewerUrl(url);
                setVisible(true);
              }}
            />
          );
        })}

        <ImageViewer
          classNames={{
            mask: "customize-mask",
            body: "customize-body",
          }}
          image={imageViewerUrl}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      </div>
    );
  };
  return (
    <MiddleContentHeader
      title={"申请详情"}
      withFooter={false}
      className={styles.apply_status_detail_container_wrapper}
    >
      <div className={styles.apply_status_detail_content}>
        <Card>
          <div className={styles.apply_card_content}>
            <div className={styles.apply_item_cardheader}>
              <div className={styles.apply_item_type}>上线申请</div>
              <div className={styles.apply_item_status}>
                {applyStatusDict[apply.apply_status]}
              </div>
            </div>
            {renderApplyStatusDetail()}
            {apply.apply_status == "reject" && (
              <div style={{ color: "#ff0000" }}>
                驳回原因：{apply.apply_refuse_cause}
              </div>
            )}
          </div>
        </Card>
      </div>
    </MiddleContentHeader>
  );
};

export default ApplyStatusDetailContainer;
