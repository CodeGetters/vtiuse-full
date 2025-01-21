import * as dayjs from "dayjs";

export const formatTime = (
  date: Date | number | string,
  format: string,
): string => {
  let formattedDate;
  date === null
    ? (formattedDate = dayjs().format(format))
    : (formattedDate = dayjs(date).format(format));

  return formattedDate;
};
