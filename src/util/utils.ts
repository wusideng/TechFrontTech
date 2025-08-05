import { Address } from "@/types/Address";
import { POIformatted } from "@/types/AddressManagement";
import {
  TechWorktimeBlock,
  TechWorktimeBlocks,
  TechWorktime,
} from "@/types/TechWorktime";
import { arrTechTime } from "./dict";

export const getContractStatus = (type) => {
  switch (type) {
    case "Contract not found":
    case "pending":
      return "合约不存在";
    case "apply":
      return "已申请，审批中";
    case "approve":
      return "已签约";
    case "reject":
      return "已拒绝，请重新提交申请";
    default:
      return "合约不存在";
  }
};

// 获取指定名称的 Cookie 值
export const getCookie = (name: any) => {
  const cookieArr = document.cookie.split(";");
  for (let cookie of cookieArr) {
    cookie = cookie.trim(); // 去掉空格
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // 如果没有找到，返回 null
};

export const deleteCookie = (
  name: any,
  path: any = "/",
  domain: any = window.location.hostname
) => {
  // 设置 cookie 过期时间为过去的时间点，浏览器会自动删除
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}`;
};

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
export const applyStatusDict = {
  approve: "已批准",
  reject: "已驳回",
  apply: "审核中",
};

export const applyTypeDict = {
  tech_join: "上线申请",
  tech_workphoto: "工作照申请",
  tech_lifephoto: "生活照申请",
  tech_certificate: "资格证书申请",
};

export const getFullAddress = (address: POIformatted | Address) => {
  return `${address.province}${address.city}${address.district}${address.street}${address.region}`;
};

export const contractTypeDict = {
  techdealer: "商家入驻合作协议",
  techlaw: "遵纪守法承诺书",
  techtraining: "技师培训协议",
  techportrait: "肖像权许可使用协议",
};
export const contractPageNumberDict = {
  techdealer: [5, 6, 7, 8, 9],
  techlaw: [2],
  techtraining: [3, 4],
  techportrait: [1],
};

export function convertToTechBlockTimeBlocks(
  worktime: TechWorktime[]
): TechWorktimeBlocks {
  // 按日期分组
  const groupedByDate = worktime.reduce((acc, item) => {
    if (!acc[item.work_date]) {
      acc[item.work_date] = [];
    }

    acc[item.work_date].push({
      slot_id: item.slot_id,
      active: item.active,
      work_date: item.work_date,
      tech_user_id: item.tech_user_id,
      work_time: arrTechTime[item.slot_id - 1], // 规则1
    });

    return acc;
  }, {} as Record<string, Array<TechWorktimeBlock>>);

  // 转换为数组并排序
  return Object.keys(groupedByDate)
    .sort() // 规则3：按日期大小排序
    .map(
      (date) => groupedByDate[date].sort((a, b) => a.slot_id - b.slot_id) // 规则4：按slot_id排序
    );
}
