/**
 * Indian Currency Number Formatter (e.g., 1,24,500)
 */
export function formatINR(amount: number, showPrefix: boolean = true): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return showPrefix ? `₹${formatted}` : formatted;
}

/**
 * Compact Indian Currency Formatter (e.g. ₹1.48L, ₹78.4K)
 */
export function formatCompactINR(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `₹${amount}`;
}

/**
 * Get ordinal suffix or rank representation
 */
export function formatRank(rank: number): string {
  if (rank < 10) return `#0${rank}`;
  return `#${rank}`;
}

/**
 * Generate WhatsApp Share URL with pre-filled punchy message
 */
export function getWhatsAppShareUrl(rank: number, income: number, gapToNext: number, nextRank: number): string {
  const text = encodeURIComponent(
    `🔥 I'm currently ranked #${rank} on the EYFI Challenge Leaderboard with ${formatINR(income)} verified income!\n\n` +
    `Just ${formatINR(gapToNext)} more to take #${nextRank} 👀\n\n` +
    `Think you can earn more than college students across India? Join the challenge here: ${window.location.origin}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}

/**
 * Generate Twitter / X Share URL
 */
export function getTwitterShareUrl(rank: number, income: number): string {
  const text = encodeURIComponent(
    `Building & earning while in college! I'm #${rank} on the @EYFI_India Challenge with ${formatINR(income)} verified income.\n\n` +
    `Learn by doing. Can you beat my rank? 🚀 #EYFI #StudentEarning`
  );
  return `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.origin)}`;
}

/**
 * Generate LinkedIn Share URL
 */
export function getLinkedInShareUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`;
}
