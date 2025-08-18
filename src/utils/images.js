export function toImageUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.VITE_IMAGE_BASE_URL || "";
  return `${base}${path}`;
}
