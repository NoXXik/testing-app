export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
