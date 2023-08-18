export const getRatingColor = (rating: number) => {
  if (rating >= 7) {
    return "#00A340";
  } else if (rating >= 5) {
    return "#F3A608";
  } else {
    return "#F45D2D";
  }
};

export const formatRuntime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
};

export const formatDate = (releaseDate: {
  day: number | null;
  month: number | null;
  year: number | null;
}) => {
  if (!releaseDate) return "";

  const { day, month, year } = releaseDate;

  if (day === null && month === null && year === null) {
    return "";
  }

  const date = new Date();
  if (year !== null) {
    date.setFullYear(year);
  }
  if (month !== null) {
    date.setMonth(month - 1);
  }
  if (day !== null) {
    date.setDate(day);
  }

  const formattedDay = day ? `${day} ` : "";
  const formattedMonth = month
    ? date.toLocaleString("en", { month: "long" }) + " "
    : "";
  const formattedYear = year ? year.toString() : "";

  return `${formattedDay}${formattedMonth}${formattedYear}`.trim();
};

export const formatBudget = (budget: number | undefined) => {
  if (typeof budget === "number") {
    return budget.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  return "";
};
