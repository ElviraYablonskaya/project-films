export const getRatingColor = (rating: number) => {
  if (rating >= 7) {
    return "#00A340";
  } else if (rating >= 5) {
    return "#F3A608";
  } else {
    return "#F45D2D";
  }
};

export const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
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
