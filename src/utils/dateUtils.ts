/**
 * Format date string to "Sunday, 1 Jan 2025" format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Format options for the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
