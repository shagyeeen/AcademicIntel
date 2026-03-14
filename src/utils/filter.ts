const ABUSIVE_WORDS = ['abuse', 'spam', 'kill', 'hate', 'stupid', 'curse']; // Example list

export interface FilterResult {
  isClean: boolean;
  originalMessage: string;
  filteredMessage: string;
}

export function filterMessage(message: string): FilterResult {
  const words = message.toLowerCase().split(/\s+/);
  const containsAbuse = words.some(word => ABUSIVE_WORDS.includes(word));

  return {
    isClean: !containsAbuse,
    originalMessage: message,
    filteredMessage: containsAbuse ? "[REDACTED DUE TO POLICY VIOLATION]" : message
  };
}
