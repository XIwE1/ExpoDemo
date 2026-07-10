/**
 * 把时间转成"刚刚 / x小时前 / x天前 / 很久前"
 * @param input 时间：Date | 时间戳(ms) | 时间字符串(可被 Date 解析)
 */
export function formatRelativeTime(input: unknown): string {
  const date = input instanceof Date ? input : new Date(input as any);
  const ts = date.getTime();
  if (Number.isNaN(ts)) return "";

  const diffMs = Date.now() - ts;
  if (diffMs < 0) return "刚刚"; // 未来时间兜底

  const ONE_HOUR = 60 * 60 * 1000;
  const ONE_DAY = 24 * ONE_HOUR;
  const ONE_WEEK = 7 * ONE_DAY;

  if (diffMs < ONE_HOUR) return "刚刚";
  if (diffMs < ONE_DAY) return `${Math.floor(diffMs / ONE_HOUR)}小时前`;
  if (diffMs < ONE_WEEK) return `${Math.floor(diffMs / ONE_DAY)}天前`;
  return "很久前";
}
