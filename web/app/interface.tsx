export interface GeneralTask {
  id: number;
  dayOfWeek: string; // 重新命名字段為英文
  name: string;
}

export interface DailyTask extends GeneralTask {
  taskType: string; // 重新命名 type 字段為 taskType 以便區分
}
