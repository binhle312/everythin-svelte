export async function randomSleep(): Promise<void> {
  const ms = Math.floor(Math.random() * 3001); // 0 to 3000 ms
  return new Promise(resolve => setTimeout(resolve, ms));
}
