// utils/formatPath.ts
export const formatUrlPath = (path: string) => {
  return path
    .split("/")
    .filter(Boolean) // Remove empty strings
    .join(" > ");
};
