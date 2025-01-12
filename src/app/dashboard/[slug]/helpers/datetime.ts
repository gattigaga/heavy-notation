import { DateTime } from "luxon";

export const formatToClientTimeAndAgo = (utcDateTime: string): string => {
  // Parse the UTC datetime
  const utcTime = DateTime.fromISO(utcDateTime, { zone: "utc" });

  console.log(utcTime);

  // Convert to client's local timezone
  const localTime = utcTime.setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  // Get the duration difference between now and the parsed datetime
  const diffInMillis = DateTime.now().toMillis() - localTime.toMillis();

  // Format the difference as "... ago"
  const seconds = Math.floor(diffInMillis / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(days / 365);
  return `${years} years ago`;
};
