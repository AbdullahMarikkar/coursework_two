export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" }); // Apr
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0");

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${year} ${month} ${day}${suffix} - ${hour12}:${minute} ${period}`;
}

export function getTimeRemaining(createdAt: string) {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const expirationDate = new Date(
    createdDate.getTime() + 90 * 24 * 60 * 60 * 1000
  ); // add 90 days
  const diffMs: number = expirationDate.getTime() - now.getTime();

  if (diffMs <= 0) return "Expired";

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

  let result = `${days} Days`;
  if (hours > 0) result += ` ${hours} Hours`;
  if (minutes > 0 && days === 0) result += ` ${minutes} Minutes`; // only show minutes when near expiration

  return result + " Remaining";
}
