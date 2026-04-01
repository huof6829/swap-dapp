/** 服务端根据 UA 粗略判断是否为手机/平板等移动端（生产环境门禁用） */
export function isLikelyMobileUserAgent(
  ua: string | null | undefined
): boolean {
  if (!ua) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Silk|Kindle|HarmonyOS/i.test(
    ua
  );
}
