import { TechWorktime, TechWorktimeBlock } from "@/types/TechWorktime";
import apiClient from "./apiClient";
export const getTechUserWorkTimeApi = async (
  openid: string
): Promise<TechWorktime[]> => {
  return await apiClient.get(
    `/techUserWorktime/worktimeBlocksFromTech/${openid}`
  );
};

// 保存技师工作时间
export const saveTechUserWorkTimeApi = async (params: {
  tech_user_id: string;
  worktime_blocks: TechWorktimeBlock[];
}) => {
  return await apiClient.post(`/techUserWorktime/worktimeBlocks/`, params);
};
