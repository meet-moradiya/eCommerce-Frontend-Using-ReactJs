import moment from "moment";

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const lastSevenMonths = [];
  const lastTwelveMonths = [];

  for (let i = 0; i < 7; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");

    lastSevenMonths.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");

    lastTwelveMonths.unshift(monthName);
  }

  return { lastSevenMonths, lastTwelveMonths };
};
