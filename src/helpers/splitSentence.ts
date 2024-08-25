export const splitTextIntoSentences = (text: string): string[] => {
  return text.split(/(?<=[.!?])\s+/);
};
