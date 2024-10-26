export function handleChat(history: string[], message: string): string[] {
  return [...new Set([...history, message])];
}
