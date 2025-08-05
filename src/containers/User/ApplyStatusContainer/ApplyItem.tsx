import { Image } from "antd-mobile";
import styles from "./style.module.less";
import { ApplyStatus } from "@/types/ApplyStatus";
import { applyTypeDict } from "@/util/utils";

const applyStatusDict = {
  approve: "已批准",
  reject: "已驳回",
  apply: "审核中",
};
const ApplyItem = ({ apply, key }: { apply: ApplyStatus; key: string }) => {
  const renderLine = (label, value) => {
    return (
      <div>
        <span>{label + "："}</span>
        <span>{value}</span>
      </div>
    );
  };
  const renderApplyContent = () => {
    switch (apply.apply_type) {
      case "tech_join":
        return (
          <div className={styles.apply_item_content}>
            {renderLine("艺名", apply.user_nickname)}
            {renderLine("性别", apply.user_sex)}
            {renderLine("年龄", apply.user_age)}
            {renderLine("申请城市", apply.user_city)}
            {renderLine("工作电话", apply.work_phone)}
          </div>
        );
      case "tech_workphoto":
        return (
          <div className={styles.apply_item_content_image}>
            <Image
              src={apply.photo_work}
              width={100}
              height={100}
              lazy
              fit="fill"
            />
          </div>
        );
      case "tech_lifephoto":
        return (
          <div className={styles.apply_item_content_image}>
            <Image
              src={apply.photo_life_1}
              width={100}
              height={100}
              lazy
              fit="fill"
            />
            <Image
              src={apply.photo_life_2}
              width={100}
              height={100}
              lazy
              fit="fill"
            />
            <Image
              src={apply.photo_life_3}
              width={100}
              height={100}
              lazy
              fit="fill"
            />
          </div>
        );
      case "tech_certificate":
        return (
          <div className={styles.apply_item_content_image}>
            <Image
              src={apply.business_license}
              width={100}
              height={100}
              lazy
              fit="fill"
            />
            <Image
              src={apply.technician_certificate}
              width={100}
              height={100}
              lazy
              fit="fill"
            />
            <Image
              src={apply.health_certificate}
              width={100}
              height={100}
              lazy
              fit="fill"
            />
          </div>
        );
    }
    return;
  };

  return (
    <div className={styles.apply_item_wrapper}>
      <div className={styles.apply_item}>
        <div className={styles.apply_item_cardheader}>
          <div className={styles.apply_item_type}>
            {applyTypeDict[apply.apply_type]}
          </div>
          <div className={styles.apply_item_status}>
            {applyStatusDict[apply.apply_status]}
          </div>
        </div>
        <div className={styles.apply_item_content}>
          {renderApplyContent()}

          {apply.apply_status == "reject" && (
            <div style={{ color: "#ff0000" }}>
              驳回原因：{apply.apply_refuse_cause}
            </div>
          )}
        </div>
      </div>
      <div className={styles.goto_detail}>
        <a>点击查看详情 </a>
      </div>
    </div>
  );
};
export default ApplyItem;
