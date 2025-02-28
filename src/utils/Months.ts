export const formatMonths = (months: string[]): string[] => {
    const monthAbbreviations: Record<string, string> = {
      January: "Jan",
      February: "Feb",
      March: "Mar",
      April: "Apr",
      May: "May",
      June: "Jun",
      July: "Jul",
      August: "Aug",
      September: "Sep",
      October: "Oct",
      November: "Nov",
      December: "Dec",
    };
  
    return months.map((month) => monthAbbreviations[month] || month);
  };
  