const {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  subMonths,
} = require("date-fns");

const dateRangeHelper = (dateRange) => {
  const now = new Date();
  if (dateRange == "Last Week") {
    var firstDayOfMonth = startOfWeek(now);
    var lastDayOfMonth = endOfWeek(now);
  } else if (dateRange == "This Month") {
    firstDayOfMonth = startOfMonth(now);
    lastDayOfMonth = endOfMonth(now);
  } else if (dateRange == "Last Month") {
    const lastMonthStartDate = subMonths(now, 1);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(firstDayOfMonth);
  } else if (dateRange == "Last 2 Months") {
    const lastMonthStartDate = subMonths(now, 2);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (dateRange == "Last 3 Months") {
    const lastMonthStartDate = subMonths(now, 3);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (dateRange == "Last 6 Months") {
    const lastMonthStartDate = subMonths(now, 6);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (dateRange == "Last 12 Months") {
    const lastMonthStartDate = subMonths(now, 12);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  }

  return {
    firstDayOfMonth: firstDayOfMonth,
    lastDayOfMonth: lastDayOfMonth,
  };
};

module.exports = dateRangeHelper;
