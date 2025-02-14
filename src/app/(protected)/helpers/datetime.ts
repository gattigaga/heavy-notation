import { DateTime } from "luxon";
import { t } from "@lingui/core/macro";

export const formatToClientTimeAndAgo = (utcDateTime: string): string => {
  // Parse the UTC datetime
  const utcTime = DateTime.fromISO(utcDateTime, { zone: "utc" });

  // Convert to client's local timezone
  const localTime = utcTime.setZone(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  // Get the duration difference between now and the parsed datetime
  const diffInMillis = DateTime.now().toMillis() - localTime.toMillis();

  // Format the difference as "... ago"
  const seconds = Math.floor(diffInMillis / 1000);
  if (seconds < 60) return t`${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return t`${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t`${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return t`${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return t`${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return t`${months} months ago`;

  const years = Math.floor(days / 365);
  return t`${years} years ago`;
};
