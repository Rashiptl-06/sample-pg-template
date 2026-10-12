const SUMMARY_QUOTE_CHARS = /["`\u201C\u201D\u201E\u201F]/g;

export function sanitizeAuditSummary(
  summary: string | null | undefined,
): string {
  if (!summary) {
    return '';
  }

  return summary
    .replace(SUMMARY_QUOTE_CHARS, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildAuditLogsPagination(
  page: number,
  limit: number,
  totalItems: number,
) {
  return {
    page,
    limit,
    totalItems,
    totalPages: Math.ceil(totalItems / limit) || 0,
  };
}