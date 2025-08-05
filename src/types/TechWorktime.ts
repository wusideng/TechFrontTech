export type TechWorktime = {
  work_time_id?: number;
  slot_id: number;
  active: 0 | 1;
  work_date: string;
  tech_user_id: string;
};
export type TechWorktimeBlock = {
  slot_id: number;
  active: 0 | 1;
  work_date: string;
  tech_user_id: string;
  work_time: string;
};
export type TechWorktimeBlocks = {
  slot_id: number;
  active: 0 | 1;
  work_date: string;
  tech_user_id: string;
  work_time: string;
}[][];
