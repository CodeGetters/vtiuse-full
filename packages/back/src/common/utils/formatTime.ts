import * as dayjs from "dayjs";

export const formatTime = (
  date: Date | number | string,
  format: string,
): string => {
  return dayjs(date).format(format);
};
