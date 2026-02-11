// Date formatting utilities

/**
 * Validates if a date string produces a valid Date object
 */
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const formatDate = (dateString: string) => {
  if (!isValidDate(dateString)) {
    return "Invalid date";
  }
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string) => {
  if (!isValidDate(dateString)) {
    return "Invalid date";
  }
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatRelativeTime = (dateString: string) => {
  if (!isValidDate(dateString)) {
    return "Invalid date";
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  // Handle future dates explicitly
  if (diffMs < 0) {
    const absDiffMs = Math.abs(diffMs);
    const futureMins = Math.floor(absDiffMs / 60000);
    const futureHours = Math.floor(absDiffMs / 3600000);
    const futureDays = Math.floor(absDiffMs / 86400000);

    if (futureMins < 1) return "in less than a minute";
    if (futureMins < 60) return `in ${futureMins} minute${futureMins > 1 ? "s" : ""}`;
    if (futureHours < 24) return `in ${futureHours} hour${futureHours > 1 ? "s" : ""}`;
    if (futureDays < 7) return `in ${futureDays} day${futureDays > 1 ? "s" : ""}`;

    return formatDate(dateString);
  }

  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return formatDate(dateString);
};
