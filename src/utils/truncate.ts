export const truncate = (input?: string) => {
  if (input) {
    const len = input.length;
    return input.slice(0, 5) + "..." + input.slice(len - 5, len)
  }
}