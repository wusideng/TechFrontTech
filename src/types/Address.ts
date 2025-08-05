export type Address = {
  id?: number;
  address: string; //完整的地址，包含省市县小区门牌号等
  openid: string; //用户ID
  province: string; //用户所在省份 1
  city: string; //用户所在城市 2
  district: string; //用户所在区 3
  street: string; //用户所在街道 4
  region: string; //具体到用户所在的小区 5
  detail_address?: string; //门牌号 6
  lon: number; //经度
  lat: number; //纬度
  is_default: boolean; //是否为默认地址
};

export const EmptyTechAddress: Address = {
  openid: "",
  is_default: false,
  province: "",
  city: "",
  district: "",
  street: "",
  region: "", //小区名
  detail_address: "", //详细门牌号
  address: "", //完整的地址，包含省市县小区门牌号等
  lat: 0,
  lon: 0,
};
