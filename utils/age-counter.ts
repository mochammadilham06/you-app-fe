import dayjs from "dayjs";

export const getYears = (year: string) => {
  return dayjs().diff(dayjs(year, "YYYYMMDD"), "years");
};
