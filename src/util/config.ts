// 用于上线测试版本，生成版本
export const baseUrl = process.env.baseUrl;
export const staticUrl = process.env.staticUrl;
export const encryptPhone = process.env.encryptPhone;
export const isDev = process.env.isDev === "true" ? true : false;

// 用于配制查看全部订单
export const admin = [
  "oK9p06eiEk0jWNvowVjb5lGlkocM",
  "oK9p06S43s67ui0VxR3-h3REu0VY",
];

export const cityOption = [
  "杭州市",
  "重庆市",
  "石家庄市",
  "安康市",
  "北京市",
  "青岛市",
];
export const gaode_api_key = process.env.gaode_api_key;
export const gaode_api_secure_key = process.env.gaode_api_secure_key;
